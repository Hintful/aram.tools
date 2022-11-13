import React from "react";

function ProfileHeader(props) {
  return (
    <div class="max-w-3xl min-w-fit w-full mx-auto">
      <div class="flex flex-col">
        <div class="bg-white border border-white shadow-lg rounded-3xl p-4 m-4">
          <div class="flex-none sm:flex">
            {/* Profile picture */}
            <div class="relative h-32 w-32 sm:mb-0 mb-3">
              <img
                src={props.info.profile_picture}
                class=" w-32 h-32 object-cover rounded-2xl"
              />
            </div>

            <div class="flex-auto sm:ml-5 justify-evenly space-y-2">
              <div class="flex items-center justify-between sm:mt-2">
                <div class="flex items-center">
                  <div class="flex flex-col">
                    {/* Username */}
                    <div class="w-full flex-none text-xl text-gray-800 font-bold leading-none mb-2">
                      {props.info.username}
                    </div>

                    {/* Level */}
                    <div class="w-full flex-none text-sm text-gray-800 leading-none mb-1">
                      <span class="mr-1">Level</span>
                      <span>
                        {props.info.level}
                      </span>
                    </div>

                    {/* W/L stats */}
                    <div class="flex-auto text-gray-500 text-sm my-1 text-closer">
                      <span class="mr-1 font-bold text-blue-500">
                        {props.info.wins}
                      </span>
                      <span class="mr-3">Wins</span>

                      <span class="mr-1 font-bold text-red-500">
                        {props.info.losses}
                      </span>
                      <span class="mr-3">Losses</span>

                      <span class="mr-3 border-r border-gray-200  max-h-0"></span>
                      <span class="font-bold mr-1">
                        {((props.info.wins / (props.info.wins + props.info.losses)) * 100).toFixed(1)}%
                      </span>
                      <span>Winrate</span>
                    </div>

                  </div>
                </div>
              </div>

              {/* Update button */}
              <button class="flex-no-shrink bg-blue-500 hover:bg-blue-700 px-5 py-2 text-xs shadow-md hover:shadow-lg font-medium tracking-wider border-none text-closer text-white rounded-lg transition ease-in-out">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
