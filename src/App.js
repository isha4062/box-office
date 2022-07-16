import React from 'react';
import { Routes , Route } from 'react-router-dom';
import Home from "./components/Home";
import Show from './components/Show';
import Starred from "./components/Starred";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/starred' element={<Starred />} />
      <Route path='/show/:id' element={<Show />} />
    </Routes>
  );
}

export default App;
