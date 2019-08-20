const express = require('express');
const expres_session = require('express-session');
const chatRouter = require('./routers/chat');


const app = express();

app.use(express.json());
app.use(expres_session({
    secret:"this is my secret",
    resave: false,
    saveUninitialized:true,
    cookie: {
        maxAge: 600000
    }
}));

express.urlencoded({ extended: false });

app.use(chatRouter);
app.get('/',
    async (req, res) => {
    res.send("HELLO");
});

module.exports = app;