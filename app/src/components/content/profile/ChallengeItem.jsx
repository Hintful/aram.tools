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
        return "bg-gradient-to-br from-yellow-200 to-orange-500"
      case "PLATINUM":
        return "bg-gradient-to-br from-cyan-300 to-green-400"
      case "DIAMOND":
        return "bg-gradient-to-br from-cyan-200 via-blue-200 to-blue-500"
      case "MASTER":
        return "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-yellow-200";
      case "GRANDMASTER":
        return "bg-gradient-to-br from-red-700 via-rose-900 to-gray-900 text-white"
      default:
        return "bg-white"
    }
  }

  return (
    <div className={classNames(
      "flex flex-col p-3 w-32 h-32 border rounded-md text-xs m-2 shadow-md bg", // common styles
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
      <div>
        <span>{props.item.value}</span>
      </div>

      { /* Percentile */}
      <div>
        <span>Top {(props.item.percentile * 100).toFixed(1)}%</span>
      </div>
    </div>
  );
}

export default ChallengeItem;