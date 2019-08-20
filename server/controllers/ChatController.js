const model = require('../model');


class ChatController {

    /**
     * @param {Request} req
     * @param {Request} res
     * @description get username and rooms for current session
     */
    async getStateSession(req, res) {
        
        if (req.session.user) {
            res.json({username: req.session.user.username, rooms: req.session.user.rooms});
        }
        else {
            res.status(401).json({mess:'not ok'});
        }
    }

    /**
     * @param {Request} req
     * @param {Request} res
     * @description  create session for this user
     */
    async login(req, res) {
        const username = req.body.username;
        if (username !== 'undefined' && username!=='') {
            req.session.user = new model.User(username);
            res.status(201).json({mess:'ok'});
        }
        else {
            res.status(401).json({mess:'not ok'});
        }
    
    }

    /**
     * @param {Request} req
     * @param {Request} res
     * @description add room for current user
     */
    async createRoom (req, res) {
        const nameRoom = req.body.nameRoom;
        if (nameRoom !=='undefined' && nameRoom!=='') {
    
            req.session.user.rooms.push(new model.Room(nameRoom));
            res.status(201).json({mess:'ok'});
        }
        else {
            res.status(405).json({mes:'not ok'});
        }

    }

}

module.exports = new ChatController();