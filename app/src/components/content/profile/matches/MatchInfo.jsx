import React from 'react';

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
      "w-full rounded-xl flex flex-row shadow-xl p-2")}>
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
        
      </div>
      
    </div>
  )
}

export default MatchInfo;