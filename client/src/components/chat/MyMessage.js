import React, {Component} from 'react';

import '../../styles/MyMessage.css';

class MyMessage extends Component {


    render() {
        return (
            <div className="my-message">
                <div className="text">{this.props.message}</div>
            </div>
        )
    }
}

export default MyMessage;