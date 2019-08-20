const websocket_client = require('socket.io-client');
const socket = websocket_client.connect("http://localhost:8000", {
    autoConnect: true,
    path: "/chat",
    forceNew: true,
    timeout: 5000
});

socket.on("connect", () => {
    console.log('success connect');
    
});

socket.on("disconnect", () => {
    console.log('disconnect');
});

socket.emit("room", "chat1");
socket.emit("join", "username2");

socket.on("join", (username)=>{
    console.log(username);
});

socket.on("chat1",(data)=>{
    console.log(data);
});
setInterval(()=>{
    console.log('---------------------');
    socket.emit("chat1","message from client 2");
},5000);