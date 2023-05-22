import { requestPermissions, getActiveAccount, clearActiveAccount, getContract, Tezos } from '../utils/tezos'
import { BigNumber } from 'bignumber.js'
import { useToast } from 'vue-toastification'
import tzdomains from '@/utils/tezos-domains'
import tzkt from '../utils/tzkt'
import { HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr'

const SPLITTER_CREATED = 'splitter_created'

const connection = new HubConnectionBuilder()
  .withUrl(`${process.env.VUE_APP_TZKT_API_URL}/v1/ws`)
  .build()

async function initConnection () {
  if (connection.state !== HubConnectionState.Disconnected) return

  await connection.start()

  await connection.invoke('SubscribeToEvents', {
    contract: process.env.VUE_APP_FACTORY_CONTRACT,
    tag: SPLITTER_CREATED
  })
}

const toast = useToast()

export default {
  async init ({ state, dispatch, commit }) {
    const account = await getActiveAccount()

    if (account) {
      commit('userAddress', account.address)

      dispatch('resolveDomain', state.userAddress)
        .then(domain => commit('userDomain', domain))
      dispatch('listUserSplitters')
    }

    initConnection()

    connection.onclose(initConnection)

    connection.on('events', ({ type, data }) => {
      if (type === 1) {
        dispatch('listUserSplitters')
        const payload = data[0]?.payload
        console.log(payload)
        if (payload?.address_0 === state.userAddress) {
          toast.success('Splitter Contract Successfully deployed')
        }
      }
    })

    const contract = await getContract(process.env.VUE_APP_FACTORY_CONTRACT)

    const poll = async () => {
      const storage = await contract.storage()

      commit('factoryStorage', storage)

      setTimeout(poll, 10 * 1000)
    }
    poll()
  },

  async resolveDomain (_, address) {
    if (!address) return

    const res = tzdomains.resolveAddressToName(address)

    return res
  },

  async domainToAddress (_, domain) {
    const res = await tzdomains.resolveNameToAddress(domain)

    return res
  },

  async connectWallet ({ commit, state, dispatch }) {
    if (!state.userAddress) {
      let account = await getActiveAccount()

      if (!account) {
        await requestPermissions()

        account = await getActiveAccount()
      }

      commit('userAddress', account?.address)
    }

    dispatch('resolveDomain', state.userAddress).then(domain => commit('userDomain', domain))
    dispatch('listUserSplitters')
  },

  async disconnectWallet ({ commit }) {
    await clearActiveAccount()

    commit('userAddress')
    commit('splitters')
  },

  async updateWalletBalance ({ commit, state }) {
    if (state.userAddress) {
      commit('userWalletBalance', await Tezos.tz.getBalance(state.userAddress))
    } else {
      commit('userWalletBalance', new BigNumber(0))
    }
  },

  async listSplitters ({ state, commit }, { address, limit = 1000, offset = 0 }) {
    const { data: res } = address
      ? await tzkt.getContractBigMapKeys(
        process.env.VUE_APP_FACTORY_CONTRACT,
        'holders',
        {
          active: true,
          'select.values': 'key,value',
          'sort.desc': 'id',
          'key.address_0': address,
          limit,
          offset
        }
      )
      : await tzkt.getContractEvents(
        process.env.VUE_APP_FACTORY_CONTRACT,
        {
          tag: SPLITTER_CREATED,
          limit,
          offset,
          'sort.desc': 'id',
          'select.values': 'payload,timestamp'
        }
      )
    // eslint-disable-next-line camelcase
    return res.map(([{ address_1 }, ts]) => ({ splitter: address_1, createdAt: new Date(ts) }))
  },

  async listUserSplitters ({ state, commit, dispatch }) {
    if (!state.userAddress) commit('splitters')

    const res = await dispatch('listSplitters', { address: state.userAddress })

    // eslint-disable-next-line camelcase
    commit('splitters', res)
  },

  async createSplitter ({ dispatch }, shareMap) {
    await dispatch('connectWallet')

    const contract = await getContract(process.env.VUE_APP_FACTORY_CONTRACT)

    const op = await contract.methods.default(shareMap).send()

    return await op.confirmation(1)
  },

  async distribute ({ dispatch }, { splitter, token, amount }) {
    await dispatch('connectWallet')

    const contract = await getContract(splitter)

    const params = token?.address ? [amount, token.address, token.id] : []

    const op = await contract.methods.distribute(...params).send()

    return await op.confirmation(1)
  },
  /*
    {
      "id": 68697835175937,
      "contract": {
        "address": "KT1KAUZhHYREZeGa4dRCCivPPRHxjMbFTTnL"
      },
      "tokenId": "0",
      "standard": "fa2",
      "totalSupply": "1000000000000000",
      "metadata": {
        "name": "Elixir",
        "symbol": "ELXR",
        "decimals": "9",
        "displayUri": "ipfs://bafkreigkemcusr3xmix2fndyilfs2auksovqiuijwurotxrmost74x4mku",
        "thumbnailUri": "ipfs://bafkreigkemcusr3xmix2fndyilfs2auksovqiuijwurotxrmost74x4mku"
      }
    },
  */
  async getTokenBalances (_, address) {
    const { data } = await tzkt.getTokenBalances(address)

    const res = data.map(([{ contract, tokenId, metadata }, balance]) => ({
      token: {
        ...metadata,
        ...contract,
        id: tokenId
      },
      balance: new BigNumber(balance)
    }))

    const balance = await Tezos.tz.getBalance(address)

    return [{ balance, token: { name: 'Tezos', decimals: '6', symbol: 'XTZ' } }, ...res]
  },

  async getSplitterShares (_, address) {
    const { data: storage } = await tzkt.getContractStorage(address)

    return Object.entries(storage.shares).map(([address, share]) => ({ address, share: +share, label: `${address.slice(0, 5)}...${address.slice(-5)}` }))
  }
}
