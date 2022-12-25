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

  const [challengeData, setChallengeData] = useState([])

  async function getUserChallenges() {
    const backendTarget = prod ? `/api/lol/summoner/${username}/challenges` : `http://localhost:${API_PORT}/lol/summoner/${username}/challenges`

    axios.get(backendTarget)
      .then(res => {
        const userChallenges = res.data.challenges; // trim unnecessary data
        const newUserChallenges = userChallenges.filter(challenge => AramChallengeIds.has(challenge.challengeId.toString()))

        setChallengeData(newUserChallenges)
      })
      .catch(err => {
        console.log(err);
      })
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

        {challengeData.length > 0 ?
          <div>
            { /* Challenge Level */}
            <div class="flex justify-center p-2">
              {<ChallengeLevel data={challengeData} />}
            </div>

            { /* Challenge Items */}
            <div class="flex flex-wrap justify-center p-2">
              {challengeData.filter(challenge => challenge.challengeId != mainAramChallengeId).map(challenge => (<ChallengeItem key={challenge.challengeId} item={challenge} />))}
            </div>
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

export default Challenges;