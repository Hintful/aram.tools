import React, { useState, useEffect } from 'react';
import { dataDragonVersion } from "../../../../common/Versions"
import { ChampId } from "../../../../common/data/ChampId"
import { RiSwordFill } from 'react-icons/ri'
import { BiTimeFive } from 'react-icons/bi'

function MatchInfo(props) {
  const matchData = props.data;
  const NUM_PLAYERS = 10;
  const [summonerStats, setSummonerStats] = useState(undefined)
  const [loaded, setLoaded] = useState(false)


  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function formatSeconds(t) {
    return Math.round(t / 60).toString() + "m " + (t % 60).toString() + "s";
  }

  function getSummonerSpecificData(name) {
    for (let idx = 0; idx < NUM_PLAYERS; idx++) {
      if (matchData[matchData.participants[idx]].summonerName == name) {
        return matchData[matchData.participants[idx]];
      }
    }
    console.error("Summoner not found in match data")
    return {};
  }

  function getSummonerStats() {
    if (props.userInfo !== undefined) {
      const data = getSummonerSpecificData(props.userInfo.name)
      setSummonerStats(data)
      setLoaded(true)
    }
  }

  function getEpochRelativeDateString() {
    const delta = Math.round((Date.now() - matchData.gameEndTimestamp) / 1000); // milliseconds to seconds

    if (delta > 86400) { // over a day ago
      const count = Math.floor(delta / 86400)
      return `${count} day${count > 1 ? "s" : ""} ago`;
    } else if (delta > 3600) { // over an hour ago
      const count = Math.floor(delta / 3600)
      return `${count} hour${count > 1 ? "s" : ""} ago`;
    } else if (delta > 60) { // over a minute ago
      const count = Math.floor(delta / 60)
      return `${count} minute${count > 1 ? "s" : ""} ago`;
    } else { // less than a minute ago
      return "Just now"
    }
  }

  function getKDA(k, d, a) {
    return ((k + a) / d).toFixed(2)
  }

  function getKDATextColor(kda) {
    if (kda < 2) { return 'text-gray-500'; }
    else if (kda < 3) { return 'text-black'; }
    else if (kda < 4) { return 'text-green-500'; }
    else if (kda < 5) { return 'text-blue-500'; }
    else if (kda < 6) { return 'text-purple-500'; }
    else { return 'text-yellow-500'; }
  }

  useEffect(() => {
    if (matchData.participants !== undefined && !loaded) {
      getSummonerStats();
    }
  }, [matchData])


  return (
    <>
      { loaded &&
        <div class={classNames(
          summonerStats.win ? "bg-blue-100" : "bg-red-200",
          "w-full rounded-xl flex flex-row shadow-xl px-2 py-4 items-center space-x-4")}>
          { /* Win/Loss + Game Duration */ }
          <div class="flex flex-col text-center text-xs Inter text-closer space-y-1 w-20">
            <span class={classNames(
              "font-bold text-center",
              summonerStats.win ? "text-blue-500" : "text-red-500")}>
              <span class="flex flex-row items-center justify-center space-x-0.5">
                <span><RiSwordFill /></span>
                <span>{ summonerStats.win ? "Win" : "Loss"}</span>
              </span>
            </span>
            <span class="flex flex-row items-center justify-center space-x-0.5">
              <span><BiTimeFive /></span>
              <span>{ formatSeconds(matchData.gameDuration) }</span>
            </span>
            <div class="border-gray-400 mx-2 border-b" />
            <span>
              { getEpochRelativeDateString() }
            </span>
          </div>

          { /* Champ Icon */ }
          <div class="flex flex-col items-center w-14 space-y-1">
            <img src={`http://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/champion/${ChampId[summonerStats.championId].image}`} class="object-center rounded-full object-contain h-10 w-10"/>
            <span class="text-xs Inter text-closer flex-wrap text-center">
              { ChampId[summonerStats.championId].name }
            </span>
          </div>

          <div class="border-gray-500 border-l h-full" />

          { /* KDA + stats */ }
          <div class="flex flex-col items-center Inter text-closer text-sm space-y-1 w-24">
            <span class="text-xs border-b border-gray-400 pb-1 px-1">
              KDA Stats
            </span>
            <span class="flex flex-row space-x-1">
              <span class="font-bold text-blue-500">{ summonerStats.kills }</span>
              <span>/</span>
              <span class="font-bold text-red-500">{ summonerStats.deaths }</span>
              <span>/</span>
              <span class="font-bold text-gray-500">{ summonerStats.assists }</span>
            </span>
            <span class={classNames("text-xs font-bold",
              getKDATextColor(getKDA(summonerStats.kills, summonerStats.deaths, summonerStats.assists))
            )}>
              { getKDA(summonerStats.kills, summonerStats.deaths, summonerStats.assists) } KDA
            </span>
          </div>
        </div>
      }
    </>
  )
}

export default MatchInfo;