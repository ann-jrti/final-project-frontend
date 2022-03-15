import './App.css';
import Btn from './components/btn';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/nav-bar/nav-bar';
import Home from './pages/home/home';
import LogIn from './pages/log-in/log-in';
import SignUp from './pages/sign-up/sign-up';

import { createTheme, ThemeProvider } from '@mui/material';

const themes = createTheme({
  palette: {
    primary: {
      main: '#1A2238',
      dark: '#1f2535'
    },
    secondary: {
      main: '#9DAAF2',
      dark: '#525881'
    },
    error: {
      main: '#FF6A3D',
      dark: '#b3644c'
    },
    warning: {
      main: '#F4DB7D',
      dark: '#bbb18b'
    },
    info: {
      main: '#434343',
      dark: '#434343'
    },
    success: {
      main: '#BFBFBF',
      dark: '#BFBFBF'
    }
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})


function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={themes}>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>

        </Routes>
      </ThemeProvider>
    </BrowserRouter>

  );
}

export default App;
