const express = require('express');
const router = express.Router()

const {
    userName,
    userInfo,
    matchNum,
    latestMatches,
    matchInfo,
    matchId,
} = require('./controllers');

router.get("/lol/summoner/:userName/info", userInfo)
router.get("/lol/summoner/:userName/latest-matches/:matchNum", latestMatches)
router.get("/lol/matches/:matchId", matchInfo)

router.param("userName", userName)
router.param("matchNum", matchNum)
router.param("matchId", matchId)

module.exports = router;