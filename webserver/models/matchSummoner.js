export default (sequelize, DataTypes) => {
    const MatchSummoners = sequelize.define('MatchSummoners', {
        summonerId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Summoners',
                key: 'puuid'
            }
        },
        matchId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Matches',
                key: 'id'
            }
        },
        championId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        championName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        kills: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        deaths: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        assists: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        goldEarned: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        item0: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        item1: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        item2: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        item3: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        item4: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        item5: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        item6: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        spell1Casts: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        spell2Casts: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        spell3Casts: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        spell4Casts: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        summoner1Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        summoner1Casts: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        summoner2Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        summoner2Casts: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalDamageDealtToChampions: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        physicalDamageDealtToChampions: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        magicDamageDealtToChampions: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        trueDamageDealtToChampions: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalDamageTaken: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        physicalDamageTaken: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        magicDamageTaken: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        trueDamageTaken: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        damageDealtToBuildings: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalHeal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalMinionsKilled: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        damagePerMinute: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        skillshotsDodged: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dodgeSkillShotsSmallWindow: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        skillshotsDodged: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        snowballsHit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        goldPerMinute: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        enemyChampionImmobilizations: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        kda: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        killParticipation: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        outnumberedKills: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        teamDamagePercentage: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        damageTakenOnTeamPercentage: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        assistMePings: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        baitPings: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        basicPings: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        commandPings: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dangerPings: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        enemyMissingPings: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        getBackPings: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        holdPings: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        needVisionPings: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        onMyWayPings: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        largestKillingSprees: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        largestMultiKill: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        longestTimeSpentLiving: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        win: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });
    return GroupUsers;
  };