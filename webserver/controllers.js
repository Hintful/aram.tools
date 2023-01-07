const {
    filterMatchInfo,
    sumAndMaxSingleSummonerMatchInfo
} = require('./helpers');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const options = {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
    }
};

function buildMatchesEndpointWithEndtime(puuid, count, endTime) {
    return process.env.AMERICAS_MATCH_BASE_URL + `lol/match/v5/matches/by-puuid/${puuid}/ids` +
        `?queue=${ARAM_QUEUE_ID}&type=normal&count=${count}&endTime=${endTime}&api_key=` + process.env.RIOT_API_KEY
}

function getCurrentTimestampInSeconds() {
    return Math.floor(Date.now() / 1000)
}

async function getMatchEndTimestamp(matchId) {
    FULL_ENDPOINT = process.env.AMERICAS_MATCH_BASE_URL + `lol/match/v5/matches/${matchId}` + "?api_key=" + process.env.RIOT_API_KEY
    matchResp = await fetch(FULL_ENDPOINT, options)
    matchData = await matchResp.json()
    return matchData['gameEndTimestamp']
}

const ARAM_QUEUE_ID = 450;
const MAX_MATCH_NUM = 100;

exports.userName = async (req, res, next, name) => {
    FULL_ENDPOINT = process.env.NA_BASE_URL + "lol/summoner/v4/summoners/by-name/" + name + "?api_key=" + process.env.RIOT_API_KEY
    const leagueResp = await fetch(FULL_ENDPOINT, options);
    const userInfo = await leagueResp.json();
    req.userInfo = userInfo;
    next();
};

exports.userPuuid = async(req, res, next, userPuuid) => {
    req.userPuuid = userPuuid
    next()
}

exports.matchNum = (req, res, next, matchNum) => {
    req.matchNum = Math.min(matchNum, MAX_MATCH_NUM);
    next()
}

exports.matchNum2 = (req, res, next, matchNum2) => {
    req.matchNum = matchNum2;
    next()
}

exports.matchId = (req, res, next, matchId) => {
    req.matchId = matchId
    next()
}

exports.challengeId = (req, res, next, challengeId) => {
    req.challengeId = challengeId
    next()
}

exports.challengeLevel = (req, res, next, challengeLevel) => {
    req.challengeLevel = challengeLevel
    next()
}

exports.userInfo = (req, res) => {
    return res.json(req.userInfo)
}
exports.latestMatches = async (req, res) => {
    FULL_ENDPOINT = process.env.AMERICAS_MATCH_BASE_URL + `lol/match/v5/matches/by-puuid/${req.userInfo.puuid}/ids` +
        `?queue=${ARAM_QUEUE_ID}&type=normal&count=${req.matchNum}&api_key=` + process.env.RIOT_API_KEY
    const matchResp = await fetch(FULL_ENDPOINT, options)
    const matchIds = await matchResp.json()
    return res.json(matchIds)
}

exports.matchInfo = async (req, res) => {
    FULL_ENDPOINT = process.env.AMERICAS_MATCH_BASE_URL + `lol/match/v5/matches/${req.matchId}` + "?api_key=" + process.env.RIOT_API_KEY
    const matchResp = await fetch(FULL_ENDPOINT, options)
    const matchData = await matchResp.json()
    return res.json(matchData)
}

exports.challengesPercentile = async (req, res) => {
    FULL_ENDPOINT = process.env.NA_BASE_URL + `lol/challenges/v1/challenges/percentiles` + "?api_key=" + process.env.RIOT_API_KEY
    const response = await fetch(FULL_ENDPOINT, options)
    const data = await response.json()
    return res.json(data)
}

exports.challengesData = async (req, res) => {
    FULL_ENDPOINT = process.env.NA_BASE_URL + `lol/challenges/v1/player-data/${req.userInfo.puuid}` + "?api_key=" + process.env.RIOT_API_KEY
    const response = await fetch(FULL_ENDPOINT, options)
    const data = await response.json()
    return res.json(data)
}

exports.matchInfoFiltered = async (req, res) => {
    FULL_ENDPOINT = process.env.AMERICAS_MATCH_BASE_URL + `lol/match/v5/matches/${req.matchId}` + "?api_key=" + process.env.RIOT_API_KEY
    const matchResp = await fetch(FULL_ENDPOINT, options)
    const matchData = await matchResp.json()
    const fileteredMatchInfo = filterMatchInfo(matchData)
    return res.json(fileteredMatchInfo)
}

exports.challengeLevelLeaderboard = async (req, res) => {
    FULL_ENDPOINT = process.env.NA_BASE_URL + `lol/challenges/v1/challenges/${req.challengeId}/leaderboards/by-level/${req.challengeLevel}` + "?api_key=" + process.env.RIOT_API_KEY
    const response = await fetch(FULL_ENDPOINT, options)
    const data = await response.json()
    return res.json(data)
}

function createPromiseForMatchInfoAPICall(matchId) {
    return new Promise((resolve, reject) => {
        
    });
}

exports.aggregatedChampStats = async (req, res) => {
    var now = getCurrentTimestampInSeconds()
    var currentTimestamp = now
    var endpointToCall, response, data, fileteredMatchInfo;
    var matchIds = []
    const champsData = {}

    var countLeft = req.matchNum
    var currCount = 0

    while(countLeft > 0) {
        currCount = Math.min(countLeft, MAX_MATCH_NUM)
        endpointToCall = buildMatchesEndpointWithEndtime(req.userInfo.puuid, currCount, currentTimestamp)
        response = await fetch(endpointToCall, options)
        data = await response.json()
        if (data.length === 0) {
            break;
        }
        countLeft -= currCount
        lastMatchId = data[data.length - 1]
        currentTimestamp = getMatchEndTimestamp(lastMatchId)
        matchIds = matchIds.concat(data)
    }
    
    var urls = []
    // iterave over match ids to calculate sum/max data
    for(let i = 0; i < matchIds.length; i++) {
        let matchURL = process.env.AMERICAS_MATCH_BASE_URL + `lol/match/v5/matches/${matchIds[i]}` + "?api_key=" + process.env.RIOT_API_KEY
        urls.push(matchURL)
    }

    const champStats = await Promise.all(urls.map(async url => {
        const resp = await fetch(url);
        return resp.json();
    }));

    for (let i = 0; i < champStats.length; i++) {
        fileteredMatchInfo = filterMatchInfo(champStats[i], req.userInfo.puuid)
        if (!(fileteredMatchInfo['championName'] in champsData)) {
            champsData[fileteredMatchInfo['championName']] = {}
            champsData[fileteredMatchInfo['championName']]['championId'] = fileteredMatchInfo['championId']
        }
        sumAndMaxSingleSummonerMatchInfo(champsData[fileteredMatchInfo['championName']], fileteredMatchInfo)
    }
    
    return res.json(champsData)
}

exports.userInfoByPuuid = async (req, res) => {
    FULL_ENDPOINT = process.env.NA_BASE_URL + `lol/summoner/v4/summoners/by-puuid/${req.userPuuid}?api_key=` + process.env.RIOT_API_KEY
    const response = await fetch(FULL_ENDPOINT, options);
    const data = await response.json();
    return res.json(data)
}