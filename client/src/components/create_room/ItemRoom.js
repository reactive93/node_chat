import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavLink} from 'react-router-dom';

import '../../styles/ItemRoom.css';
import {SelectRoom} from '../../redux/actions';
class ItemRoom extends Component {

    constructor(props) {
        super(props);

    }

    selectRoom() {
        this.props.selectRoom(this.props.room);
        console.log(this.props.room);
    }

    render() {
        return (
            <NavLink className="item" to={"/chat/"+this.props.room.nameRoom} 
            onClick={this.selectRoom.bind(this)}>
                {this.props.room.nameRoom}
            </NavLink>
        )
    }
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch) => {
    return {
        selectRoom: bindActionCreators(SelectRoom, dispatch)
    }
}

export default connect(null,mapDispatchToProps)(ItemRoom);