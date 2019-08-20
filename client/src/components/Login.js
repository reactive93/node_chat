import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import axios from 'axios';
import '../styles/Login.css';
import {Link,NavLink} from 'react-router-dom';
import {SetUserName} from '../redux/actions';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    inputHandler(event) {
        this.setState({username: event.target.value});
    }

    login() {
        axios.post('/login', {username:this.state.username}).then((result)=>{
            console.log(result);
            this.props.SetUserName(this.state.username);
            this.props.history.push('/create_room');
        });

    }

    render() {
        return (
            <div className="l-center">
                <div className="l-container l-center">
                    <input type="text" className="l-input" placeholder="Enter Username" onChange={this.inputHandler.bind(this)}></input>
                <div className="l-button-login" onClick={this.login.bind(this)}>Login</div>
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
        SetUserName: bindActionCreators(SetUserName, dispatch)
    }
}

export default withRouter(connect(mapsToProps, mapDispatchToProps)(Login));