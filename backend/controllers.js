const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const options = {
	method: 'GET',
	headers: {
        "Content-Type": "application/json",
    }
};

const MAX_MATCH_NUM = 19;

exports.userName = async (req, res, next, name) => {
    FULL_ENDPOINT = process.env.NA_BASE_URL + "lol/summoner/v4/summoners/by-name/" + name + "?api_key=" + process.env.API_KEY
    const leagueResp = await fetch(FULL_ENDPOINT, options);
    const userInfo = await leagueResp.json();
    req.userInfo = userInfo;
    next();
};

exports.matchNum = (req, res, next, matchNum) => {
    req.matchNum = Math.max(matchNum, MAX_MATCH_NUM);
    next()
}

exports.userInfo = (req, res) => {
    return res.json(req.userInfo)
}

exports.latestMatches = async (req, res) => {
    FULL_ENDPOINT = process.env.AMERICAS_MATCH_BASE_URL + `lol/match/v5/matches/by-puuid/${req.userInfo.puuid}/ids` + "?api_key=" + process.env.API_KEY
    const matchResp = await fetch(FULL_ENDPOINT, options)
    const matchIds = await matchResp.json()
    return res.json(matchIds.slice(0, req.matchNum))
}