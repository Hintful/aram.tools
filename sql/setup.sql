CREATE TABLE IF NOT EXISTS summoner (
  puuid         TEXT NOT NULL,
  accountId     TEXT NOT NULL,
  name          TEXT NOT NULL,
  level         INT NOT NULL,
  profileIconId INT NOT NULL,
  PRIMARY KEY (puuid)
);

CREATE TABLE IF NOT EXISTS match (
  id                  TEXT NOT NULL,
  participants        TEXT NOT NULL,
  gameStartTimestamp  BIGINT NOT NULL,
  gameEndTimestamp    BIGINT NOT NULL,
  gameDuration        INT NOT NULL,
  gameMode            TEXT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS match_summoner (
  matchId                 TEXT REFERENCES match (id) ON UPDATE CASCADE ON DELETE CASCADE,
  summonerId              TEXT REFERENCES summoner (puuid) ON UPDATE CASCADE,
  summonerName            TEXT NOT NULL,
  summonerLevel           INT NOT NULL,
  championId              INT NOT NULL,
  championName            TEXT NOT NULL,
  kills                   INT NOT NULL,
  deaths                  INT NOT NULL,
  assists                 INT NOT NULL,
  goldEarned              INT NOT NULL,
  item0                   INT NOT NULL,
  item1                   INT NOT NULL,
  item2                   INT NOT NULL,
  item3                   INT NOT NULL,
  item4                   INT NOT NULL,
  item5                   INT NOT NULL,
  item6                   INT NOT NULL,
  spell1Casts             INT NOT NULL,
  spell2Casts             INT NOT NULL,
  spell3Casts             INT NOT NULL,
  spell4Casts             INT NOT NULL,
  summoner1Id             INT NOT NULL,
  summoner1Casts          INT NOT NULL,
  summoner2Id             INT NOT NULL,
  summoner2Casts          INT NOT NULL,
  
  totalDamageDealtToChampions     INT NOT NULL,
  physicalDamageDealtToChampions  INT NOT NULL,
  magicDamageDealtToChampions     INT NOT NULL,
  trueDamageDealtToChampions      INT NOT NULL,

  totalDamageTaken                INT NOT NULL,
  physicalDamageTaken             INT NOT NULL,
  magicDamageTaken                INT NOT NULL,
  trueDamageTaken                 INT NOT NULL,

  damageDealtToBuildings          INT NOT NULL,

  totalHeal                       INT NOT NULL,
  totalMinionsKilled              INT NOT NULL,

  assistMePings           INT NOT NULL,
  baitPings               INT NOT NULL,
  basicPings              INT NOT NULL,
  commandPings            INT NOT NULL,
  dangerPings             INT NOT NULL,
  enemyMissingPings       INT NOT NULL,
  getBackPings            INT NOT NULL,
  holdPings               INT NOT NULL,
  needVisionPings         INT NOT NULL,
  onMyWayPings            INT NOT NULL,

  largestKillingSprees    INT NOT NULL,
  largestMultiKill        INT NOT NULL,
  longestTimeSpentLiving  INT NOT NULL,
  win                     BOOLEAN NOT NULL,
  CONSTRAINT matchSummonerId PRIMARY KEY (matchId, summonerId)  
);
