import React from 'react';

function ChallengeItem(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div class="flex flex-col items-center Inter text-closer p-2 border">
      <div>
        <span class="text-md pb-2 border-b">ARAM Achievement Level</span>
      </div>
      <span>{props.data.percentile}</span>
    </div>
  );
}

export default ChallengeItem;