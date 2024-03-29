import { Tezos } from './tezos'
import { TaquitoTezosDomainsClient } from '@tezos-domains/taquito-client'

const client = new TaquitoTezosDomainsClient({
  tezos: Tezos,
  network: process.env.VUE_APP_TEZOS_NETWORK,
  caching: { enabled: true }
})

export default {
  async resolveAddressToName (address) {
    const res = await client.resolver.resolveAddressToName(address)
    return res
  },
  async resolveNameToAddress (name) {
    try {
      const address = await client.resolver.resolveNameToAddress(name)
      return address
    } catch (e) {
      console.log(e.message)
    }
  }
}
