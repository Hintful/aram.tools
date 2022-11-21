const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const options = {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
    }
};

const ARAM_QUEUE_ID = 450;
const MAX_MATCH_NUM = 100;

exports.userName = async (req, res, next, name) => {
    FULL_ENDPOINT = process.env.NA_BASE_URL + "lol/summoner/v4/summoners/by-name/" + name + "?api_key=" + process.env.API_KEY
    const leagueResp = await fetch(FULL_ENDPOINT, options);
    const userInfo = await leagueResp.json();
    req.userInfo = userInfo;
    next();
};

exports.matchNum = (req, res, next, matchNum) => {
    req.matchNum = Math.min(matchNum, MAX_MATCH_NUM);
    next()
}

exports.matchId = (req, res, next, matchId) => {
    req.matchId = matchId
    next()
}

exports.userInfo = (req, res) => {
    return res.json(req.userInfo)
}

exports.latestMatches = async (req, res) => {
    FULL_ENDPOINT = process.env.AMERICAS_MATCH_BASE_URL + `lol/match/v5/matches/by-puuid/${req.userInfo.puuid}/ids` +
        `?queue=${ARAM_QUEUE_ID}&type=normal&count=${req.matchNum}&api_key=` + process.env.API_KEY
    const matchResp = await fetch(FULL_ENDPOINT, options)
    const matchIds = await matchResp.json()
    return res.json(matchIds)
}

exports.matchInfo = async (req, res) => {
    FULL_ENDPOINT = process.env.AMERICAS_MATCH_BASE_URL + `lol/match/v5/matches/${req.matchId}` + "?api_key=" + process.env.API_KEY
    const matchResp = await fetch(FULL_ENDPOINT, options)
    const matchData = await matchResp.json()
    return res.json(matchData)
}

exports.challengesPercentile = async (req, res) => {
    FULL_ENDPOINT = process.env.NA_BASE_URL + `lol/challenges/v1/challenges/percentiles` + "?api_key=" + process.env.API_KEY
    const response = await fetch(FULL_ENDPOINT, options)
    const data = await response.json()
    return res.json(data)
}

exports.challengesData = async (req, res) => {
    FULL_ENDPOINT = process.env.NA_BASE_URL + `lol/challenges/v1/player-data/${req.userInfo.puuid}` + "?api_key=" + process.env.API_KEY
    const response = await fetch(FULL_ENDPOINT, options)
    const data = await response.json()
    return res.json(data)
}