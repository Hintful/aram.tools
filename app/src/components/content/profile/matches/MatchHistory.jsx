import React from 'react';
import MatchInfo from './MatchInfo';

function MatchHistory(props) {
  const sampleMatches = [{
    participants: [
      "Player 1", 
      "Player 2", 
      "Player 3", 
      "Player 4",
      "Player 5",
      "Player 6",
      "Player 7",
      "Player 8",
      "Player 9",
      "Player 10"],
    kills: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    deaths: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    assists: [5, 9, 12, 8, 10, 21, 3, 18, 15, 9],
    champion: [36, 9, 74, 888, 897, 11, 875, 35, 412, 18],
    win: true,
    duration: 1384
  },
  {
    participants: [
      "Player 1", 
      "Player 2", 
      "Player 3", 
      "Player 4",
      "Player 5",
      "Player 6",
      "Player 7",
      "Player 8",
      "Player 9",
      "Player 10"],
    kills: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    deaths: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    assists: [5, 9, 12, 8, 10, 21, 3, 18, 15, 9],
    champion: [36, 9, 74, 888, 897, 11, 875, 35, 412, 18],
    win: false,
    duration: 1837
  }]
  return (
    <div class="h-full bg-white rounded-xl flex flex-col justify-center shadow-xl py-5 mb-10">
      <div class="flex flex-col w-auto space-y-5 mx-5">
        <div class="w-full">
          <span class="text-sm text-gray-500">Match History</span>
        </div>
        <div class="w-full border-b border-gray-200" />

        {sampleMatches.length > 0 ?
          <div class="flex flex-col justify-center space-y-4 p-2">
            {sampleMatches.map(match => (<MatchInfo info={match} />))}
          </div>
          :
          <div class="w-full flex justify-center">
            <HashLoader color="#36d7b7" />
          </div>
        }
      </div>
    </div>
  );
}

export default MatchHistory;