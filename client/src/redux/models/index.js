export class Message {

    /**
     * @param {String} username
     * @param {String} text
     */
    constructor(username, text){
        this.username = username;
        this.text = text;
    }
}

export class Room {

    /**
     * @param {String} nameRoom
     */
    constructor(nameRoom) {
        this.nameRoom = nameRoom;
        /**
         * @type {Array<Message>}
         */
        this.messages = [];
        this.select = false;
    }
}