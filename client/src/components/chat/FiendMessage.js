import React,{Component} from 'react';

import '../../styles/FriendMessage.css';

class FriendMessage extends Component {


    render() {
        return (
            <div className="friend-message">
                <div className="username">{this.props.username}</div>
                <div className="text-friend">{this.props.message}</div>
            </div>
        )
    }
}

export default FriendMessage;