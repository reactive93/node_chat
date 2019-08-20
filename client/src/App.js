import React, {Component} from 'react';
import { Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import './App.css';
import Login from './components/Login';
import CreateRoom from './components/create_room/CreateRoom';
import Chat from './components/chat/Chat';
import CamChat from './components/cam_chat/CamChat';
class App extends Component {
  render(){
    return (
      <div className="a-container">
        <Switch>
          <Route exact path="/create_room" component={CreateRoom}></Route>
          <Route exact path="/chat/:room" component={Chat}></Route>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/cam_chat" component={CamChat}></Route>
        </Switch>
      </div>
    );
  }

}

export default withRouter(connect(null, null)(App));
