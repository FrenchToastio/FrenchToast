const express = require('express');
const socketRouter = require('./socketRouter.js')
const axios = require('axios')
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//for the socket.io routing
module.exports.http = http



/* Here we have our webhook logic using smee-client */

const SmeeClient = require('smee-client')
const smee = new SmeeClient({
  source: 'https://smee.io/iehIhhdqgkaYzoo',
  target: 'http://localhost:3000/events',
  logger: console
})
const events = smee.start()

app.get('/events', (req, res) => {
  console.log('we are in events/get', req.body)
  //pass webhook event into our socket routing
  socketRouter(req.body)
})

app.post('/events', (req, res) => {
  console.log('we are in events/post', req.body)
  //pass webhook event into our socket routing
  socketRouter(req.body)

})

// Stop forwarding events
// events.close()


/* Here we have our potential routing to update github issues */

app.get('/github/allIssues', (req, res) => {

  //Interact with github api to pull all issues on the github test-repo
  console.log('heya whats going on?')
  axios.get('https://api.github.com/repos/FrenchToastio/TestRepo/issues').then((data) => {
    console.log('are in we in data?')
    console.log('can I look at data?', data.data)
    res.send(data.data)
  }).catch((err) => {
    console.log('whats the error', err)
  })

})

app.post('github/update', (req, res) => {
  //do here what ever you want to update the gitHub repo here using the github api
})



  app.set('port', process.env.PORT || 3000)

  const server = app.listen(app.get('port'))
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);