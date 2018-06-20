//Probot didn't work well for us ='[ so we are not using this file


module.exports = robot => {
  // Your code here
  robot.log('Yay, the app was loaded!')

  robot.on('issues.opened', async context => {
  	console.log('inside robot.onIssuesOpened')
    // A new issue was opened, what should we do with it?
    context.log(context.payload)
  })


  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}

const SmeeClient = require('smee-client')

const smee = new SmeeClient({
  source: 'https://smee.io/iehIhhdqgkaYzoo',
  target: 'http://localhost:3000/events',
  logger: console
})

const events = smee.start()

