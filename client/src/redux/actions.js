import {ADD_ROOM, ADD_ROOMS, SET_USERNAME, SELECT_ROOM, ADD_MESSAGE} from './actionsType';
import {Room, Message} from './models';


/**
 * @param {Room} room
 */
export const AddRoom = (room) => {
    return {
        type: ADD_ROOM,
        room: room
    };
};

/**
 * @param {Array<Room>} rooms
 */
export const AddRooms = (rooms) => {
    return {
        type: ADD_ROOMS,
        rooms: rooms
    };
};

export const SetUserName = (username) => {
    return {
        type: SET_USERNAME,
        username: username
    };
};

/**
 * @param {Room} room
 */
export const SelectRoom = (room) => {
    return {
        type: SELECT_ROOM,
        selectedRoom: room,
        selectedRoom_str: room.nameRoom
    };
};

/**
 * @param {Message} message
 */
export const AddMessage = (message) => {
    return {
        type: ADD_MESSAGE,
        message: message
    };
};