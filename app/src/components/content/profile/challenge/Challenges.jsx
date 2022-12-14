import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AramChallengeIds } from "../../../../common/data/AramChallengeIds";
import ChallengeItem from './ChallengeItem';
import { HashLoader } from "react-spinners";
import { API_PORT } from "../../../../common/var";
import ChallengeLevel from './ChallengeLevel';

function Challenges(props) {
  const { id } = useParams();
  const username = id;
  const prod = import.meta.env.PROD;

  const mainAramChallengeId = "101000" // ARAM Authority Challenge Id

  const [challengeData, setChallengeData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  async function getUserChallenges() {
    const backendTarget = prod ? `/api/lol/summoner/${username}/challenges` : `http://localhost:${API_PORT}/api/lol/summoner/${username}/challenges`

    axios.get(backendTarget)
      .then(res => {
        const userChallenges = res.data.challenges; // trim unnecessary data
        const newUserChallenges = userChallenges.filter(challenge => AramChallengeIds.has(challenge.challengeId.toString()))

        setChallengeData(newUserChallenges)
        setDataFetched(true);
      })
      .catch(err => {
        console.log(err);
      })
  }

  function renderContent() {
    if (challengeData.length > 0) { // loaded
      return <div>
        { /* Challenge Level */}
        <div class="flex justify-center p-2">
          {<ChallengeLevel data={challengeData} />}
        </div>

        { /* Challenge rarity/difficulty description */ }
        <div class="flex justify-center py-8">
          <div class="flex flex-col text-center border shadow-lg p-4">
            {/* <span class="Inter text-closer text-sm mb-2">Challenge Rarity</span> */}
            <div class="text-center Inter text-closer text-xs space-x-1">
              <span class="text-gray-500 font-bold">Common</span>
              <span>&lt;</span>
              <span class="text-green-500 font-bold">Uncommon</span>
              <span>&lt;</span>
              <span class="text-blue-500 font-bold">Rare</span>
              <span>&lt;</span>
              <span class="text-purple-500 font-bold">Very Rare</span>
              <span>&lt;</span>
              <span class="text-yellow-500 font-bold">Legendary</span>
              <span>&lt;</span>
              <span class="text-red-500 font-bold">Mythic</span>
              <span>&lt;</span>
              <span class="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-transparent bg-clip-text font-bold">Cosmic</span>
            </div>
          </div>
        </div>

        { /* Challenge Items */}
        <div class="flex flex-wrap justify-center p-2">
          {challengeData.filter(challenge => challenge.challengeId != mainAramChallengeId).map(challenge => (<ChallengeItem key={challenge.challengeId} item={challenge} />))}
        </div>
      </div>
    } else if (dataFetched) { // no ARAM challenge data
      return <div class="w-full text-center py-10">
        <span class="text-sm text-gray-500">No ARAM Challenge data available.</span>
      </div>
    } else { // loading
      return <div class="w-full flex justify-center">
        <HashLoader color="#36d7b7" />
      </div>
    }
  }

  useEffect(() => {
    getUserChallenges()
  }, [])

  return (
    <div class="h-full bg-white rounded-xl flex flex-col justify-center shadow-xl py-5 mb-10">
      <div class="flex flex-col w-auto space-y-5 mx-5">
        <div class="w-full">
          <span class="text-sm text-gray-500">Challenges</span>
        </div>
        <div class="w-full border-b border-gray-200" />
        { renderContent() }
      </div>
    </div>
  );
}

export default Challenges;