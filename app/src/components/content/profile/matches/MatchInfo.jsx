import React from 'react';
import { dataDragonVersion } from "../../../../common/Versions"
import { ChampId } from "../../../../common/data/ChampId"

function MatchInfo(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function formatSeconds(t) {
    return Math.round(t / 60).toString() + "m " + (t % 60).toString() + "s";
  }

  return (
    <div class={classNames(
      props.info.win ? "bg-blue-200" : "bg-red-200",
      "w-full rounded-xl flex flex-row shadow-xl p-2 items-center space-x-2")}>
      { /* Win/Loss + Game Duration */ }
      <div class="flex flex-col">
        <span class={classNames(
          "text-xs font-bold text-center",
          props.info.win ? "text-blue-500" : "text-red-500")}>
          { props.info.win ? "Win" : "Loss"}
        </span>
        <span class="text-xs">
          { formatSeconds(props.info.duration) }
        </span>
      </div>

      { /* Champ Icon */ }
      <div>
        <img src={`http://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/champion/${ChampId[props.info.champion[0]].image}`} class="object-contain h-16 w-16">

        </img>
      </div>

      { /* KDA + stats */ }
      <div>
        <span class="flex flex-row space-x-1">
          <span>{ props.info.kills[0] }</span>
          <span>/</span>
          <span>{ props.info.deaths[0] }</span>
          <span>/</span>
          <span>{ props.info.assists[0] }</span>

        </span>
      </div>
    </div>
  )
}

export default MatchInfo;