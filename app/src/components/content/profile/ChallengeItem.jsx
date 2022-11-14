import React from 'react';
import { ChallengesConfig } from "../../../common/data/ChallengesConfig";
import ReactTooltip from 'react-tooltip';

function ChallengeItem(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function getGradientClass(rank) {
    switch (rank) {
      case "IRON":
        return "bg-gradient-to-br from-gray-400 to-gray-600 text-white"
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
        return "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-yellow-200";
      case "GRANDMASTER":
        return "bg-gradient-to-br from-red-700 via-rose-900 to-gray-900 text-white"
      case "CHALLENGER":
        return "bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-300 via-yellow-300 to-cyan-300 text-black"
      default:
        return "bg-white"
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
        return plural ? "Kills" : "Kill"
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

  function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className={classNames(
      "flex flex-col p-3 w-40 h-40 border rounded-md text-xs m-2 shadow-md Inter text-closer", // common styles
      getGradientClass(props.item.level)
    )}
      data-tip={ChallengesConfig[props.item.challengeId].description}
    >
      { /* Challenge name */}
      <ReactTooltip effect="solid" place="bottom" offset={{ "bottom": 10 }} />
      <div>
        <span class="font-bold">{ChallengesConfig[props.item.challengeId].name}</span>
      </div>

      <div class="border-b border-gray-700 my-1" />

      { /* Value */}
      <div class="flex flex-col h-24 justify-center text-center">
        <span class="text-base font-bold">{formatNumber(props.item.value)}</span>
        <span>{(getUnit(props.item.challengeId.toString(), props.item.value != 1))}</span>
      </div>

      { /* Percentile */}
      <div class="flex-grow flex items-end justify-center">
        <div className={classNames(
          "flex flex-row space-x-1",
          "p-[0.25rem] text-[0.7rem] rounded-md border",
          getGradientClass(percentileToRank(props.item.percentile))
        )}
        >
          <span>Top {(props.item.percentile * 100).toFixed(1)}%</span>
          {/* {props.item.position !== undefined && <span class="font-bold">#{props.item.position}</span>} */}
        </div>
      </div>
    </div>
  );
}

export default ChallengeItem;