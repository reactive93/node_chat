import {connect} from 'socket.io-client';


const IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
const SessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;



export const socket = connect({
    host: 'http://localhost:8000',
    path: '/chat'
});

const connect1 = () => {

    socket.on("connect", () => {
        console.log('success connect');
    });

};

connect1();

socket.on("disconnect", () => {
    console.log('disconnect');
});

export const socketEmitRoom = (roomName) => {
    socket.emit("room", roomName);
};

export const socketEventRoom = (roomName, fn) => {
    socket.on(roomName,(data)=>{
        fn(data);
    });
};

export const socketEmitMessage =(room, message) => {
    socket.emit(room, message);
};

export const socketEmmitJoin = (username) => {
    socket.emit("join", username);
};

const gotLocalDescription = (description) => {
    // pc.setLocalDescription(description);
    sendMessage(description);
  };

const createAnswer = (pc) => {
    pc.createAnswer(
      gotLocalDescription,
      function(error) { console.log(error) }, 
      { 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true } }
    );
  };

export const socketEventVideo = (ps1) => {

    socket.on('message', (message) => {
        console.log('video message');
        if (message.type === 'offer') {
            ps1.setRemoteDescription(new SessionDescription(message));
          createAnswer(ps1);
        }
        else if (message.type === 'answer') {
            ps1.setRemoteDescription(new SessionDescription(message));
        }
        else if (message.type === 'candidate') {
          var candidate = new IceCandidate({sdpMLineIndex: message.label, candidate: message.candidate});
          ps1.addIceCandidate(candidate);
        }
      });
};

export const socketEmitVideo = (stream, data) => {
    socket.emit(stream, data);
};

export const sendMessage =(message) =>{
    socket.emit('message', message);
  };

