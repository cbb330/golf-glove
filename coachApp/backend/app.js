const app = require('express')();
const WebSocket = require('ws');

const port = 3000;
const sockport = 8080;
const server = app.listen(process.env.port || port);

const wss = new WebSocket.Server({ port: sockport });
app.set('wss', wss);

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const routes = require('./routes/routes')(app);

console.log('server started on: ' + port);
