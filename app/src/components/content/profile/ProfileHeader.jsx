import React from "react";
import { dataDragonVersion } from "../../../data/versions.jsx";
import { HashLoader, BarLoader } from "react-spinners";
import { useParams } from "react-router-dom";

function ProfileHeader(props) {
  const { id } = useParams();
  const username = id;

  function getIconUrl(id) {
    return `http://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/profileicon/${id}.png`
  }

  return (
    <div class="max-w-3xl min-w-fit w-full mx-auto undrag">
      <div class="flex flex-col">
        <div class="bg-white border border-white shadow-lg rounded-3xl p-4 m-4">
          <div class="flex-none sm:flex">
            {/* Profile picture */}

            <div class="relative h-36 w-36 sm:mb-0 mb-3 grid place-items-center">
              {props.icon !== undefined ?
                <img
                  src={getIconUrl(props.icon)}
                  class=" w-36 h-36 object-cover rounded-2xl"
                />
                :
                <HashLoader color="#36d7b7" />
              }
            </div>

            <div class="flex flex-col sm:ml-5">
              <div class="flex items-center justify-between sm:mt-2">
                <div class="flex items-center">
                  <div class="flex flex-col space-y-3">
                    {/* Username */}
                    <div class="w-full flex-none text-xl text-gray-800 font-bold leading-none">
                      {username}
                    </div>

                    {/* Level */}
                    <div class="w-full h-4 flex-none text-sm text-gray-800">
                      {props.level !== undefined ?
                        <span class="align-middle">
                          <div class="text-xs inline-flex items-center font-bold leading-sm uppercase space-x-1 px-2 py-1 bg-blue-200 text-blue-700 rounded-md">
                            <svg class="svg-icon" width="16" height="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 20 20">
                              <path d="M17.684,7.925l-5.131-0.67L10.329,2.57c-0.131-0.275-0.527-0.275-0.658,0L7.447,7.255l-5.131,0.67C2.014,7.964,1.892,8.333,2.113,8.54l3.76,3.568L4.924,17.21c-0.056,0.297,0.261,0.525,0.533,0.379L10,15.109l4.543,2.479c0.273,0.153,0.587-0.089,0.533-0.379l-0.949-5.103l3.76-3.568C18.108,8.333,17.986,7.964,17.684,7.925 M13.481,11.723c-0.089,0.083-0.129,0.205-0.105,0.324l0.848,4.547l-4.047-2.208c-0.055-0.03-0.116-0.045-0.176-0.045s-0.122,0.015-0.176,0.045l-4.047,2.208l0.847-4.547c0.023-0.119-0.016-0.241-0.105-0.324L3.162,8.54L7.74,7.941c0.124-0.016,0.229-0.093,0.282-0.203L10,3.568l1.978,4.17c0.053,0.11,0.158,0.187,0.282,0.203l4.578,0.598L13.481,11.723z"></path>
                            </svg>
                            <span>
                              {props.level}
                            </span>
                          </div>
                        </span>
                        :
                        <div class="inline-block align-middle">
                          <BarLoader width={40} height={2} color="#36d7b7" />
                        </div>
                      }
                    </div>

                    {/* W/L stats */}
                    <div class="flex-auto text-gray-500 text-sm my-1 text-closer">
                      <span class="mr-1 font-bold text-blue-500">
                        {props.wins}
                      </span>
                      <span class="mr-3">Wins</span>

                      <span class="mr-1 font-bold text-red-500">
                        {props.losses}
                      </span>
                      <span class="mr-3">Losses</span>

                      <span class="mr-3 border-r border-gray-200  max-h-0"></span>
                      <span class="font-bold mr-1">
                        {((props.wins / (props.wins + props.losses)) * 100).toFixed(1)}%
                      </span>
                      <span>Winrate</span>
                    </div>

                  </div>
                </div>
              </div>

              {/* Update button */}
              <div class="mt-auto">
                <button class="flex-no-shrink bg-blue-500 hover:bg-blue-700 px-5 py-2 text-xs shadow-md hover:shadow-lg font-medium tracking-wider border-none text-closer text-white rounded-lg transition ease-in-out">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
