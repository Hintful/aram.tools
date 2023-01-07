exports.filterMatchInfo = (m) => {
    const ret = {}

    if (m.metadata == undefined) {
        return ret;    
    }

    ret['matchId'] = m.metadata.matchId
    // array of participant
    ret['participants'] = m.metadata.participants
    ret['gameStartTimestamp'] = m.info.gameStartTimestamp
    ret['gameEndTimestamp'] = m.info.gameEndTimestamp
    ret['gameDuration'] = m.info.gameDuration
    ret['gameMode'] = m.info.gameMode
    m.info.participants.forEach(p => {
        var pData = {}
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

        pData['totalSelfHeal'] = p.selfHeal
        pData['totalHealsOnTeammates'] = p.totalHealsOnTeammates
        pData['totalDamageShieldedOnTeammates'] = p.totalDamageShieldedOnTeammates

        pData['totalTimeCCDealt'] = p.totalTimeCCDealt

        pData['damageDealtToBuildings'] = p.damageDealtToBuildings

        pData['totalMinionsKilled'] = p.totalMinionsKilled

        pData['primaryRune'] = p.perks.styles[0].selections[0].perk
        pData['secondaryRune'] = p.perks.styles[1].style

        // challenges
        pData['damagePerMinute'] = p.challenges.damagePerMinute
        pData['skillshotsDodged'] = p.challenges.skillshotsDodged
        pData['skillshotsHit'] = p.challenges.skillshotsHit
        pData['dodgeSkillShotsSmallWindow'] = p.challenges.dodgeSkillShotsSmallWindow
        pData['snowballsHit'] = p.challenges.snowballsHit
        pData['goldPerMinute'] = p.challenges.goldPerMinute
        pData['enemyChampionImmobilizations'] = p.challenges.enemyChampionImmobilizations
        pData['kda'] = p.challenges.kda
        pData['killParticipation'] = p.challenges.killParticipation
        pData['outnumberedKills'] = p.challenges.outnumberedKills
        pData['teamDamagePercentage'] = p.challenges.teamDamagePercentage
        pData['damageTakenOnTeamPercentage'] = p.challenges.damageTakenOnTeamPercentage

        pData['assistMePings'] = p.assistMePings
        pData['baitPings'] = p.baitPings
        pData['basicPings'] = p.basicPings
        pData['commandPings'] = p.commandPings
        pData['dangerPings'] = p.dangerPings
        pData['enemyMissingPings'] = p.enemyMissingPings
        pData['getBackPings'] = p.getBackPings
        pData['holdPings'] = p.holdPings
        pData['needVisionPings'] = p.needVisionPings
        pData['onMyWayPings'] = p.onMyWayPings

        pData['largestKillingSprees'] = p.largestKillingSprees
        pData['largestMultiKill'] = p.largestMultiKill
        pData['longestTimeSpentLiving'] = p.longestTimeSpentLiving
        pData['win'] = p.win

        pData['doubleKills'] = p.doubleKills
        pData['tripleKills'] = p.tripleKills
        pData['quadraKills'] = p.quadraKills
        pData['pentaKills'] = p.pentaKills

        pData['timePlayed'] = p.timePlayed

        ret[`${p.puuid}`] = pData
        return;
    })

    return ret;
}