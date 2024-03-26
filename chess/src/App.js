
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlayCard from './pages/home/Home';
import Room from './pages/room/Room';

import Board from './components/main/board/Board';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<PlayCard />} />
        <Route path="/board" element={<Board/>} />

        <Route path="/room/:roomId" element={<Room />} />

      </Routes>
    </Router>
  );
}


export default App;
