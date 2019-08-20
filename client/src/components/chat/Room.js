import React,{Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {SelectRoom} from '../../redux/actions';
import '../../styles/Room.css';

class Room extends Component {

    constructor(props) {
        super(props);
    }

    selectRoom() {
        this.props.selectRoom(this.props.room);
    }

    render() {
        return (
            <NavLink onClick={this.selectRoom.bind(this)} to={{pathname:'/chat/' + this.props.room.nameRoom}} className={'room-item ' + (this.props.select? 'room-selected':'') }>{this.props.room.nameRoom}</NavLink>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectRoom: bindActionCreators(SelectRoom, dispatch)
    }
}


export default connect(null,mapDispatchToProps) (Room);