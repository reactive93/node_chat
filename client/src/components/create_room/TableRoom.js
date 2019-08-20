import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../../styles/TableRoom.css';
import ItemRoom from './ItemRoom';

class TableRoom extends Component {

    constructor(props) {
        super(props);
    }

    rooms() {
        return (
            <div>
                {
                    this.props.
                    rooms.
                    map((room, i) => { return <ItemRoom key={i} room={room}/> })
                }
            </div>
        )
    }
    render() {
        return (
            <div>
                <div className="head">
                    Rooms
                    {this.rooms()}
                </div>

            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        rooms : state.rooms
    }
}

export default connect(mapStateToProps)(TableRoom);