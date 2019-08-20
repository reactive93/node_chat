import React,{Component} from 'react';

import '../../styles/People.css';

class People extends Component {



    render() {
        return (
            <div className="people-item">{this.props.username}</div>
        )
    }
}

export default People;