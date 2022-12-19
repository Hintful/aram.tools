CREATE TABLE IF NOT EXISTS summoner (
  puuid         TEXT NOT NULL,
  accountId     TEXT NOT NULL,
  name          TEXT NOT NULL,
  level         INT NOT NULL,
  profileIconId INT NOT NULL,
  PRIMARY KEY (puuid)
);

CREATE TABLE IF NOT EXISTS match (
  id                TEXT NOT NULL,
  participants      TEXT NOT NULL,
  gameCreation      BIGINT NOT NULL,
  gameEndTimestamp  BIGINT NOT NULL,
  gameDuration      INT NOT NULL,
  gameMode          TEXT NOT NULL,
  wonTeamId         INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS match_summoner (
  matchId TEXT REFERENCES match (id) ON UPDATE CASCADE ON DELETE CASCADE,
  summonerId TEXT REFERENCES summoner (puuid) ON UPDATE CASCADE,
  teamId  INT,
  CONSTRAINT matchSummonerId PRIMARY KEY (matchId, summonerId)  
);
