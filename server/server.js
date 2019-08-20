const http = require('http');
const app = require('./app');
const websocket = require('./websock');

const PORT = process.env.PORT || 8000;


const server = http.createServer(app);
websocket.startWebSocket(server);

server.listen(PORT, ()=>{console.log(`server started on ${PORT} port`);});

