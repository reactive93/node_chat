import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import '../../styles/CreateRoom.css';
import TableRoom from './TableRoom';
import {AddRoom, AddRooms ,SetUserName} from '../../redux/actions';
import {Room} from '../../redux/models';

class CreateRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameRoom:''
        };
    }

    onChangeRoom(event) {
        this.setState({nameRoom: event.target.value});
    }
    createRoom() {

        axios.post('/create_room',{nameRoom:this.state.nameRoom}).then((result)=>{
            this.props.addRoom(new Room(this.state.nameRoom));
        });
    }

    componentDidMount() {
        axios.get('/user').then((result) => {
            this.props.setUser(result.data.username);
            this.props.addRooms(result.data.rooms);
        }).catch(()=>{
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <div className="r-center">
                <div className="r-container r-color">
                UserName: {this.props.username}
                <div className="r-center-top r-column r-margin-5">
                    <input type="text" className="r-input" placeholder="Name room" onChange={this.onChangeRoom.bind(this)}></input>
                    <div className="r-button-create" onClick={this.createRoom.bind(this)}>Create room</div>
                    <TableRoom/>
                </div>
            </div>
            </div>

        )
    }
}

const mapsToProps = (state) => {
    return {
        username: state.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addRoom: bindActionCreators(AddRoom, dispatch),
        addRooms: bindActionCreators(AddRooms, dispatch),
        setUser: bindActionCreators(SetUserName,dispatch)
    }
}


export default withRouter(connect(mapsToProps, mapDispatchToProps)(CreateRoom));