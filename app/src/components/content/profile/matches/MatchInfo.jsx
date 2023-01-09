import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataDragonVersion } from "../../../../common/Versions"
import { ChampId } from "../../../../common/data/ChampId"
import { RiSwordFill } from 'react-icons/ri'
import { BiTimeFive } from 'react-icons/bi'
import { GiSwordsEmblem, GiSpikes, GiSwordArray } from 'react-icons/gi'
import { BsShieldShaded, BsHandbagFill } from 'react-icons/bs';
import { FaHeartbeat, FaTools, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix, FaMagic, FaPercent, FaSkull } from 'react-icons/fa';
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

  function printSummonerName(name) {
    if (name.length <= 12) { return name; }
    else { return name.substring(0, 9) + "..."}
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
    switch (detailsTab) {
      case 0:
        return renderDamageDetails(data, idx);
      case 1:
        return renderTankDetails(data, idx);
      case 2:
        return renderSupportDetails(data, idx);
      case 3:
        return renderUtilityDetails(data, idx);
      default:
        return renderDamageDetails(data, idx);

    }
  }

  function renderPlayerDetails(data, idx) {
    return <div class={classNames("flex flex-row text-closer mx-1.5 py-0.5 items-center",
      data.summonerName == summonerStats.summonerName && (summonerStats.win ? "border-blue-300 border-2 px-0.5 mx-0.5" : "border-red-300 border-2 px-0.5 mx-0.5")
    )}>
      { /* Static */ }
      <div class="flex flex-row items-center"> 
        { /* MVP Crown [Placeholder] */ }
        <div class="flex flex-row items-center w-8">

        </div>

        { /* Champion Icon / Summoner Name*/ }
        <div class="flex flex-row items-center space-x-1 w-28">
          <img src={`http://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/champion/${ChampId[data.championId].image}`} class="object-center rounded-full object-contain h-6 w-6"/>
          <span onClick={(e) => search(e, data.summonerName)} class="text-xs text-black Inter text-closer flex-wrap text-center hover:underline hover:cursor-pointer hover:text-gray-600">
            { printSummonerName(data.summonerName) }
          </span>
        </div>

        { /* KDA */ }
        <div class="flex flex-row items-center justify-center space-x-0.5 w-16 text-sm font-bold Source-sans-pro">
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

  function renderMatchDetailLabels() {
    switch (detailsTab) {
      case 0: // Damage Stats
        return <div class="flex flex-row text-closer mx-1.5 py-0.5 items-center text-xs Source-sans-pro">
          <span class="text-center w-8"></span>
          <span class="text-center w-28">Champion/Name</span>
          <span class="text-center w-16">K/D/A</span>
          <span class="text-center w-48">Items</span>
          <span class="text-center w-40">Damage Stats</span>
          <div class="flex items-center text-center w-28 ml-3">
            <div class="flex flex-row items-center space-x-0.5">
              <span class="text-red-600">Physical</span>
              <span>/</span>
              <span class="text-blue-600">Magic</span>
              <span>/</span>
              <span class="text-gray-500">True</span>
            </div>
          </div>
        </div>

    case 1: // Tank stats 
      return <div class="flex flex-row text-closer mx-1.5 py-0.5 items-center text-xs Source-sans-pro">
        <span class="text-center w-8"></span>
        <span class="text-center w-28">Champion/Name</span>
        <span class="text-center w-16">K/D/A</span>
        <span class="text-center w-48">Items</span>
        <span class="text-center w-40">Tank Stats</span>
        <div class="flex items-center text-center w-28 ml-3">
          <div class="flex flex-row items-center space-x-0.5">
            <span class="text-red-600">Physical</span>
            <span>/</span>
            <span class="text-blue-600">Magic</span>
            <span>/</span>
            <span class="text-gray-500">True</span>
          </div>
        </div>
      </div>

    case 2: // Support stats 
      return <div class="flex flex-row text-closer mx-1.5 py-0.5 items-center text-xs Source-sans-pro">
        <span class="text-center w-8"></span>
        <span class="text-center w-28">Champion/Name</span>
        <span class="text-center w-16">K/D/A</span>
        <span class="text-center w-48">Items</span>
        <span class="text-center w-40">Support Stats</span>
        <div class="flex justify-center items-center text-center w-28 ml-3">
          <div class="flex flex-row items-center space-x-0.5">
            <span class="text-green-400">Heal</span>
            <span>/</span>
            <span class="text-blue-400">Shield</span>
          </div>
        </div>
      </div>

    case 3: // Utility stats 
      return <div class="flex flex-row text-closer mx-1.5 py-0.5 items-center text-xs Source-sans-pro">
        <span class="text-center w-8"></span>
        <span class="text-center w-28">Champion/Name</span>
        <span class="text-center w-16">K/D/A</span>
        <span class="text-center w-48">Items</span>
        <span class="text-center w-40">CC Stats</span>
      </div>
    }
  }

  function getGameMaxDamageContribution() {
    let maxDamageContribution = 0; // init

    for(let i = 0; i < NUM_PLAYERS; i++) {
      maxDamageContribution = Math.max(maxDamageContribution, matchData[matchData.participants[i]].totalDamageDealtToChampions);
    }

    return maxDamageContribution;
  }

  function getGameMaxTankContribution() {
    let maxTankContribution = 0; // init

    for(let i = 0; i < NUM_PLAYERS; i++) {
      maxTankContribution = Math.max(maxTankContribution, matchData[matchData.participants[i]].totalDamageTaken);
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
    return <div class="flex flex-row text-closer items-center">
      { /* Raw Damage / Contribution */ }
      <div class="flex flex-col items-center text-sm w-20 Source-sans-pro h-8">
        { /* Values */ }
        <div class="flow-root items-center text-xs w-full space-x-1">
          <span class="flex flex-row float-left">
            { formatNumber(data.totalDamageDealtToChampions) }
            { (data.totalDamageDealtToChampions == getGameMaxDamageContribution()) && <span>👑</span>}
          </span>
          <span class={classNames(getContributionTextColor(data.teamDamagePercentage), "float-right font-bold")}>{ formatNumber((data.teamDamagePercentage * 100).toFixed(1)) }%</span>
        </div>
        { /* Contribution bar */ }
        <div class="flex flex-row items-center bg-white border border-gray-500 w-20 h-3">
          <div class={classNames("flex flex-row items-center leading-none h-full text-transparent border-gray-500",
            (data.totalDamageDealtToChampions == getGameMaxDamageContribution() || data.totalDamageDealtToChampions == 0) ? "" : "border-r",
            getContributionBgColor(data.teamDamagePercentage)
          )} style={{width: `${(data.totalDamageDealtToChampions / getGameMaxDamageContribution()) * 100}%`}}/>
        </div>
      </div>

      { /* DPM */ }
      <div class="flex flex-col items-center justify-center w-20 h-8 ml-2">
        {/* <span class="text-xs Source-sans-pro">Damage</span> */}
        <div class="flex flex-row items-center space-x-0.5 text-xs Source-sans-pro w-20">
          <span class={classNames("text-xs font-bold",
            getDPMTextColor(getPerMinuteStats(data.totalDamageDealtToChampions, matchData.gameDuration))
          )}>
            { formatNumber(getPerMinuteStats(data.totalDamageDealtToChampions, matchData.gameDuration)) }
          </span>
          <span>/</span>
          <span>min</span>
        </div>
      </div>

      { /* Damage Type Ratio */ }
      <div class="flex flex-col items-center space-x-1 text-xs Source-sans-pro w-28 h-8">
        <div class="flex flex-row items-center space-x-0.5">
          <span class="text-red-600">{ `${Math.round(data.physicalDamageDealtToChampions / data.totalDamageDealtToChampions * 100)}%` }</span>
          <span>/</span>
          <span class="text-blue-600">{ `${Math.round(data.magicDamageDealtToChampions / data.totalDamageDealtToChampions * 100)}%` }</span>
          <span>/</span>
          <span class="text-gray-500">{ `${Math.round(data.trueDamageDealtToChampions / data.totalDamageDealtToChampions * 100)}%` }</span>
        </div>
        <div class="flex flex-row items-center bg-white border border-gray-500 w-28 h-3">
          <div class="bg-red-300 h-full text-transparent" style={{width: `${Math.round(data.physicalDamageDealtToChampions / data.totalDamageDealtToChampions * 100)}%`}} /> { /* Physical */ }
          <div class="bg-blue-300 h-full text-transparent" style={{width: `${Math.round(data.magicDamageDealtToChampions / data.totalDamageDealtToChampions * 100)}%`}} /> { /* Magic */ }
          <div class="bg-gray-300 h-full text-transparent" style={{width: `${Math.round(data.trueDamageDealtToChampions / data.totalDamageDealtToChampions * 100)}%`}} /> { /* True */ }
        </div>
      </div>
    </div>
  }

  function renderTankDetails(data, idx) {
    return <div class="flex flex-row text-closer items-center">
      { /* Raw Tank / Contribution */ }
      <div class="flex flex-col items-center text-sm w-20 Source-sans-pro h-8">
        { /* Values */ }
        <div class="flow-root items-center text-xs w-full space-x-1">
          <span class="flex flex-row float-left">
            { formatNumber(data.totalDamageTaken) }
            { (data.totalDamageTaken == getGameMaxTankContribution()) && <span>👑</span>}
          </span>
          <span class={classNames(getContributionTextColor(data.damageTakenOnTeamPercentage), "float-right font-bold")}>{ formatNumber((data.damageTakenOnTeamPercentage * 100).toFixed(1)) }%</span>
        </div>
        { /* Contribution bar */ }
        <div class="flex flex-row items-center bg-white border border-gray-500 w-20 h-3">
          <div class={classNames("flex flex-row items-center leading-none h-full text-transparent border-gray-500",
            (data.totalDamageTaken == getGameMaxTankContribution() || data.totalDamageTaken == 0) ? "" : "border-r",
            getContributionBgColor(data.damageTakenOnTeamPercentage)
          )} style={{width: `${(data.totalDamageTaken / getGameMaxTankContribution()) * 100}%`}}/>
        </div>
      </div>

      { /* TPM */ }
      <div class="flex flex-col items-start justify-center w-20 h-8 ml-2">
        {/* <span class="text-xs Source-sans-pro">Received Dmg</span> */}
        <div class="flex flex-row items-center space-x-0.5 text-xs Source-sans-pro w-20">
          <span class={classNames("text-xs font-bold",
            getTPMTextColor(getPerMinuteStats(data.totalDamageTaken, matchData.gameDuration))
          )}>
            { formatNumber(getPerMinuteStats(data.totalDamageTaken, matchData.gameDuration)) }
          </span>
          <span>/</span>
          <span>min</span>
        </div>
      </div>

      { /* Tank Type Ratio */ }
      <div class="flex flex-col items-center space-x-1 text-xs Source-sans-pro w-28 h-8">
      <div class="flex flex-row items-center space-x-0.5">
          <span class="text-red-600">{ `${Math.round(data.physicalDamageTaken / data.totalDamageTaken * 100)}%` }</span>
          <span>/</span>
          <span class="text-blue-600">{ `${Math.round(data.magicDamageTaken / data.totalDamageTaken * 100)}%` }</span>
          <span>/</span>
          <span class="text-gray-500">{ `${Math.round(data.trueDamageTaken / data.totalDamageTaken * 100)}%` }</span>
        </div>
        <div class="flex flex-row items-center bg-white border border-gray-500 w-28 h-3">
          <div class="bg-red-300 h-full text-transparent" style={{width: `${Math.round(data.physicalDamageTaken / data.totalDamageTaken * 100)}%`}} /> { /* Physical */ }
          <div class="bg-blue-300 h-full text-transparent" style={{width: `${Math.round(data.magicDamageTaken / data.totalDamageTaken * 100)}%`}} /> { /* Magic */ }
          <div class="bg-gray-300 h-full text-transparent" style={{width: `${Math.round(data.trueDamageTaken / data.totalDamageTaken * 100)}%`}} /> { /* True */ }
        </div>
      </div>
    </div>
  }

  function renderSupportDetails(data, idx) {
    const supportAmount = data.totalHealsOnTeammates + data.totalDamageShieldedOnTeammates;
    
    return <div class="flex flex-row text-closer items-center">
      { /* Raw Support / Contribution */ }
      <div class="flex flex-col items-center text-sm w-20 Source-sans-pro h-8">
        { /* Values */ }
        <div class="flow-root items-center text-xs w-full space-x-1">
          <span class="flex flex-row float-left">
            { formatNumber(supportAmount) }
            { (supportAmount == getGameMaxSupportContribution()) && <span>👑</span>}
          </span>
          {/* <span class={classNames(getContributionTextColor(supportAmount), "float-right font-bold")}>{ formatNumber((data.teamDamagePercentage * 100).toFixed(1)) }%</span> */}
        </div>
        { /* Contribution bar */ }
        <div class="flex flex-row items-center bg-white border border-gray-500 w-20 h-3">
          <div class={classNames("flex flex-row items-center leading-none h-full text-transparent border-gray-500 bg-gray-300",
            (supportAmount == getGameMaxSupportContribution() || supportAmount == 0) ? "" : "border-r",
          )} style={{width: `${(supportAmount / getGameMaxSupportContribution()) * 100}%`}}/>
        </div>
      </div>

      { /* SPM */ }
      <div class="flex flex-col justify-center items-start w-20 h-8 ml-2">
        {/* <span class="text-xs Source-sans-pro">Effective Heal</span> */}
        <div class="flex flex-row items-center space-x-0.5 text-xs Source-sans-pro w-20">
          <span class={classNames("text-xs font-bold",
            getEHPMTextColor(getPerMinuteStats(supportAmount, matchData.gameDuration))
          )}>
            { formatNumber(getPerMinuteStats(supportAmount, matchData.gameDuration)) }
          </span>
          <span>/</span>
          <span>min</span>
        </div>
      </div>

      { /* Support Type Ratio */ }
      <div class="flex flex-col items-center justify-center space-x-1 text-xs Source-sans-pro w-28 h-8">
        <div class="flex flex-row items-center space-x-0.5">
          <span class="text-green-400">{`${supportAmount != 0 ? Math.round(data.totalHealsOnTeammates / supportAmount * 100) : 0}%`}</span>
          <span>/</span>
          <span class="text-blue-400">{`${supportAmount != 0 ? Math.round(data.totalDamageShieldedOnTeammates / supportAmount * 100) : 0}%`}</span>
        </div>
        <div class="flex flex-row items-center bg-white border border-gray-500 w-28 h-3">
          { supportAmount > 0 &&
            <>
              <div class="bg-green-200 h-full text-transparent" style={{width: `${Math.round(data.totalHealsOnTeammates / supportAmount * 100)}%`}} /> { /* Heal */ }
              <div class="bg-blue-200 h-full text-transparent" style={{width: `${Math.round(data.totalDamageShieldedOnTeammates / supportAmount * 100)}%`}} /> { /* Shield */ }
            </>
          }
        </div>
      </div>
    </div>
  }

  function renderUtilityDetails(data, idx) {
    return <div class="flex flex-row text-closer items-center">
      { /* Raw CC / Contribution */ }
      <div class="flex flex-col items-center text-sm w-20 Source-sans-pro h-8">
        { /* Values */ }
        <div class="flow-root items-center text-xs w-full space-x-1">
          <span class="flex flex-row float-left">
            { formatNumber(data.totalTimeCCDealt) }
            { (data.totalTimeCCDealt == getGameMaxUtilityContribution()) && <span>👑</span>}
          </span>
          {/* <span class={classNames(getContributionTextColor(supportAmount), "float-right font-bold")}>{ formatNumber((data.teamDamagePercentage * 100).toFixed(1)) }%</span> */}
        </div>
        { /* Contribution bar */ }
        <div class="flex flex-row items-center bg-white border border-gray-500 w-20 h-3">
          <div class={classNames("flex flex-row items-center leading-none h-full text-transparent border-gray-500 bg-gray-300",
            (data.totalTimeCCDealt == getGameMaxUtilityContribution() || data.totalTimeCCDealt == 0) ? "" : "border-r",
          )} style={{width: `${(data.totalTimeCCDealt / getGameMaxUtilityContribution()) * 100}%`}}/>
        </div>
      </div>

      { /* SPM */ }
      <div class="flex flex-col items-start justify-center w-20 h-8 ml-2">
        {/* <span class="text-xs Source-sans-pro">CC Score</span> */}
        <div class="flex flex-row items-center space-x-0.5 text-xs Source-sans-pro w-20">
          <span class={classNames("text-xs font-bold",
            getEHPMTextColor(getPerMinuteStats(data.totalTimeCCDealt, matchData.gameDuration))
          )}>
            { formatNumber(getPerMinuteStats(data.totalTimeCCDealt, matchData.gameDuration)) }
          </span>
          <span>/</span>
          <span>min</span>
        </div>
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
              <div class={classNames("flex flex-row items-center w-full mr-auto border-b-2 border-gray-400",
                "bg-white"
              )}>
                { detailTabMenus.map((menu, idx) => (
                    <div class={classNames("flex flex-row shadow-xl py-2 px-3 items-center hover:cursor-pointer transition ease-in-out",
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
                matchData[matchData.participants[0]].win ? "bg-blue-50" : "bg-red-100"
              )}>
                <div class={classNames("w-full flex flex-row justify-center items-center space-x-1 font-bold Inter",
                  matchData[matchData.participants[0]].win ? "text-blue-500 border-blue-500" : "text-red-500 border-red-500"
                )}>
                  <span><RiSwordFill /></span>
                  <span>
                    { matchData[matchData.participants[0]].win ? "Victory" : "Defeat" }
                  </span>
                </div>
                { renderMatchDetailLabels() }
                { renderPlayerDetails(matchData[matchData.participants[0]], 0) }
                { renderPlayerDetails(matchData[matchData.participants[1]], 1) }
                { renderPlayerDetails(matchData[matchData.participants[2]], 2) }
                { renderPlayerDetails(matchData[matchData.participants[3]], 3) }
                { renderPlayerDetails(matchData[matchData.participants[4]], 4) }
              </div>

              { /* Team 2 */ }
              <div class={classNames("w-1/2 h-full flex flex-col space-y-2 justify-center py-2",
                matchData[matchData.participants[5]].win ? "bg-blue-50" : "bg-red-100"
              )}>
                <div class={classNames("w-full flex flex-row justify-center items-center space-x-1 font-bold Inter",
                  matchData[matchData.participants[5]].win ? "text-blue-500 border-blue-500" : "text-red-500 border-red-500"
                )}>
                  <span><FaSkull /></span>
                  <span>
                    { matchData[matchData.participants[5]].win ? "Victory" : "Defeat" }
                  </span>
                </div>
                { renderMatchDetailLabels() }
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