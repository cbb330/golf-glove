const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.options('*', cors());
app.use(cors());

const port = 4000;
const sockport = 8080;
app.listen(process.env.port || port);

const wss = new WebSocket.Server({ port: sockport });
app.set('wss', wss);

const routes = require('./routes/routes')(app);

console.log('server started on: ' + port);
