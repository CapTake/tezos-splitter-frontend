import { BigNumber } from 'bignumber.js'

export const displayBalance = (balance, decimals = 0) => balance.dividedBy(new BigNumber(10).exponentiatedBy(decimals)).toFormat()

export const shortAddress = (address, slice = 5) => address ? `${address.slice(0, slice)}...${address.slice(-slice)}` : ''
