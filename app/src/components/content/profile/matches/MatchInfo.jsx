import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataDragonVersion } from "../../../../common/Versions"
import { ChampId } from "../../../../common/data/ChampId"
import { RiSwordFill } from 'react-icons/ri'
import { BiTimeFive } from 'react-icons/bi'
import { GiSwordsEmblem, GiSpikes, GiSwordArray } from 'react-icons/gi'
import { BsShieldShaded, BsHandbagFill } from 'react-icons/bs';
import { FaHeartbeat, FaTools, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix, FaMagic, FaPercent } from 'react-icons/fa';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';

function MatchInfo(props) {
  const matchData = props.data;
  const NUM_PLAYERS = 10;
  const [summonerStats, setSummonerStats] = useState(undefined)
  const [loaded, setLoaded] = useState(false)
  const [detailsExpanded, setDetailsExpanded] = useState(false)
  const [detailsTab, setDetailsTab] = useState(0)

  const detailTabMenus = [
    "Damage Stats",
    "Tank Stats",
    "Support Stats",
    "Utility Stats",
  ]

  const navigate = useNavigate();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function formatSeconds(t) {
    return Math.round(t / 60).toString() + "m " + (t % 60).toString() + "s";
  }

  function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    if (d == 0) { return (k + a).toFixed(2); }
    return ((k + a) / d).toFixed(2)
  }

  function getPerMinuteStats(value, time) {
    return (value / time * 60).toFixed(2);
  }

  function getKDATextColor(kda) {
    if (kda < 2 || isNaN(kda)) { return 'text-gray-500'; }
    else if (kda < 3) { return 'text-black'; }
    else if (kda < 4) { return 'text-green-500'; }
    else if (kda < 5) { return 'text-blue-500'; }
    else if (kda < 6) { return 'text-purple-500'; }
    else if (kda < 8) { return 'text-yellow-500'; }
    else if (kda < 12) { return 'text-red-500'; }
    else { return 'bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-transparent bg-clip-text font-bold'; }
  }
  
  function getDPMTextColor(value) {
    if (value < 1000 || isNaN(value)) { return 'text-gray-500'; }
    else if (value < 1400) { return 'text-black'; }
    else if (value < 1800) { return 'text-green-500'; }
    else if (value < 2400) { return 'text-blue-500'; }
    else if (value < 3000) { return 'text-purple-500'; }
    else if (value < 3600) { return 'text-yellow-500'; }
    else if (value < 4800) { return 'text-red-500'; }
    else { return 'bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-transparent bg-clip-text font-bold'; }
  }

  function getTPMTextColor(value) {
    if (value < 800 || isNaN(value)) { return 'text-gray-500'; }
    else if (value < 1100) { return 'text-black'; }
    else if (value < 1400) { return 'text-green-500'; }
    else if (value < 1800) { return 'text-blue-500'; }
    else if (value < 2300) { return 'text-purple-500'; }
    else if (value < 2800) { return 'text-yellow-500'; }
    else if (value < 3800) { return 'text-red-500';}
    else { return 'bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-transparent bg-clip-text font-bold'; }
  }

  function getEHPMTextColor(value) {
    if (value < 100 || isNaN(value)) { return 'text-gray-500'; }
    else if (value < 200) { return 'text-black'; }
    else if (value < 400) { return 'text-green-500'; }
    else if (value < 600) { return 'text-blue-500'; }
    else if (value < 800) { return 'text-purple-500'; }
    else if (value < 1000) { return 'text-yellow-500'; }
    else if (value < 1400) { return 'text-red-500'; }
    else { return 'bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-transparent bg-clip-text font-bold'; }
  }

  function getCCPMTextColor(value) {
    if (value < 5 || isNaN(value)) { return 'text-gray-500'; }
    else if (value < 10) { return 'text-black'; }
    else if (value < 20) { return 'text-green-500'; }
    else if (value < 30) { return 'text-blue-500'; }
    else if (value < 40) { return 'text-purple-500'; }
    else if (value < 50) { return 'text-yellow-500'; }
    else if (value < 70) { return 'text-red-500'; }
    else { return 'bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-transparent bg-clip-text font-bold'; }
  }

  function getContributionTextColor(value) {
    if (value < 0.1 || isNaN(value)) { return 'text-gray-500'; }
    else if (value < 0.2) { return 'text-black'; }
    else if (value < 0.25) { return 'text-green-500'; }
    else if (value < 0.3) { return 'text-blue-500'; }
    else if (value < 0.35) { return 'text-purple-500'; }
    else if (value < 0.4) { return 'text-yellow-500'; }
    else if (value < 0.5) { return 'text-red-500'; }
    else { return 'bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-transparent bg-clip-text font-bold'; }
  }

  function getContributionBgColor(value) {
    if (value < 0.1 || isNaN(value)) { return 'bg-gray-200'; }
    else if (value < 0.2) { return 'bg-gray-400'; }
    else if (value < 0.25) { return 'bg-green-400'; }
    else if (value < 0.3) { return 'bg-blue-400'; }
    else if (value < 0.35) { return 'bg-purple-400'; }
    else if (value < 0.4) { return 'bg-yellow-400'; }
    else if (value < 0.5) { return 'bg-red-400'; }
    else { return 'bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500'; }
  }

  function getMultikillString(value) {
    if (value <= 1 || isNaN(value)) { return <span class="text-gray-500">No Multikills</span> }
    else if (value == 2) { return <span class="flex flex-row items-center text-blue-500"><FaDiceTwo class="mr-0.5"/>Double Kill</span> }
    else if (value == 3) { return <span class="flex flex-row items-center text-purple-500"><FaDiceThree class="mr-0.5"/>Triple Kill</span> }
    else if (value == 4) { return <span class="flex flex-row items-center text-yellow-500"><FaDiceFour class="mr-0.5"/>Quadra Kill</span> }
    else if (value == 5) { return <span class="flex flex-row items-center text-red-500"><FaDiceFive class="mr-0.5"/>Penta Kill</span> }
    else { return <span class="flex flex-row items-center bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-transparent bg-clip-text font-bold"><FaDiceSix class="mr-0.5"/>Legendary Kill</span>}
  }

  function getItemImage(itemId, size=6) {
    if (itemId != 0) {
      return <img class={`h-${size} w-${size} border border-gray-600`}
      src={`https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/item/${itemId}.png`} />
    } else {
      return <div class={`h-${size} w-${size} border border-gray-600 bg-black`} /> // place holder box
    }
  }

  function getPerkImage(perkId) {
    if (perkId != 0) {
      return <img class="h-6 w-6"
      src={`/perks/${perkId}.png`} />
    }
  }

  function search(e, summonerName) {
    e.preventDefault();
    navigate(`/profile/${summonerName}`);
    navigate(0)
  }

  function renderPlayerDetailStats(data, idx) {
    switch (detailTabMenus[detailsTab]) {
      case "Damage Stats":
        return renderDamageDetails(data, idx);
      case "Tank Stats":
        return renderTankDetails(data, idx);
      case "Support Stats":
        return renderSupportDetails(data, idx);
      case "Utility Stats":
        return renderUtilityDetails(data, idx);
      default:
        return renderDamageDetails(data, idx);

    }
  }

  function renderPlayerDetails(data, idx) {
    return <div class="flex flex-row text-closer border-gray-400 mx-1.5 py-0.5 items-center">
      { /* Static */ }
      <div class="flex flex-row items-center"> 
        { /* MVP Crown [Placeholder] */ }
        <div class="flex flex-row items-center w-8">

        </div>

        { /* Champion Icon / Summoner Name*/ }
        <div class="flex flex-row items-center space-x-1 w-40">
          <img src={`http://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/champion/${ChampId[data.championId].image}`} class="object-center rounded-full object-contain h-6 w-6"/>
          <span onClick={(e) => search(e, data.summonerName)} class="text-xs text-black Inter text-closer flex-wrap text-center underline hover:cursor-pointer hover:text-gray-600">
            { data.summonerName }
          </span>
        </div>

        { /* KDA */ }
        <div class="flex flex-row items-center space-x-0.5 w-16 text-sm font-bold Source-sans-pro">
          <span class="text-blue-500">{ data.kills }</span>
          <span>/</span>
          <span class="text-red-500">{ data.deaths }</span>
          <span>/</span>
          <span class="text-gray-500">{ data.assists }</span>
        </div>

        { /* Items */ }
        <div class="flex flex-row items-center space-x-0.5 w-48 h-6">
          { getItemImage(data.item0, 6) }
          { getItemImage(data.item1, 6) }
          { getItemImage(data.item2, 6) }
          { getItemImage(data.item3, 6) }
          { getItemImage(data.item4, 6) }
          { getItemImage(data.item5, 6) }
          { getItemImage(data.item6, 6) }
        </div>
      </div>

      { /* Render appropriate details depending on which detail tab is selected dynamically */ }
      { renderPlayerDetailStats(data, idx) }
    </div>
  }

  function getGameMaxDamageContribution() {
    let maxDamageContribution = 0; // init

    for(let i = 0; i < NUM_PLAYERS; i++) {
      maxDamageContribution = Math.max(maxDamageContribution, matchData[matchData.participants[i]].teamDamagePercentage);
    }

    return maxDamageContribution;
  }

  function getGameMaxTankContribution() {
    let maxTankContribution = 0; // init

    for(let i = 0; i < NUM_PLAYERS; i++) {
      maxTankContribution = Math.max(maxTankContribution, matchData[matchData.participants[i]].damageTakenOnTeamPercentage);
    }

    return maxTankContribution;
  }

  function getGameMaxSupportContribution() {
    let maxSupportContribution = 0; // init

    for(let i = 0; i < NUM_PLAYERS; i++) {
      maxSupportContribution = Math.max(maxSupportContribution, matchData[matchData.participants[i]].totalHealsOnTeammates + matchData[matchData.participants[i]].totalDamageShieldedOnTeammates);
    }

    return maxSupportContribution;
  }

  function getGameMaxUtilityContribution() {
    let maxUtilityContribution = 0; // init

    for(let i = 0; i < NUM_PLAYERS; i++) {
      maxUtilityContribution = Math.max(maxUtilityContribution, matchData[matchData.participants[i]].totalTimeCCDealt);
    }

    return maxUtilityContribution;
  }

  function renderDamageDetails(data, idx) {
    return <div class="flex flex-row text-closer space-x-1 items-center">
      { /* Raw Damage */ }
      <span class="flex flex-row items-center text-sm w-16 space-x-0.5 Source-sans-pro">
        <span><GiSpikes /></span>
        <span>{ formatNumber(data.totalDamageDealtToChampions) }</span>
      </span>
      
      { /* Damage Contribution */ }
      <div class="flex flex-row items-center bg-white border border-gray-500 w-24 h-4">
        <div class={classNames("flex flex-row items-center leading-none h-full text-transparent border-gray-500",
          (data.teamDamagePercentage == getGameMaxDamageContribution() || data.teamDamagePercentage == 0) ? "" : "border-r",
          getContributionBgColor(data.teamDamagePercentage)
        )} style={{width: `${(data.teamDamagePercentage / getGameMaxDamageContribution()) * 100}%`}}>|</div>
      </div>
      <span class="flex flex-row items-center w-10 font-bold Source-sans-pro text-sm">
        <span class={getContributionTextColor(data.teamDamagePercentage)}>{ formatNumber((data.teamDamagePercentage * 100).toFixed(1)) }%</span>
      </span>
    </div>
  }

  function renderTankDetails(data, idx) {
    return <div class="flex flex-row text-closer space-x-1 items-center">
      { /* Raw Tank */ }
      <span class="flex flex-row items-center text-sm w-16 space-x-0.5 Source-sans-pro">
        <span><BsShieldShaded /></span>
        <span>{ formatNumber(data.totalDamageTaken) }</span>
      </span>
      
      { /* Tank Contribution */ }
      <div class="flex flex-row items-center bg-white border border-gray-500 w-24 h-4">
        <div class={classNames("flex flex-row items-center leading-none h-full text-transparent border-gray-500",
          (data.damageTakenOnTeamPercentage == getGameMaxTankContribution() || data.damageTakenOnTeamPercentage == 0) ? "" : "border-r",
          getContributionBgColor(data.damageTakenOnTeamPercentage)
        )} style={{width: `${(data.damageTakenOnTeamPercentage / getGameMaxTankContribution()) * 100}%`}}>|</div>
      </div>
      <span class="flex flex-row items-center w-10 font-bold Source-sans-pro text-sm">
        <span class={getContributionTextColor(data.damageTakenOnTeamPercentage)}>{ formatNumber((data.damageTakenOnTeamPercentage * 100).toFixed(1)) }%</span>
      </span>
    </div>
  }

  function renderSupportDetails(data, idx) {
    const supportAmount = data.totalHealsOnTeammates + data.totalDamageShieldedOnTeammates;
    return <div class="flex flex-row text-closer space-x-1 items-center">
      { /* Heal + Shield amount */ }
      <span class="flex flex-row items-center text-sm w-16 space-x-1 Source-sans-pro">
        <span><FaHeartbeat /></span>
        <span>{ formatNumber(supportAmount) }</span>
      </span>
      
      { /* Support Contribution */ }
      <div class="flex flex-row items-center bg-white border border-gray-500 w-24 h-4">
        <div class={classNames("flex flex-row items-center leading-none h-full text-transparent border-gray-500 bg-green-300",
          (supportAmount == getGameMaxSupportContribution() || supportAmount == 0) ? "" : "border-r",
        )} style={{width: `${(data.totalHealsOnTeammates + data.totalDamageShieldedOnTeammates) / getGameMaxSupportContribution() * 100}%`}}>|</div>
      </div>
    </div>
  }

  function renderUtilityDetails(data, idx) {
    return <div class="flex flex-row text-closer space-x-1 items-center">
      { /* CC amount */ }
      <span class="flex flex-row items-center text-sm w-16 space-x-1 Source-sans-pro">
        <span><FaTools /></span>
        <span>{ formatNumber(data.totalTimeCCDealt) }</span>
      </span>
      
      { /* CC Contribution */ }
      <div class="flex flex-row items-center bg-white border border-gray-500 w-24 h-4">
        <div class={classNames("flex flex-row items-center leading-none h-full text-transparent border-gray-500 bg-green-300",
          (data.totalTimeCCDealt == getGameMaxUtilityContribution() || data.totalTimeCCDealt == 0) ? "" : "border-r",
        )} style={{width: `${(data.totalTimeCCDealt) / getGameMaxUtilityContribution() * 100}%`}}>|</div>
      </div>
    </div>
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
          summonerStats.win ? "bg-blue-100 border-2 border-blue-300" : "bg-red-200 border-2 border-red-300",
          "w-full flex flex-col shadow-xl",
          detailsExpanded ? "rounded-t-xl" : "rounded-xl"
          )}>
          <div class="flex flex-row space-x-4 px-2 py-4 items-center">
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
            
            { /* Vertical border */ }
            <div class="border-gray-500 border-l h-full" />

            { /* KDA stats */ }
            <div class="flex flex-col items-center Inter text-closer text-sm space-y-1 w-24">
              <span class="flex flex-row items-center justify-center space-x-0.5 text-xs border-b border-gray-400 pb-1 px-1">
                <span><GiSwordsEmblem /></span>
                <span>KDA Stats</span>
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

            { /* Damage stats */ }
            <div class="flex flex-col items-center Inter text-closer text-sm space-y-1 w-28">
              <span class="flex flex-row items-center justify-center space-x-0.5 text-xs border-b border-gray-400 pb-1 px-1">
                <span><GiSpikes /></span>
                <span>Damage Stats</span>
              </span>
              <span class="flex flex-row space-x-1">
                <span class="font-bold text-gray-600">{ formatNumber(summonerStats.totalDamageDealtToChampions) }</span>
                <span>Total</span>
              </span>
              <span class={classNames("text-xs font-bold",
                getDPMTextColor(getPerMinuteStats(summonerStats.totalDamageDealtToChampions, matchData.gameDuration))
              )}>
                { formatNumber(getPerMinuteStats(summonerStats.totalDamageDealtToChampions, matchData.gameDuration)) } / min
              </span>
            </div>

            { /* Tank stats */ }
            <div class="flex flex-col items-center Inter text-closer text-sm space-y-1 w-24">
              <span class="flex flex-row items-center justify-center space-x-0.5 text-xs border-b border-gray-400 pb-1 px-1">
                <span><BsShieldShaded /></span>
                <span>Tank Stats</span>
              </span>
              <span class="flex flex-row space-x-1">
                <span class="font-bold text-gray-600">{ formatNumber(summonerStats.totalDamageTaken) }</span>
                <span>Total</span>
              </span>
              <span class={classNames("text-xs font-bold",
                getTPMTextColor(getPerMinuteStats(summonerStats.totalDamageTaken, matchData.gameDuration))
              )}>
                { formatNumber(getPerMinuteStats(summonerStats.totalDamageTaken, matchData.gameDuration)) } / min
              </span>
            </div>

            { /* Support stats */ }
            <div class="flex flex-col items-center Inter text-closer text-sm space-y-1 w-44">
              <span class="flex flex-row items-center justify-center space-x-0.5 text-xs border-b border-gray-400 pb-1 w-28">
                <span><FaHeartbeat /></span>
                <span>Support Stats</span>
              </span>
              <div class="flex flex-col space-y-1 text-center">
                <div class="flex flex-row space-x-3 items-center justify-center w-20">
                  <span class="flex flex-row space-x-1">
                    <span class="font-bold text-gray-600">{ formatNumber(summonerStats.totalHealsOnTeammates) }</span>
                    <span>Healed</span>
                  </span>
                  <span class="flex flex-row space-x-1">
                    <span class="font-bold text-gray-600">{ formatNumber(summonerStats.totalDamageShieldedOnTeammates) }</span>
                    <span>Shielded</span>
                  </span>
                </div>

                <span class={classNames("text-xs font-bold",
                  getEHPMTextColor(getPerMinuteStats(summonerStats.totalHealsOnTeammates + summonerStats.totalDamageShieldedOnTeammates, matchData.gameDuration))
                )}>
                  { formatNumber(getPerMinuteStats(summonerStats.totalHealsOnTeammates + summonerStats.totalDamageShieldedOnTeammates, matchData.gameDuration)) } / min
                </span>
              </div>
            </div>

            { /* Utility stats */ }
            <div class="flex flex-col items-center Inter text-closer text-sm space-y-1 w-28">
              <span class="flex flex-row items-center justify-center space-x-1 text-xs border-b border-gray-400 pb-1 px-1">
                <span><FaTools /></span>
                <span>Utility Stats</span>
              </span>
              <span class="flex flex-row space-x-1">
                <span class="font-bold text-gray-600">{ formatNumber(summonerStats.totalTimeCCDealt) }</span>
                <span>CC Score</span>
              </span>
              <span class={classNames("text-xs font-bold",
                getCCPMTextColor(getPerMinuteStats(summonerStats.totalTimeCCDealt, matchData.gameDuration))
              )}>
                { formatNumber(getPerMinuteStats(summonerStats.totalTimeCCDealt, matchData.gameDuration)) } / min
              </span>
            </div>

            { /* Largest Multikill */ }
            <div class="flex flex-col items-center Inter text-closer text-sm space-y-1 w-28">
              <span class="flex h-1/3 flex-row items-center justify-center space-x-1 text-xs border-b border-gray-400 pb-1 px-1">
                <span><GiSwordArray /></span>
                <span>Largest Multikill</span>
              </span>
              <span class="h-10 flex-row space-x-1 pt-2.5">
                <span class="font-bold text-gray-600">{ getMultikillString(summonerStats.largestMultiKill) }</span>
              </span>
            </div>

            { /* Contribution Percentage */ }
            <div class="flex flex-col items-center Inter text-closer text-sm space-y-1 w-24">
              <span class="flex flex-row items-center justify-center space-x-0.5 text-xs border-b border-gray-400 pb-1 px-1">
                <span><FaPercent /></span>
                <span>Contribution</span>
              </span>
              <span class="flex flex-row space-x-1 items-center">
                <span class={classNames(getContributionTextColor(summonerStats.teamDamagePercentage),
                  "font-bold text-xs"
                )}>{ formatNumber((summonerStats.teamDamagePercentage * 100).toFixed(1)) }%</span>
                <span class="text-xs">Damage</span>
              </span>
              <span class="flex flex-row space-x-1 items-center">
                <span class={classNames(getContributionTextColor(summonerStats.damageTakenOnTeamPercentage),
                  "font-bold text-xs"
                )}>{ formatNumber((summonerStats.damageTakenOnTeamPercentage * 100).toFixed(1)) }%</span>
                <span class="text-xs">Tank</span>
              </span>
            </div>
            
            { /* Vertical border */ }
            <div class="border-gray-500 border-l h-full" />

            { /* Runes */ }
            <div class="flex flex-col items-center Inter text-closer text-sm space-y-1 w-20">
              <span class="flex h-1/3 flex-row items-center justify-center space-x-1 text-xs border-b border-gray-400 pb-1 w-full">
                <span><FaMagic /></span>
                <span>Runes</span>
              </span>
              <span class="h-10 flex flex-row space-x-2 pt-2 items-center justify-center">
                { getPerkImage(summonerStats.primaryRune) }
                { getPerkImage(summonerStats.secondaryRune) }
              </span>
            </div>

            { /* Items */ }
            <div class="flex flex-col items-center Inter text-closer text-sm space-y-1 w-48">
              <span class="flex h-1/3 flex-row items-center justify-center space-x-1 text-xs border-b border-gray-400 pb-1 w-full">
                <span><BsHandbagFill /></span>
                <span>Items</span>
              </span>
              <span class="h-10 flex flex-row space-x-0.5 pt-2 items-center justify-center">
                { getItemImage(summonerStats.item0) }
                { getItemImage(summonerStats.item1) }
                { getItemImage(summonerStats.item2) }
                { getItemImage(summonerStats.item3) }
                { getItemImage(summonerStats.item4) }
                { getItemImage(summonerStats.item5) }
                { getItemImage(summonerStats.item6) }
              </span>
            </div>

            { /* Details Expand button */ }
            <div onClick={() => { 
              setDetailsExpanded(status => !status)
              setDetailsTab(0)
            }} class="h-full flex flex-col justify-center hover:cursor-pointer">
              { detailsExpanded ? <GoTriangleUp /> : <GoTriangleDown /> }
            </div>
          </div>

        { /* Details */ }
        { (detailsExpanded && loaded) &&
          <div class={classNames("w-full h-auto border-t-2 flex flex-col items-center rounded-b-xl",
            summonerStats.win ? "border-blue-300" : "border-red-300"
          )}>
            { /* Details Menu Bar */ }
            <div class="flex flex-row w-full">
              { /* Menu bar content */ }
              <div class={classNames("flex flex-row items-center space-x-4 w-full mr-auto px-2 py-2 border-b-2 border-gray-400",
                "bg-white"
              )}>
                { detailTabMenus.map((menu, idx) => (
                    <div class={classNames("flex flex-row shadow-xl rounded-xl py-2 px-3 items-center border border-gray-500 hover:cursor-pointer transition ease-in-out",
                      detailsTab == idx ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white"
                      )}
                      onClick={() => setDetailsTab(idx)}
                    >
                      <span class="text-xs Inter text-closer">
                        { menu }
                      </span>
                    </div>
                  ))
                }
              </div>
            </div>

            { /* Content */ }
            <div class={classNames("w-full h-full flex flex-row items-center",
              summonerStats.win ? "border-blue-300" : "border-red-300"
            )}>
              { /* Team 1 */ }
              <div class={classNames("w-1/2 h-full border-r-2 border-gray-400 flex flex-col space-y-2 justify-center py-2",
                matchData[matchData.participants[0]].win ? "bg-blue-100" : "bg-red-200"
              )}>
                { renderPlayerDetails(matchData[matchData.participants[0]], 0) }
                { renderPlayerDetails(matchData[matchData.participants[1]], 1) }
                { renderPlayerDetails(matchData[matchData.participants[2]], 2) }
                { renderPlayerDetails(matchData[matchData.participants[3]], 3) }
                { renderPlayerDetails(matchData[matchData.participants[4]], 4) }
              </div>

              { /* Team 2 */ }
              <div class={classNames("w-1/2 h-full flex flex-col space-y-2 justify-center py-2",
                matchData[matchData.participants[5]].win ? "bg-blue-100" : "bg-red-200"
              )}>
                { renderPlayerDetails(matchData[matchData.participants[5]], 5) }
                { renderPlayerDetails(matchData[matchData.participants[6]], 6) }
                { renderPlayerDetails(matchData[matchData.participants[7]], 7) }
                { renderPlayerDetails(matchData[matchData.participants[8]], 8) }
                { renderPlayerDetails(matchData[matchData.participants[9]], 9) }
              </div>
            </div>
          </div>
        }
      </div>
      }
    </>
  )
}

export default MatchInfo;