import React,{Component} from 'react';
// import {socket} from '../../websocket';
import {sendMessage, socketEventVideo} from '../../websocket';

class CamChat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: [<video id="local" autoPlay></video>],
            peer: null
        }
    }

    componentDidMount() {

        const PeerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

        navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
        navigator.getUserMedia({ audio: true, video: true }, gotStream, streamError);
        const pc = new PeerConnection(null);
        
        function gotStream(stream) {
            document.getElementById('local').srcObject = stream;
            pc.addStream(stream);
            pc.onicecandidate = gotIceCandidate;
            pc.onaddstream = gotRemoteStream;

        }

        function streamError(error) {
        console.log(error);
        }

        const createOffer = () => {
            pc.createOffer(
              gotLocalDescription,
              function(error) { console.log(error) },
              { 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true } }
            );
          }


          const gotLocalDescription = (description) => {
            pc.setLocalDescription(description);
            sendMessage(description);
          };

          const gotIceCandidate = (event) => {
            if (event.candidate) {
              sendMessage({
                type: 'candidate',
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.sdpMid,
                candidate: event.candidate.candidate
              });
            }
          }

          const gotRemoteStream = (event) => {
            document.getElementById("remoteVideo").src = URL.createObjectURL(event.stream);
          }

          socketEventVideo(pc);
          createOffer();

    }

    addVideoStream() {

    }

    render() {
        return (
            <div>
                <video id="local" autoPlay></video>
                <video id="remoteVideo" autoPlay></video>
            </div>
        )
    }

}

export default CamChat;