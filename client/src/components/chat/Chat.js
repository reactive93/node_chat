import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

import {SelectRoom, AddMessage, AddRoom, SetUserName, AddRooms} from '../../redux/actions';
import {Room} from '../../redux/models';
import '../../styles/Chat.css';
import Room1 from './Room';
import People from './People';
import MyMessage from './MyMessage';
import FriendMessage from './FiendMessage';
import {socketEmitRoom, socketEmitMessage, socketEventRoom} from '../../websocket';

class Chat extends Component {

    constructor(props) {
        super(props);
        if (props.selRoom) {
            this.props.selectRoom(props.selRoom);
        }

        this.state = {
            message: '',
            messages:[]
        }
    }

    getRooms() {
        console.log(this.props.selectedRoom_str);
        const rooms = this.props.rooms.map((room,i) => {return <Room1 key={i} select={ room.nameRoom === this.props.selectedRoom_str?true:false } room={room}/>})
        return rooms;

    }

    componentDidMount() {

        axios.get('/user').then((result) => {
            const roomName = this.props.match.params.room;
            let checker = false;
            for (let i=0;i<result.data.rooms.length;i++) {
                socketEmitRoom(result.data.rooms[i].nameRoom);
                socketEventRoom(result.data.rooms[i].nameRoom, this.props.addMessage.bind(this));
                if (roomName === result.data.rooms[i].nameRoom) {
                    checker = true;
                }
            }
            if (!checker) {
                const nameRoom = this.props.match.params.room;
                const room = new Room(nameRoom);
                axios.post('/create_room',room).then((result)=>{
                    this.props.addRoom(room);
                    this.props.selectRoom(room);
                });
                socketEmitRoom(room.nameRoom);
            }

            this.props.setUser(result.data.username);
            this.props.addRooms(result.data.rooms);
            if (this.props.selectedRoom === null) {
                for(let i=0;i<this.props.rooms.length;i++) {
                    if (roomName === this.props.rooms[i].nameRoom) {
                        this.props.selectRoom(this.props.rooms[i]);
                    }
                }
            }
        }).catch((error)=>{
            console.log(error);
            this.props.history.push('/');
        });
        
    }

    getMessages() {
        console.log(this.props.selectedRoom);
        const room = this.props.match.params.room;
        
        // if (this.props.selectedRoom){
            return this.props.selectedRoom.messages.map( (message,i)=>{
                return message.username==this.props.username? <MyMessage key={i} message={message.text}/> : <FriendMessage key={i} username={message.username} message={message.text}/>
            });
        // }
        // return null;

    }

    onChangeInput(event) {
        this.setState({message: event.target.value});
    }

    onPressEnter(event) {
        if (event.key === 'Enter') {
            this.addMessage();
        }
    }

    addMessage() {
        if (this.state.message!=='' && this.state.message!=='\n') {
            const message = {username:this.props.username, text: this.state.message};
            console.log(this.props.selectedRoom);
            console.log('selected room ' + this.props.selectedRoom.nameRoom);
            socketEmitMessage(this.props.selectedRoom.nameRoom, message);
            this.props.addMessage(message);
            this.setState({message:''});
        }

    }


    render() {
        return (
            <div className="chat-center-top">
                <div className="chat-rooms chat-color">
                    <div className="chat-title">ROOMS</div>
                    <div className="scroll-room">
                        {this.getRooms()}
                    </div>

                </div>
                <div className="chat-chat chat-color">
                    <div className="chat-center-title">CHAT</div>
                    <div className="chat-center-title">My Username: {this.props.username}</div>
                    <div className="scroll-chat">

                        {this.props.selectedRoom?this.getMessages():null}
                    </div>
                    <div className="chat-input-text">
                        <textarea placeholder="Enter message" onKeyPress={this.onPressEnter.bind(this)} value={this.state.message} onChange={this.onChangeInput.bind(this)}></textarea>
                        <div className="chat-button-send" onClick={this.addMessage.bind(this)}>Send</div>
                    </div>
                </div>
                <div className="chat-people chat-color">
                    <div className="chat-title">PEOPLE</div>
                    <div className="scroll-room">
                        <People username="vaysa"/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        rooms: state.rooms,
        selectedRoom: state.selectedRoom,
        selectedRoom_str: state.selectedRoom_str
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectRoom: bindActionCreators(SelectRoom, dispatch),
        addMessage: bindActionCreators(AddMessage, dispatch),
        addRoom: bindActionCreators(AddRoom, dispatch),
        addRooms: bindActionCreators(AddRooms, dispatch),
        setUser: bindActionCreators(SetUserName, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Chat);