import React, { useState, useEffect } from 'react';
import { ChallengesConfig } from "../../../../common/data/ChallengesConfig";
import ReactTooltip from 'react-tooltip';
import { ExpTable } from '../../../../common/data/ExpTable';
import { ChallengeExpScheme } from '../../../../common/data/ChallengeExpScheme';
import { ChallengeToExp } from '../../../../common/data/ChallengeToExp';
import { BsCircleFill, BsTriangleFill, BsSquareFill, BsPentagonFill, BsStarFill, BsFillXDiamondFill, BsTrophyFill, BsTrophy } from 'react-icons/bs';
import { API_PORT } from "../../../../common/var";
import axios from 'axios';


function ChallengeItem(props) {
  const prod = import.meta.env.PROD;
  const [leaderboardRank, setLeaderboardRank] = useState("");


  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function getGradientClass(rank) {
    switch (rank) {
      case "IRON":
        return "bg-gradient-to-br from-gray-400 to-gray-600"
      case "BRONZE":
        return "bg-gradient-to-br from-yellow-500 to-yellow-800"
      case "SILVER":
        return "bg-gradient-to-br from-gray-100 to-gray-400"
      case "GOLD":
        return "bg-gradient-to-br from-yellow-200 to-orange-600"
      case "PLATINUM":
        return "bg-gradient-to-br from-cyan-300 to-green-400"
      case "DIAMOND":
        return "bg-gradient-to-br from-cyan-200 via-blue-200 to-blue-500"
      case "MASTER":
        return "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-yellow-200 background-animate";
      case "GRANDMASTER":
        return "bg-gradient-to-br from-red-700 via-rose-900 to-gray-900 text-white background-animate"
      case "CHALLENGER":
        return "bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-300 via-yellow-300 to-cyan-300 text-black background-animate"
      default:
        return "bg-white"
    }
  }

  function getGradientBgClass() {
    const diff = ChallengeExpScheme[props.item.challengeId];

    switch (diff) {
      case 1:
        return "bg-gray-50"
      case 2:
        return "bg-gray-50"
      case 3:
        return "bg-green-50"
      case 4:
        return "bg-blue-50"
      case 5:
        return "bg-purple-50"
      case 6:
        return "bg-yellow-50"
      case 7:
        return "bg-red-50"
    }
  }

  function percentileToRank(p) {
    if (p <= 0.001) {
      return "CHALLENGER"
    } else if (p <= 0.003) {
      return "GRANDMASTER"
    } else if (p <= 0.005) {
      return "MASTER"
    } else if (p <= 0.02) {
      return "DIAMOND"
    } else if (p <= 0.1) {
      return "PLATINUM"
    } else if (p <= 0.25) {
      return "GOLD"
    } else if (p <= 0.6) {
      return "SILVER"
    } else if (p <= 0.9) {
      return "BRONZE"
    } else {
      return "IRON"
    }
  }

  function getUnit(challengeId, plural) {
    switch (challengeId) {
      case "101100":
        return plural ? "Points" : "Point"
      case "101102":
        return plural ? "Double Pentakills" : "Double Pentakill"
      case "101107":
        return plural ? "Takedowns" : "Takedown"
      case "101104":
        return plural ? "Kills" : "Kill"
      case "101105":
        return plural ? "Kills" : "Kill"
      case "101103":
        return plural ? "Legendary Streaks" : "Legendary Streak"
      case "101108":
        return plural ? "Solo Carries" : "Solo Carry"
      case "101106":
        return plural ? "Pentakills" : "Pentakill"
      case "101101":
        return plural ? "Games" : "Game"
      case "101200":
        return plural ? "Points" : "Point"
      case "101201":
        return plural ? "Skillshot Hits" : "Skillshot Hit"
      case "101202":
        return plural ? "Skillshot Dodges" : "Skillshot Dodge"
      case "101206":
        return plural ? "Explosions" : "Explosion"
      case "101203":
        return plural ? "Snowball Hits" : "Snowball Hit"
      case "101205":
        return plural ? "Early Executes" : "Early Execute"
      case "101204":
        return plural ? "Minions Killed" : "Minion Killed"
      case "101300":
        return plural ? "Points" : "Point"
      case "101305":
        return plural ? "Games Over 90% KP" : "Game Over 90% KP"
      case "101307":
        return plural ? "ARAM Wins" : "ARAM Win"
      case "101301":
        return plural ? "Champions" : "Champion"
      case "2022002":
        return plural ? "Fast Turret Kills" : "Fast Turret Kill"
      case "101304":
        return plural ? "Fast ARAM Wins" : "Fast ARAM Win"
      case "101306":
        return plural ? "Perfect Games" : "Perfect Game"
      case "101302":
        return plural ? "S Grades" : "S Grade"
      default:
        return ""
    }
  }

  function getLevel() {
    const table = ExpTable[ChallengeExpScheme[props.item.challengeId]] // dict

    for(let i = 0; i < 100; i++) {
      if (props.item.value < table[i + 1].totalExp) { return i; }
    }

    return 100;
  }

  function getChallengeDifficultyToolTipText() {
    const diff = ChallengeExpScheme[props.item.challengeId];
    const commonClass = "py-2 mb-2 border-b";

    switch (diff) {
      
      case 1: // common"
        return `<p class="${commonClass} text-gray-400 border-gray-500">Common</p>`;
      case 2: // common
        return `<p class="${commonClass} text-gray-400 border-gray-500">Common</p>`;
      case 3: // uncommon
        return `<p class="${commonClass} text-green-400 border-green-500">Uncommon</p>`;
      case 4: // rare
        return `<p class="${commonClass} text-blue-400 border-blue-500">Rare</p>`;
      case 5: // very rare
        return `<p class="${commonClass} text-purple-400 border-purple-500">Very Rare</p>`;
      case 6: // legendary
        return `<p class="${commonClass} text-yellow-400 border-yellow-500">Legendary</p>`;
      case 7: // mythic
        return `<p class="${commonClass} text-red-400 border-red-500">Mythic</p>`;
    }
  }

  function getDifficultyTextColor() {
    const diff = ChallengeExpScheme[props.item.challengeId];

    switch (diff) {
      case 1:
        return `text-gray-500`;
      case 2:
        return `text-gray-500`;
      case 3:
        return `text-green-500`;
      case 4:
        return `text-blue-500`;
      case 5:
        return `text-purple-500`;
      case 6:
        return `text-yellow-500`;
      case 7:
        return `text-red-500`;
    }
  }

  function getDifficultyBorderColor() {
    const diff = ChallengeExpScheme[props.item.challengeId];
    
    switch (diff) {
      case 1:
        return "border-gray-500";
      case 2:
        return "border-gray-500";
      case 3:
        return "border-green-500";
      case 4:
        return "border-blue-500";
      case 5:
        return "border-purple-500";
      case 6:
        return "border-yellow-500";
      case 7:
        return "border-red-500";
    }
  }

  function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function getChallengeName() {
    const diff = ChallengeExpScheme[props.item.challengeId];
    
    switch (diff) {
      case 1:
        return <BsCircleFill style={{marginTop: "2px", marginRight: "2px"}} size="0.7rem" />;
      case 2:
        return <BsCircleFill style={{marginTop: "2px", marginRight: "2px"}} size="0.7rem" />;
      case 3: 
        return <BsTriangleFill style={{marginTop: "1px", marginRight: "2px"}} size="0.8rem" />;
      case 4:
        return <BsSquareFill style={{marginTop: "2px", marginRight: "2px"}} size="0.7rem" />;
      case 5:
        return <BsPentagonFill style={{paddingTop: "1px", marginRight: "2px"}} size="0.8rem" />;
      case 6:
        return <BsStarFill style={{paddingTop: "1px", marginRight: "1px"}} size="0.9rem" />;
      case 7:
        return <BsFillXDiamondFill style={{paddingTop: "2px", marginRight: "1px"}} size="0.9rem" />;
    }
  }

  async function getRank() {
    const id = props.item.challengeId;
    const level = props.item.level;
    const backendTarget = prod ? `/api/lol/challenges/${id}/${level}` : `http://localhost:${API_PORT}/api/lol/challenges/${id}/${level}`

    axios.get(backendTarget)
      .then(res => {
        const rankOffset = res.data[0].position;
        setLeaderboardRank((rankOffset + props.item.position - 1).toString());
      })
      .catch(err => {
        setLeaderboardRank("N/A");
      })
  }

  useEffect(() => {
    getRank()
  }, [])

  return (
    <div class={classNames(
      "flex flex-col relative p-3 w-52 h-48 border-2 rounded-md text-xs m-2 shadow-md Inter text-closer", // common styles
      getDifficultyBorderColor(),
      getGradientBgClass()
    )}
      data-html={true}
      data-tip={`
        <div class="text-center">
          ${getChallengeDifficultyToolTipText()}
          <p>${ChallengesConfig[props.item.challengeId].description}</p>
          <p class="mt-2">+<span class="font-bold">${formatNumber(ChallengeToExp[props.item.challengeId])}</span> Exp</p>
        </div>
      `}
    >
      { /* Challenge name */}
      <ReactTooltip effect="solid" place="bottom" offset={{ "bottom": 10 }} />
      <div class={classNames(
        "flex font-bold text-xs",
        getDifficultyTextColor()
        )}>
        { getChallengeName() } <span class="iconContainer">{ChallengesConfig[props.item.challengeId].name}</span>
      </div>

      <div class="border-b border-gray-700 my-1" />

      { /* Value */}
      <div class={classNames(
        "flex flex-col h-24 justify-center text-center",
        getDifficultyTextColor()
      )}>
        <span class="text-base font-bold">{formatNumber(props.item.value)}</span>
        <span>{(getUnit(props.item.challengeId.toString(), props.item.value != 1))}</span>
      </div>

      { /* Level / Percentile */}
      <div class="flex-grow flex items-end justify-center">
        <div class="flex flex-row items-center">

          <div class={classNames(
            "flex flex-col relative text-center",
            "p-[0.25rem] text-[0.7rem] Source-sans-pro rounded-md border",
            // getGradientClass(percentileToRank(props.item.percentile))
            getGradientClass(props.item.level)
          )}
          >
            <span class="border-b mb-1 pb-1">{(props.item.level)}</span>
            <span class="flex flex-col items-center">
              <span class="space-x-1">
                <span>Top</span>
                <span>{(props.item.percentile * 100).toFixed(1)} %</span>
              </span>
              { (props.item.position && leaderboardRank !== "") && 
                <span class="flex space-x-0.5 px-1"><BsTrophyFill style={{paddingTop: "4px"}} size="0.8rem"/>Rank #<span class="font-bold">{ leaderboardRank }</span></span> 
              }
            </span>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default ChallengeItem;