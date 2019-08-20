import {createStore} from 'redux';
import {ADD_ROOM, ADD_ROOMS, SET_USERNAME, SELECT_ROOM, ADD_MESSAGE} from './actionsType';
import {Room} from '../redux/models';



let initState = {
    username:'username223232',
    /**
     * @type {Array<Room>}
     */
    rooms: [],

    /**
     * @type {Room}
     */
    selectedRoom: null,
    selectedRoom_str: ''
}


export const rootReducer=(state=initState, action)=>{

    switch (action.type) {
        case ADD_ROOM:
            return {
                ...state, rooms:[...state.rooms, action.room]
            };
        case ADD_ROOMS: return {
            ...state, rooms:[...action.rooms]
        };
        case ADD_MESSAGE: {
            return Object.assign({},state, {selectedRoom:{...state.selectedRoom,messages:[...state.selectedRoom.messages,action.message]}})
        }
        case SET_USERNAME:
            return {...state, username: action.username};
        case SELECT_ROOM:
            return {...state, selectedRoom: action.selectedRoom, selectedRoom_str:action.selectedRoom_str};

    }
    return state;

};

export const store = createStore(rootReducer);