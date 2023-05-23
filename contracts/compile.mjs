import fs from 'fs'

import { execSync } from 'child_process'

const ligoVersion = '0.65.0'

const ligo = `docker run -v $PWD:$PWD --rm -i ligolang/ligo:${ligoVersion}`

const buildDir = 'build'

const srcDir = 'main'

const compile = (name, asJson = false) => {
  try {
    const michelson = execSync(
      `${ligo} compile contract $PWD/${srcDir}/${name}.jsligo ${
        asJson ? '--michelson-format json' : ''
      }`,
      { maxBuffer: 1024 * 500 }
    ).toString()

    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir)
    }

    if (asJson) {
      const artifacts = JSON.stringify(
        {
          contractName: name,
          michelson: JSON.parse(michelson),
          networks: {},
          compiler: {
            name: 'ligo',
            version: ligoVersion
          },
          networkType: 'tezos'
        },
        null,
        2
      )

      fs.writeFileSync(`${buildDir}/${name}.json`, artifacts)
    } else {
      fs.writeFileSync(`${buildDir}/${name}.tz`, michelson)
    }
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
}

const main = () => {
  compile('Splitter')
  compile('Factory', true)
}

main()
