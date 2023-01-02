import React from 'react';
import { ChallengeToExp } from '../../../../common/data/ChallengeToExp';
import { challengeLevelExpTable } from '../../../../common/data/ExpTable';

function ChallengeLevel(props) {
  const MAX_CHALLENGE_LEVEL = 500;

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function getExp() {
    function addExp(total, challenge) {
      return total + ChallengeToExp[challenge.challengeId] * challenge.value;
    }
    return props.data.reduce(addExp, 0);
  }

  function getLevel() {
    const exp = getExp()

    for(let i = 0; i < MAX_CHALLENGE_LEVEL; i++) {
      if (exp < challengeLevelExpTable[i + 1].totalExp) { return i; }
    }

    return MAX_CHALLENGE_LEVEL;
  }

  function getReqExpText() {
    const curLevel = getLevel()
    const curExp = getExp()

    if (curLevel == MAX_CHALLENGE_LEVEL) { 
      const expString = String(formatNumber(curExp)) + " / "
      return expString + "∞" 
    } else { 
      const expString = String(formatNumber(curExp - challengeLevelExpTable[curLevel].totalExp)) + " / ";
      return expString + String(formatNumber(challengeLevelExpTable[curLevel + 1].reqExp)); 
    }
  }

  function getExpPercent() {
    const curLevel = getLevel()
    const curExp = getExp()

    if (curLevel == MAX_CHALLENGE_LEVEL) { return 0; }

    const percent = Math.round((curExp - challengeLevelExpTable[curLevel].totalExp) / (challengeLevelExpTable[curLevel + 1].reqExp) * 100)
    return percent;
  }

  function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div class="flex flex-col w-60 items-center Inter text-closer p-2">
      <div>
        <span class="text-md pb-2 px-3 border-b">Challenge Level</span>
      </div>
      <div className="relative w-full pt-3">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block px-[0.3rem] py-[0.05rem] rounded-lg text-blue-700 bg-blue-200">
              Lv {getLevel()}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-700">
              {getReqExpText()}
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
          <div style={{ width: String(getExpPercent()) + "%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
        </div>
      </div>
    </div>
  );
}

export default ChallengeLevel;