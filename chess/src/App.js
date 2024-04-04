import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlayCard from "./pages/home/Home";
import Room from "./pages/room/Room";
import Profile from "./pages/profile/Profile";
import History from "./pages/history/History";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlayCard />} />

        <Route path="/room/:roomId" element={<Room />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/match-history/:roomId" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
