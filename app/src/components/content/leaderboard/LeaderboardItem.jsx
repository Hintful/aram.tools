import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChallengesConfig } from '../../../common/data/ChallengesConfig';
import { API_PORT } from "../../../common/var";
import { HashLoader } from 'react-spinners';

function LeaderboardItem(props) {
  const NUM_SHOW_PLAYERS = 20 // show top 20 players
  const [rankingData, setRankingData] = useState([])
  const prod = import.meta.env.PROD;

  async function getLeaderboardInfo() {
    const backendTarget = prod ? `/api/lol/challenges/${props.id}/` : `http://localhost:${API_PORT}/api/lol/challenges/${props.id}/`

    await axios.get(backendTarget + "CHALLENGER")
      .then(res => {
        setRankingData([...rankingData, ...res.data].slice(0, NUM_SHOW_PLAYERS))
        .then(() => {
          if (rankingData.length < 20) {
            axios.get(backendTarget + "GRANDMASTER")
            .then(res => {
              setRankingData([...rankingData, ...res.data].slice(0, NUM_SHOW_PLAYERS))
              .then(() => {
                if (rankingData.length < 20) {
                  axios.get(backendTarget + "MASTER")
                  .then(res => {
                    setRankingData([...rankingData, ...res.data].slice(0, NUM_SHOW_PLAYERS));
                  })
                  .catch(err => {
                    console.log(err);
                  })
                }
              })
            })
            .catch(err => {
              console.log(err);
            })
          }
        })
      })
      .catch(err => {
        console.log(err);
      })
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
          <table class="table-auto">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Summoner Name</th>
                <th>Count</th>
              </tr>
            </thead>

            <tbody>
              { rankingData.map(entry => (
              <tr>
                <td>{ entry.position }</td>
                {/* <td>{ getNameByPuuid(entry.puuid) }</td> */}
                <td>{ entry.puuid }</td>
                <td>{ entry.value }</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
        :
        <HashLoader color="#36d7b7" />
      }
    </div>
  )
}

export default LeaderboardItem;