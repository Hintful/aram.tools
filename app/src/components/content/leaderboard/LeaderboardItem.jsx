import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChallengesConfig } from '../../../common/data/ChallengesConfig';
import { API_PORT } from "../../../common/var";
import { HashLoader } from 'react-spinners';
import { GiTrophy } from 'react-icons/gi';

function LeaderboardItem(props) {
  const NUM_SHOW_PLAYERS = 20 // show top 20 players
  const prod = import.meta.env.PROD;

  const [rankingData, setRankingData] = useState([])
  const [summonerData, setSummonerData] = useState([])

  const navigate = useNavigate();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

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

  function getSummonerData() {
    const backendTarget = prod ? `api/lol/summoner/info/by-puuid/` : `http://localhost:${API_PORT}/api/lol/summoner/info/by-puuid/`
    const backendPromises = []
    let fetchedData = []

    if (rankingData.length == 0) { return; }

    for (let idx = 0; idx < NUM_SHOW_PLAYERS; idx++) { // create backend promises
      backendPromises.push(axios.get(backendTarget + rankingData[idx].puuid))  
    }

    Promise.all(backendPromises).then(res => {
      for (let idx = 0; idx < NUM_SHOW_PLAYERS; idx++) {
        fetchedData.push(res[idx].data)
      }

      setSummonerData(fetchedData)
    })
  }

  function search(e, summonerName) {
    e.preventDefault();
    navigate(`/profile/${summonerName}`);
  }

  function getRowStyle(n) {
    switch (n) {
      case 0:
        return "bg-gradient-to-r from-yellow-200 to-amber-400 background-animate"
      case 1:
        return "bg-gradient-to-r from-gray-200 to-gray-300"
      case 2:
        return "bg-gradient-to-r from-yellow-500 to-yellow-600"
      default:
        return ""
    }
  }

  function getCrown(n) {
    switch (n) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return ""
    }
  }

  function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    getLeaderboardInfo()
  }, []); 

  useEffect(() => {
    getSummonerData()
  }, [rankingData])

  return (
    <div class="flex flex-col items-center space-y-8 Inter">
      { /* Modal Header */ }
      <div class="flex flex-col text-center">
        <h2 class="font-bold Inter text-closer border-b pb-4 px-8">{ ChallengesConfig[props.id].name }</h2>
        <span class="Inter text-closer text-sm pt-4">{ ChallengesConfig[props.id].description }</span>
      </div>
      { summonerData.length > 0 ?
        <div class="flex flex-col items-center">
          <table class="table-auto text-sm text-center text-gray-500">
            <thead class="bg-fixed">
              <tr>
                <th scope="col" class="pl-3 border-b-2"></th>
                <th scope="col" class="pr-3 py-3 border-b-2">Rank</th>
                <th scope="col" class="px-6 py-3 border-b-2">Summoner Name</th>
                <th scope="col" class="px-6 py-3 border-b-2">Count</th>
              </tr>
            </thead>

            <tbody>
              { rankingData.map((entry, idx) => (
              <tr class="py-1">
                <td class={classNames("pl-3 border-b bg-fixed",
                  getRowStyle(idx)
                )}>
                  { getCrown(idx) }
                </td>
                <td scope="row" class={classNames("font-bold pr-3 py-2 border-b bg-fixed",
                  getRowStyle(idx)
                )}>{ entry.position }</td>
                {/* <td>{ entry.puuid }</td> */}
                <td class={classNames("border-b bg-fixed",
                  getRowStyle(idx)
                )}>
                  <span class="hover:cursor-pointer underline hover:text-black" onClick={(e) => search(e, `${summonerData[idx].name}`)}>{ summonerData[idx].name }</span>
                </td>
                <td class={classNames("border-b bg-fixed",
                  getRowStyle(idx)
                )}>{ formatNumber(entry.value) }</td>
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