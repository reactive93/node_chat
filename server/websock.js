const Websocket = require('socket.io');


module.exports.startWebSocket = (server) => {
    const websocket = Websocket(server, {
        path:"/chat",
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false
    });
    
    websocket.on('connect', (socket) => {
        console.log('client connected');
        socket.on("disconnect", ()=> {
            console.log("client disconnect");
        });
        socket.on("error", (error)=> {
            console.log(error);
        });

        socket.on('room', (room) => {
            console.log(room);
            socket.join(room,() => {

                socket.on('join', (username)=>{
                    console.log('join event name '+ username);
                    socket.to(room).emit('join',username);
                });
                socket.on(room, (data) => {
                  console.log(data);
                  socket.to(room).emit(room, data);
                });
              });
        });

        socket.on('message',(stream) => {
            console.log('video');
            socket.emit("message", stream);
        });

    });

    websocket.listen(8001);
};