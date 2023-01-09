import React from "react";
import { dataDragonVersion } from "../../../common/Versions.jsx";
import { HashLoader, BarLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { useState } from "react";

function ProfileHeader(props) {
  const { id } = useParams();
  const username = id;

  const [updating, setUpdating] = useState(false);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function sleep(t) { return new Promise(resolve => setTimeout(resolve, t)); }

  async function update() {
    setUpdating(true);

    await sleep(2000);
    window.location.reload(); // refresh page
  }

  function getIconUrl(id) {
    return `http://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/profileicon/${id}.png`
  }

  function getBorderImageName() {
    if (props.level < 30) { return "/borders/border_1.png"; }
    else if (props.level < 50) { return "/borders/border_2.png"; }
    else { return `/borders/border_${Math.floor(props.level / 25) + 1}.png`}
  }

  return (
    <div class="max-w-xl w-full mx-auto undrag">
      <div class="flex flex-col">
        <div class="bg-white border border-white shadow-lg rounded-full p-4 m-4">
          <div class="flex-none flex">
            {/* Profile picture */}
            <div class="relative h-32 w-32 grid place-items-center pointer-events-none">
              {props.icon !== undefined ?
                <>
                  <img
                    src={getIconUrl(props.icon)}
                    class="absolute w-24 h-24 object-cover rounded-full z-0 "
                  />
                  <div class="w-48 h-48 relative">
                    <img class="absolute -inset-8 z-10 object-fill" src={getBorderImageName()} />
                  </div>
                </>
                :
                <HashLoader color="#36d7b7" />
              }
            </div>

            <div class="flex flex-col ml-5">
              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center">
                  <div class="flex flex-col space-y-3">
                    {/* Username */}
                    <div class="w-full flex-none text-xl text-gray-800 font-bold leading-none">
                      { props.name }
                    </div>

                    {/* Level */}
                    <div class="w-full h-4 flex-none text-sm text-gray-800">
                      {props.level !== undefined ?
                        <span class="align-middle">
                          <div class="text-xs inline-flex items-center font-bold leading-sm space-x-1 px-2 py-1 bg-blue-200 text-blue-700 rounded-md">
                            <span>
                              Lv {props.level}
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
                    {/* <div class="flex-auto text-gray-500 text-sm my-1 text-closer">
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
                    </div> */}

                  </div>
                </div>
              </div>

              {/* Update button */}
              <div class="mt-auto">
                <button class={classNames("ex-no-shrink w-20 px-5 py-2 text-xs shadow-md hover:shadow-lg",
                  "font-medium tracking-wider border-none text-closer text-white rounded-lg transition ease-in-out",
                  !updating ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-300 hover:cursor-default"
                )}
                  onClick={() => update()}
                >
                  <span>Update</span>
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
