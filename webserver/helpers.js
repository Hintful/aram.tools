// filterMatchInfo filters match information from /lol/match/v5/matches/{by-puuid}/... API
// It has two ways to filter match data: when puuid is passed to the function and when it's not
//  1) When puuid is provided,
//      - filterMatchInfo filters match info ONLY for the puuid summoner
//  2) When not provided,
//      - it filters match info for ALL summoners in the match
exports.filterMatchInfo = (m, puuid = '') => {
    const ret = {}
    ret['matchId'] = m.metadata.matchId
    // array of participant
    ret['participants'] = m.metadata.participants
    ret['gameStartTimestamp'] = m.info.gameStartTimestamp
    ret['gameEndTimestamp'] = m.info.gameEndTimestamp
    ret['gameDuration'] = m.info.gameDuration
    ret['gameMode'] = m.info.gameMode
    m.info.participants.forEach(p => {
        if (puuid && p.puuid != puuid) {
            return;
        }
        var pData = {}
        pData['gameDuration'] = ret['gameDuration']
        pData['summonerName'] = p.summonerName
        pData['summonerLevel'] = p.summonerLevel
        pData['championId'] = p.championId
        pData['championName'] = p.championName
        pData['kills'] = p.kills
        pData['deaths'] = p.deaths
        pData['assists'] = p.assists
        pData['goldEarned'] = p.goldEarned
        pData['item0'] = p.item0
        pData['item1'] = p.item1
        pData['item2'] = p.item2
        pData['item3'] = p.item3
        pData['item4'] = p.item4
        pData['item5'] = p.item5
        pData['item6'] = p.item6

        pData['spell1Casts'] = p.spell1Casts
        pData['spell2Casts'] = p.spell2Casts
        pData['spell3Casts'] = p.spell3Casts
        pData['spell4Casts'] = p.spell4Casts

        pData['summoner1Id'] = p.summoner1Id
        pData['summoner1Casts'] = p.summoner1Casts
        pData['summoner2Id'] = p.summoner2Id
        pData['summoner2Casts'] = p.summoner2Casts

        pData['totalDamageDealtToChampions'] = p.totalDamageDealtToChampions
        pData['physicalDamageDealtToChampions'] = p.physicalDamageDealtToChampions
        pData['magicDamageDealtToChampions'] = p.magicDamageDealtToChampions
        pData['trueDamageDealtToChampions'] = p.trueDamageDealtToChampions
        pData['totalDamageTaken'] = p.totalDamageTaken
        pData['physicalDamageTaken'] = p.physicalDamageTaken
        pData['magicDamageTaken'] = p.magicDamageTaken
        pData['trueDamageTaken'] = p.trueDamageTaken
        pData['damageDealtToBuildings'] = p.damageDealtToBuildings
        pData['totalHeal'] = p.totalHeal
        pData['totalMinionsKilled'] = p.totalMinionsKilled

        // challenges
        c = p.challenges
        pData['damagePerMinute'] = c.damagePerMinute
        pData['skillshotsDodged'] = c.skillshotsDodged
        pData['dodgeSkillShotsSmallWindow'] = c.dodgeSkillShotsSmallWindow
        pData['skillshotsDodged'] = c.skillshotsDodged
        pData['snowballsHit'] = c.snowballsHit
        pData['goldPerMinute'] = c.goldPerMinute
        pData['enemyChampionImmobilizations'] = c.enemyChampionImmobilizations
        pData['kda'] = c.kda
        pData['killParticipation'] = c.killParticipation
        pData['outnumberedKills'] = c.outnumberedKills
        pData['teamDamagePercentage'] = c.teamDamagePercentage
        pData['damageTakenOnTeamPercentage'] = c.damageTakenOnTeamPercentage

        pData['totalHealsOnTeammates'] = p.totalHealsOnTeammates
        pData['totalTimeCCDealt'] = p.totalTimeCCDealt
        pData['largestCriticalStrike'] = p.largestCriticalStrike
        pData['largestKillingSpree'] = p.largestKillingSpree

        pData['pentaKills'] = p.pentaKills
        pData['quadraKills'] = p.quadraKills
        pData['tripleKills'] = p.tripleKills
        pData['doubleKills'] = p.doubleKills

        pData['assistMePings'] = p.assistMePings
        pData['baitPings'] = p.baitPings
        pData['basicPings'] = p.basicPings
        pData['commandPings'] = p.commandPings
        pData['dangerPings'] = p.dangerPings
        pData['enemyMissingPings'] = p.enemyMissingPings
        pData['getBackPings'] = p.getBackPings
        pData['holdPings'] = p.holdPings
        pData['needVisionPings'] = p.needVisionPings
        pData['onMyWayPings'] = p.onMyWayP
        
        pData['largestKillingSprees'] = p.largestKillingSprees
        pData['largestMultiKill'] = p.largestMultiKill
        pData['longestTimeSpentLiving'] = p.longestTimeSpentLiving
        pData['win'] = p.win

        ret[p.puuid] = pData
        return;
    })

    // return filtered data only for the summoner with puuid
    if (puuid) {
        return ret[puuid]
    }

    return ret;
}

const sumMaxKeyList = [
    'kills', 'deaths', 'assists', 'gameDuration', 'totalDamageDealtToChampions',
    'physicalDamageDealtToChampions', 'magicDamageDealtToChampions', 'trueDamageDealtToChampions',
    'totalDamageTaken', 'physicalDamageTaken', 'magicDamageTaken', 'trueDamageTaken',
    'totalHeal', 'totalHealsOnTeammates', 'pentaKills', 'quadraKills', 'tripleKills', 'doubleKills',
    'goldEarned', 'largestKillingSpree', 'totalMinionsKilled', 'totalTimeCCDealt', 'longestTimeSpentLiving',
    'skillshotsDodged', 'snowballsHit', 'teamDamagePercentage', 'damageTakenOnTeamPercentage',
    'outnumberedKills'
]
// sumKeyList = ['numOfWins', 'numOfGames']
const maxKeyList = ['largestCriticalStrike', ]

exports.sumAndMaxSingleSummonerMatchInfo = (dict, data) => {
    for(let i = 0; i < sumMaxKeyList.length; i++) {
        var k = sumMaxKeyList[i]
        if (!(k in dict)) {
            dict[k] = {
                'sum': 0,
                'max': 0,
            }
        }
        dict[k]['sum'] += data[k]
        dict[k]['max'] = Math.max(dict[k]['max'], data[k])
    }

    for(let i = 0; i < maxKeyList.length; i++) {
        var k = maxKeyList[i]
        if (!(k in dict)) {
            dict[k] = 0
        }
        dict[k] = Math.max(dict[k], data[k])
    }

    if (!('numOfWins' in dict)) dict['numOfWins'] = 0;
    if (!('numOfGames' in dict)) dict['numOfGames'] = 0;

    if (data['win']) dict['numOfWins']++;
    dict['numOfGames']++;
}
