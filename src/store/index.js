import { createStore } from 'vuex'
import actions from './actions'
import { BigNumber } from 'bignumber.js'

const splitterIndex = (state, address) => state.splitters.findIndex(({ splitter }) => address === splitter)

export default createStore({
  state: {
    userAddress: '',
    userDomain: '',
    userWalletBalance: new BigNumber(0),
    splittersDeployed: 0,
    splitters: []
  },
  getters: {
    connected: (state) => !!state.userAddress,
    displayAddress: (state) => state.userAddress ? state.userDomain || `${state.userAddress.slice(0, 5)}...${state.userAddress.slice(-5)}` : ''
  },
  mutations: {
    userAddress: (state, payload) => {
      state.userAddress = payload || ''
      if (!payload) state.userDomain = ''
    },
    userDomain: (state, payload) => { state.userDomain = payload || '' },
    userWalletBalance: (state, payload) => { state.userWalletBalance = payload || new BigNumber(0) },
    deployed: (state, n) => { state.splittersDeployed = n || 0 },
    splitters: (state, payload) => { state.splitters = payload || [] },
    addUserSplitter: (state, payload) => {
      if (splitterIndex(state, payload) < 0) state.splitters = [payload, ...state.splitters]
    },
    removeUserSplitter: (state, payload) => {
      const index = splitterIndex(state, payload)
      if (index >= 0) state.splitters.splice(index, 1)
    }
  },
  actions
})
