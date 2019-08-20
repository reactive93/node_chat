
class Message {

    /**
     * @param {String} username
     * @param {String} text
     */
    constructor(username, text){
        this.username = username;
        this.text = text;
    }
}

class Room {

    /**
     * @param {String} nameRoom
     */
    constructor(nameRoom) {
        this.nameRoom = nameRoom;
        /**
         * @type {Array<Message>}
         */
        this.messages = []
    }
}

class User {
    /**
     *
     * @param {String} username
     */
    constructor(username) {
        this.username = username;
        /**
         * @type {Room}
         */
        this.rooms = []
    }

}

module.exports.User = User;
module.exports.Message = Message;
module.exports.Room = Room;