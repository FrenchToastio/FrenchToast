const express = require('express');
const socketRouter = require('./socketRouter.js')
const axios = require('axios')

// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpack = require('webpack');
// const webpackConfig = require('./webpack.config.js');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
// const compiler = webpack(webpackConfig);

// app.use(express.static(__dirname + '/www'));
app.use(bodyParser.json());

module.exports.http = http


const SmeeClient = require('smee-client')

const smee = new SmeeClient({
  source: 'https://smee.io/iehIhhdqgkaYzoo',
  target: 'http://localhost:3000/events',
  logger: console
})

const events = smee.start()

// Stop forwarding events
// events.close()

// app.use(webpackDevMiddleware(compiler, {
//   hot: true,
//   filename: 'bundle.js',
//   publicPath: '/',
//   stats: {
//     colors: true,
//   },
//   historyApiFallback: true,
// }));
app.get('/github/allIssues', (req, res) => {
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

app.get('/events', (req, res) => {
    //all our routing is here
	//need to do a routing function here
	console.log('we are in events/get', req.body)
	socketRouter(req.body)
})

app.post('/events', (req, res) => {
	//all our routing is herehuwf
	//need to do a routing function here
	console.log('we are in events/post', req.body)
	socketRouter(req.body)

})

  app.set('port', process.env.PORT || 3000)

  const server = app.listen(app.get('port'))
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);