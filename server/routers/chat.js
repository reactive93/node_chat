const router = require('express').Router();
const chatController = require('../controllers/ChatController');


router.get("/user", chatController.getStateSession);
router.post('/login',chatController.login);
router.post('/create_room',chatController.createRoom);


module.exports = router;