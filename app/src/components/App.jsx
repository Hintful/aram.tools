import React from "react";
import Navbar from "./navbar/Navbar";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./content/Home";
import About from "./content/About";
import Ranking from "./content/Ranking";
import Profile from "./content/profile/Profile";

function App() {
  let location = useLocation();
  return (
    <div className="flex flex-col h-screen">
      <Navbar location={location.pathname} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ranking" element={<Ranking />} />

        <Route path="/profile/:id" element={<Profile />} />

        {/* Redirect 404 */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </div>
  );
}

export default App;
