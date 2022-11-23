import React from 'react';
import { useState } from 'react';
import Challenges from './challenge/Challenges';
import ChampStats from './champstats/ChampStats';
import MatchHistory from './matches/MatchHistory';

function ProfileContent(props) {
  const [currentMenuId, setCurrentMenuId] = useState(2);
  const menuItems = ["Match History", "Champion Statistics", "Challenges"]

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function renderContent(idx) {
    switch (idx) {
      case 0:
        return <MatchHistory />
      case 1:
        return <ChampStats />
      case 2:
        return <Challenges userInfo={props.userInfo} />
      default:
        return <MatchHistory />
    }
  }


  return (
    <div class="h-auto flex flex-col mx-10 space-y-5 mt-10">
      <div class="h-auto space-x-2">
        { /* Generate menu items */}
        {menuItems.map((item, idx) => (
          <button className={classNames(
            currentMenuId == idx
              ? "bg-blue-400 text-white"
              : "bg-blue-200 text-gray-700",
            "text-center py-2 px-4 rounded-md shadow-md hover:bg-blue-400 transition ease-in-out"
          )}
            key={item}
            onClick={(e) => setCurrentMenuId(idx)}
          >
            <span class="text-xs ">{item}</span>
          </button>
        ))}
      </div>

      {renderContent(currentMenuId)}
    </div>
  );
}

export default ProfileContent;