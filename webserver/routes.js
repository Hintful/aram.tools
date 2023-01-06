const express = require('express');
const router = express.Router()

const {
    userName,
    userInfo,
    matchNum,
    matchNum2,
    latestMatches,
    matchInfo,
    matchId,
    challengesData,
    matchInfoFiltered,
    challengeId,
    challengeLevel,
    challengeLevelLeaderboard,
    aggregatedChampStats,
    userPuuid,
    userInfoByPuuid
} = require('./controllers');

router.get("/lol/summoner/:userName/info", userInfo)
router.get("/lol/summoner/:userName/latest-matches/:matchNum", latestMatches)
router.get("/lol/matches/:matchId", matchInfo)
router.get("/lol/summoner/:userName/challenges", challengesData)
router.get("/lol/summoner/info/by-puuid/:userPuuid/", userInfoByPuuid)

router.get("/lol/matches/:matchId/filtered", matchInfoFiltered)
router.get("/lol/challenges/:challengeId/:challengeLevel", challengeLevelLeaderboard)
router.get("/lol/summoner/:userName/matches/:matchNum2/aggregated", aggregatedChampStats)

router.param("matchNum2", matchNum2)
router.param("userName", userName)
router.param("matchNum", matchNum)
router.param("matchId", matchId)
router.param("challengeId", challengeId)
router.param("challengeLevel", challengeLevel)
router.param("userPuuid", userPuuid)

module.exports = router;