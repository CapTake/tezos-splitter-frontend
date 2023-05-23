const { TezosToolkit, MichelsonMap, MichelCodecPacker } = require('@taquito/taquito')
const { char2Bytes } = require('@taquito/utils')
const { InMemorySigner } = require('@taquito/signer')
const fs = require('fs')

;(async () => {
  const Tezos = new TezosToolkit(process.env.TEZOS_RPC_URL)
  const packer = new MichelCodecPacker()
  const signer = new InMemorySigner(process.env.TEZOS_ADMIN_SK)

  Tezos.setProvider({ signer, packer })

  // eslint-disable-next-line node/no-path-concat
  const contractCode = JSON.parse(fs.readFileSync(__dirname + '/build/Factory.json', 'utf8')).michelson

  // const admin = await Tezos.signer.publicKeyHash()

  // console.log(admin)

  const storage = {
    splitters: 0,
    metadata: MichelsonMap.fromLiteral({
      '': char2Bytes('tezos-storage:contents'),
      contents: char2Bytes(JSON.stringify({
        name: 'Splitter Factory contract',
        description: 'Contract to create your own personal splitter for Tezos or any FA tokens. Use with caution. No guarantees.',
        version: '1.2.0',
        authors: ['B.Grit <salv@protonmail.com>'],
        homepage: 'https://splittez.click'
      }))
    }),
    holders: new MichelsonMap()
  }

  try {
    const op = await Tezos.contract.originate({
      code: contractCode,
      storage
    })

    console.log(`Sending operation: ${op.hash}`)

    const contract = await op.contract()
    console.log(`✔ Originated contract: ${contract.address}`)
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
})()
