const mocha = require('mocha');
const chai = require('chai');
const websocket_client = require('socket.io-client');



mocha.describe("connect via websocket", () => {
    const socket = websocket_client.connect("http://localhost:8000", {
        autoConnect: true,
        path: "/chat",
        forceNew: true,
        timeout: 5000
            });
    mocha.it("connect to server", (done_fn) => {


        socket.on("connect", () => {
            console.log('success connect');
            done_fn();
        });

        socket.on("disconnect", () => {
            console.log('disconnect');
        });

    });

    mocha.it("join to room chat1", (done_fn) => {
        const socket2 = websocket_client.connect("http://localhost:8000", {
            autoConnect: true,
            path: "/chat",
            forceNew: true,
            timeout: 5000
        });
        socket.emit("room", "chat1");
        socket.on("join", (username) => {
            console.log(`to room chat1 join ${username}`);
            done_fn();
            // socket.close();
            socket2.close();
        });
        socket2.emit("room", "chat1");
        socket2.emit("join","user2");

    });

    mocha.it("receive message from chat1", (done_fn) => {

        const socket2 = websocket_client.connect("http://localhost:8000", {
            autoConnect: true,
            path: "/chat",
            forceNew: true,
            timeout: 5000
        });

        socket.on("chat1", (message) => {
            console.log("receive message: "+ message);
            done_fn();
            socket2.close();
            socket.close();
        });
        
        socket2.emit("room", "chat1");
        socket2.emit("chat1","message from socket 2");
        socket2.emit("chat2","message from socket 2 to chat 2");

    });
});
