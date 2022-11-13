const express = require('express');
const router = express.Router()

const {
    userName,
    userInfo,
    matchNum,
    latestMatches,
} = require('./controllers');

router.get("/lol/summoner/:userName/info", userInfo)
router.get("/lol/summoner/:userName/latest-matches/:matchNum", latestMatches)

router.param("userName", userName);
router.param("matchNum", matchNum)

module.exports = router;