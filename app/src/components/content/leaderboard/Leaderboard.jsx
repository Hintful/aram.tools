import React, { useState } from 'react';
import { ChallengesConfig } from '../../../common/data/ChallengesConfig';
import Modal from 'react-modal';
import LeaderboardItem from './LeaderboardItem';

Modal.setAppElement('#root'); // bind modal to root element

function Leaderboard() {
  const aramChallengeIds = [ // that has riot leaderboard endpoint exposed
    "101107", // Takedowns
    "101103", // Go Legendary
    "101108", // Solo carry
    "101106", // Pentakill
    "101101", // 1800 > DPM
    "101201", // Skillshot hits
    "101202", // Skillshot dodges
    "101203", // Snowball hits
    "101205", // Turret executions before 10 mins
    "101305", // Over 90% KP
    "101307", // ARAM wins
    "2022002", // First turret before 5 mins
    "101304", // ARAM win before 10 mins
    "101306", // ARAM win without getting killed by enemy
    "101302", // S Grade or higher
  ] 

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChallengeId, setSelectedChallengeId] = useState(0);

  function openModal(id) {
    setSelectedChallengeId(id);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelectedChallengeId(0);
  }

  return (
    <div class="justify-center px-8 pt-16">
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
      >
        <div class="flex flex-col items-center">
          <LeaderboardItem id={selectedChallengeId} />
          <button onClick={() => closeModal()}>Close</button>
        </div>
      </Modal>
      <div class="flex flex-col items-center">
        <span class="text-2xl text-center Inter text-closer border-gray-300 border-b pb-8 px-24">Challenges Leaderboard</span>
        <div class="flex flex-wrap w-1/2 mt-8 space-y-4 space-x-4 w-auto justify-center items-center">
          { aramChallengeIds.map(id => (
            <div class="flex flex-col w-auto items-center"
              onClick={() => openModal(id)}
            >
              <div class="py-4 px-6 rounded-xl shadow-lg bg-white text-sm Inter text-center hover:cursor-pointer hover:bg-gray-100">
                <span class="font-bold">{ ChallengesConfig[id].name }</span>
                <div class="border-b my-2" />
                <span class="text-s">{ ChallengesConfig[id].description }</span>
              </div>
            </div>
          )) }
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;