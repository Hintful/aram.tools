import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AramChallengeIds } from "../../../common/data/AramChallengeIds";
import ChallengeItem from './ChallengeItem';
import { HashLoader } from "react-spinners";

function Challenges(props) {
  const { id } = useParams();
  const username = id;

  const mainAramChallengeId = "101000" // ARAM Authority Challenge Id

  const [challengeData, setChallengeData] = useState([])

  async function getUserChallenges() {
    axios.get(`http://localhost:3000/api/lol/summoner/${username}/challenges`)
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

        { /* Main ARAM Authority Challenge */}

        { /* Remaining Challenge Items */}
        {challengeData.length > 0 ?
          <div class="flex flex-wrap justify-center p-2">
            {challengeData.map(challenge => (<ChallengeItem item={challenge} />))}
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