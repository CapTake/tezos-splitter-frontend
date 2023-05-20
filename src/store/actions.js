import { requestPermissions, getActiveAccount, clearActiveAccount, getContract, Tezos } from '../utils/tezos'
import { BigNumber } from 'bignumber.js'
import tzdomains from '@/utils/tezos-domains'
import tzkt from '../utils/tzkt'

export default {
  async init ({ state, dispatch, commit }) {
    const account = await getActiveAccount()

    if (account) {
      commit('userAddress', account.address)

      dispatch('resolveDomain', state.userAddress)
        .then(domain => commit('userDomain', domain))
      dispatch('listUserSplitters')
    }

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

  async listUserSplitters ({ state, commit }) {
    if (!state.userAddress) commit('splitters')

    const { data: res } = await tzkt.getContractBigMapKeys(
      process.env.VUE_APP_FACTORY_CONTRACT,
      'holders',
      {
        active: true,
        'select.values': 'key,value',
        'key.address_0': state.userAddress
      }
    )
    console.log(res)
    // eslint-disable-next-line camelcase
    commit('splitters', res.map(([{ address_1 }, ts]) => ({ splitter: address_1, createdAt: new Date(ts) })))
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

    const params = token ? [amount, token.address, token.id] : []

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

    res.push({ balance })

    return res
  },

  async getSplitterShares (_, address) {
    const { data: storage } = await tzkt.getContractStorage(address)

    return Object.entries(storage.shares).map(([address, share]) => ({ address, share: +share, label: `${address.slice(0, 5)}...${address.slice(-5)}` }))
  }
}
