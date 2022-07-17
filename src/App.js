import React from 'react';
import { Routes , Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Home from "./components/Home";
import Show from './components/Show';
import Starred from "./components/Starred";

function App() {
  const theme = {
    mainColors: {
      blue: '#2400ff',
      gray: '#c6c6c6',
      dark: '#353535',
    },
  };
  return (
    <ThemeProvider theme={theme}>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/starred' element={<Starred />} />
      <Route path='/show/:id' element={<Show />} />
    </Routes>
    </ThemeProvider>
  );
}

export default App;
