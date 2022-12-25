import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [summonerName, setSummonerName] = useState("");

  const navigate = useNavigate();

  function search(e) {
    e.preventDefault();
    setSummonerName("");
    navigate(`/profile/${summonerName}`);
  }

  return (
    <div className="h-screen flex">
      <div className="m-auto flex-grow Inter text-sm">
        {/* Logo */}
        <div className="mb-10 text-center text-4xl undrag">
          <text className="Staatliches">ARAM.TOOLS</text>
        </div>

        {/* Search bar */}
        <div className="flex flex-col items-center">
          <form
            onSubmit={(e) => search(e)}
          >
            <div className="flex space-x-2">
              <input
                autoFocus
                className="shadow appearance-none border rounded py-3 px-5 text-closer text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Summoner Name"
                onChange={(e) => {
                  setSummonerName(e.target.value);
                }}
              />
              <button
                className="inline-block transition ease-in-out bg-blue-500 hover:bg-blue-700 text-closer text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                // onClick={(e) => search(e)}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
