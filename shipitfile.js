require('dotenv').config({ path: './.env.local' })

module.exports = shipit => {
  // Load shipit-deploy tasks
  require('shipit-deploy')(shipit)

  shipit.initConfig({
    default: {
      deployTo: process.env.DEPLOY_TO
    },
    production: {
      servers: process.env.SERVER,
      key: process.env.KEY
    }
  })
  shipit.task('copyDist', async () => {
    await shipit.copyToRemote(
      'dist/*',
      process.env.DEPLOY_TO
    )
  })
}
