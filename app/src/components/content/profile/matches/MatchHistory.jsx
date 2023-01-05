import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MatchInfo from './MatchInfo';
import { useParams } from 'react-router-dom';
import { HashLoader } from "react-spinners";
import { API_PORT } from "../../../../common/var";

function MatchHistory(props) {
  const FETCH_MATCHES_NUM = 20;
  const prod = import.meta.env.PROD;
  const { id } = useParams();
  const username = id;

  const [matchIds, setMatchIds] = useState([])
  const [matches, setMatches] = useState([])
  const [loaded, setLoaded] = useState(false)

  async function getUserMatchIds() {
    const backendTarget = prod ? `/api/lol/summoner/${username}/latest-matches/${FETCH_MATCHES_NUM}` 
    : `http://localhost:${API_PORT}/api/lol/summoner/${username}/latest-matches/${FETCH_MATCHES_NUM}`;

    axios.get(backendTarget)
      .then(res => {
        setMatchIds(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }

  function getUserMatches() {
    const backendTargetPrefix = prod ? `/api/lol/matches/` : `http://localhost:${API_PORT}/api/lol/matches/`;
    const userMatchesPromises = []
    let fetchedMatchData = []

    for (let idx = 0; idx < FETCH_MATCHES_NUM; idx++) { // create promises for fetching user match infos
      userMatchesPromises.push(axios.get(backendTargetPrefix + matchIds[idx] + '/filtered'));
    }

    Promise.all(userMatchesPromises).then(res => {
      for (let idx = 0; idx < FETCH_MATCHES_NUM; idx++) {
        fetchedMatchData.push(res[idx].data)
      }

      setMatches(fetchedMatchData);
      setLoaded(true);
      console.log(matchData);
    })
  }

  useEffect(() => {
    getUserMatchIds();
  }, [])

  useEffect(() => {
    getUserMatches();
  }, [matches])

  return (
    <div class="h-full bg-white rounded-xl flex flex-col justify-center shadow-xl py-5 mb-10">
      <div class="flex flex-col w-auto space-y-5 mx-5">
        <div class="w-full">
          <span class="text-sm text-gray-500">Match History</span>
        </div>
        <div class="w-full border-b border-gray-200" />

        {matches.length > 0 ?
          // matches loaded
          <div class="flex flex-col justify-center space-y-4 p-2">
            {matches.map(match => (<MatchInfo info={match} />))}
          </div>
          :
          loaded ? 
          // data fetched but no aram data
          <div>
          </div>
          :
          // data not yet fetched
          <div class="w-full flex justify-center">
            <HashLoader color="#36d7b7" />
          </div>
        }
      </div>
    </div>
  );
}

export default MatchHistory;