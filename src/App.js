import React from 'react';
import { Routes , Route } from 'react-router-dom';
import Home from "./components/Home";
import Starred from "./components/Starred";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/starred' element={<Starred />} />
    </Routes>
  );
}

export default App;
