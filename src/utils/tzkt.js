import axios from 'axios'

const makeRequest = async (uri, params = {}) => {
  return axios.get(`${process.env.VUE_APP_TZKT_API_URL}${uri}`, {
    params: { limit: 1000, ...params }
  })
}

export default {
  async getContractBigMapKeys (address, name, params = {}) {
    return makeRequest(`/v1/contracts/${address}/bigmaps/${name}/keys`, params)
  },

  async getContractStorage (address) {
    return makeRequest(`/v1/contracts/${address}/storage`)
  },

  async getTokenBalances (address) {
    return makeRequest('/v1/tokens/balances', { account: address, 'select.values': 'token,balance', 'balance.gt': 0 })
  }
}
