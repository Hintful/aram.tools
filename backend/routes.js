const express = require('express');
const router = express.Router()

const {
    userName,
    userInfo,
} = require('./controllers');

router.get("/lol/summoner/info/:userName", userInfo)

router.param("userName", userName);

module.exports = router;