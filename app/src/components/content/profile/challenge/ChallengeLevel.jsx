import React from 'react';
import { ChallengeToExp } from '../../../../common/data/ChallengeToExp';
import { challengeLevelExpTable } from '../../../../common/data/ExpTable';
import ReactTooltip from 'react-tooltip';

function ChallengeLevel(props) {
  const MAX_CHALLENGE_LEVEL = 500;
  const MAX_LEVEL_TITLE = "Final Challenger";
  const prod = import.meta.env.PROD;

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

  function getCrystalBadgeRank() {
    const level = getLevel();
    const levelThreshold = [
      5, 10, 15, 20, 25, // Iron 5, 4, 3, 2, 1
      30, 35, 40, 45, 50, // Bronze 5, 4, 3, 2, 1
      60, 70, 80, 90, 100, // Silver 5, 4, 3, 2, 1
      110, 120, 130, 140, 150, // Gold 5, 4, 3, 2, 1
      160, 170, 180, 190, 200, // Platinum 5, 4, 3, 2, 1
      210, 220, 230, 240, 250, // Diamond 5, 4, 3, 2, 1
      260, 270, 280, 290, 300, // Master 5, 4, 3, 2, 1
      320, 340, 360, 380, 400, // Grandmaster 5, 4, 3, 2, 1
      420, 440, 460, 480, 500, // Challenger 5, 4, 3, 2, 1
      1000 // Last title
    ];

    const levelTitle = [
      'Iron 5', 'Iron 4', 'Iron 3', 'Iron 2', 'Iron 1',
      'Bronze 5', 'Bronze 4', 'Bronze 3', 'Bronze 2', 'Bronze 1',
      'Silver 5', 'Silver 4', 'Silver 3', 'Silver 2', 'Silver 1',
      'Gold 5', 'Gold 4', 'Gold 3', 'Gold 2', 'Gold 1',
      'Platinum 5', 'Platinum 4', 'Platinum 3', 'Platinum 2', 'Platinum 1',
      'Diamond 5', 'Diamond 4', 'Diamond 3', 'Diamond 2', 'Diamond 1',
      'Master 5', 'Master 4', 'Master 3', 'Master 2', 'Master 1',
      'Grandmaster 5', 'Grandmaster 4', 'Grandmaster 3', 'Grandmaster 2', 'Grandmaster 1',
      'Challenger 5', 'Challenger 4', 'Challenger 3', 'Challenger 2', 'Challenger 1',
      MAX_LEVEL_TITLE
    ];

    for (let idx = 0; idx < levelThreshold.length; idx++) {
      if (level < levelThreshold[idx]) {
        return levelTitle[idx]
      }
    }

    return levelTitle[levelTitle.length - 1];
  }

  function getCrystalBadgeImagePostfix(title) {
    if (title == MAX_LEVEL_TITLE) { return 'challenger'; }
    else {
      return title.split(" ")[0].toLowerCase();
    }
  }

  function getCrystalBadgeImagePath() {
    const title = getCrystalBadgeRank();
    const postFix = getCrystalBadgeImagePostfix(title);
    const path = '/crystals/';

    return path + "crystal_" + postFix + ".png";
  }

  function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div class="flex flex-col w-60 items-center Inter text-closer p-2"
      data-html={true}
      data-tip={`
        <div class="text-center">
          <span>Total Exp: <span class="font-bold">${formatNumber(getExp())}</span></span>
        </div>
      `}
    >
      <ReactTooltip effect="solid" place="bottom" offset={{ "bottom": 10 }} />
      { /* Title */}
      <div>
        <span class="text-md pb-2 px-3 border-b">Challenge Level</span>
      </div>

      { /* Crystal Badge */ }
      <div class="flex flex-row items-center justify-center pt-4 pb-1">
        <img
          src={`${getCrystalBadgeImagePath()}`}
          class="w-8 h-8 object-cover drop-shadow-xl"
        />
        <span class="text-sm Inter text-closer font-bold">{ getCrystalBadgeRank() }</span>
      </div>

      { /* Level / Exp Bar */ }
      <div className="relative w-full">
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