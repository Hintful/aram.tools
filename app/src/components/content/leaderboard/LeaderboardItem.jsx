import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChallengesConfig } from '../../../common/data/ChallengesConfig';
import { API_PORT } from "../../../common/var";
import { HashLoader } from 'react-spinners';

function LeaderboardItem(props) {
  const NUM_SHOW_PLAYERS = 20 // show top 20 players
  const [rankingData, setRankingData] = useState([])
  const prod = import.meta.env.PROD;

  const navigate = useNavigate();

  async function getLeaderboardInfo() {
    const backendTarget = prod ? `/api/lol/challenges/${props.id}/` : `http://localhost:${API_PORT}/api/lol/challenges/${props.id}/`
    const backendPromises = [
      axios.get(backendTarget + "CHALLENGER"), 
      axios.get(backendTarget + "GRANDMASTER"), 
      axios.get(backendTarget + "MASTER")
    ];

    Promise.all(backendPromises).then(res => {
      const combinedLadder = res[0].data.concat(res[1].data.concat(res[2].data));

      setRankingData(combinedLadder.slice(0, NUM_SHOW_PLAYERS));
    })
  }

  function search(e, summonerName) {
    e.preventDefault();
    navigate(`/profile/${summonerName}`);
  }

  useEffect(() => {
    getLeaderboardInfo()
  }, []); 

  return (
    <div class="flex flex-col items-center space-y-8 Inter">
      { /* Modal Header */ }
      <div class="flex flex-col text-center">
        <h2 class="font-bold Inter text-closer border-b pb-4 px-8">{ ChallengesConfig[props.id].name }</h2>
        <span class="Inter text-closer text-sm pt-4">{ ChallengesConfig[props.id].description }</span>
      </div>
      { rankingData.length > 0 ?
        <div class="flex flex-col items-center">
          <table class="table-auto text-sm text-center text-gray-500">
            <thead>
              <tr>
                <th scope="col" class="px-6 py-3 border-b-2">Rank</th>
                <th scope="col" class="px-6 py-3 border-b-2">Summoner Name</th>
                <th scope="col" class="px-6 py-3 border-b-2">Count</th>
              </tr>
            </thead>

            <tbody>
              { rankingData.map((entry, idx) => (
              <tr class="py-1">
                <td scope="row" class="font-bold px-6 py-2 border-b">{ entry.position }</td>
                {/* <td>{ entry.puuid }</td> */}
                <td class="border-b">
                  <span class="hover:cursor-pointer underline hover:text-black" onClick={(e) => search(e, `Summoner ${idx + 1}`)}>Summoner { idx + 1 }</span>
                </td>
                <td class="border-b">{ entry.value }</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
        :
        <HashLoader color="#36d7b7"/>
      }
    </div>
  )
}

export default LeaderboardItem;