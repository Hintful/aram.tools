const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const options = {
	method: 'GET',
	headers: {
        "Content-Type": "application/json",
    }
};

exports.userName = async (req, res, next, name) => {
    FULL_ENDPOINT = process.env.BASE_URL + "lol/summoner/v4/summoners/by-name/" + name + "?api_key=" + process.env.API_KEY
    const leagueResp = await fetch(FULL_ENDPOINT, options);
    const userInfo = await leagueResp.json(); //extract JSON from the http response
    req.userInfo = userInfo;
    next();
};

exports.userInfo = (req, res) => {
    return res.json(req.userInfo)
}