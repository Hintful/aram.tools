import React from 'react';

function ProfileContent(props) {

  return (
    <div class="h-auto bg-white rounded-xl flex flex-col items-center shadow-xl min-w-max py-5 m-10">
      <div class="flex flex-row w-full space-x-5 px-5">
        {/* Left third - champ stats? */}
        <div class="basis-1/3 w-full border-r border-gray-200">
          <span class="text-sm text-gray-500">Champ Stats</span>
        </div>

        {/* right third - match history? */}
        <div class="basis-2/3 w-full">
          <span class="text-sm text-gray-500">Match History</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileContent;