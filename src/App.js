import './App.css';
import Btn from './components/btn';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/nav-bar/nav-bar';
import Home from './pages/home/home';
import LogIn from './pages/log-in/log-in';
import SignUp from './pages/sign-up/sign-up';
import { createTheme, ThemeProvider } from '@mui/system';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1A2238',
//     },
//     secondary: {
//       main: '#9DAAF2',
//     },
//     error: {
//       main: '#FF6A3D',
//     },
//     warning: {
//       main: '#F4DB7D',
//     },
//     info: {
//       main: '#434343',
//     },
//     success: {
//       main: '#BFBFBF',
//     }
//   },
// })

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '1A2238',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
})


function App() {
  return (
    <BrowserRouter>

      <NavBar></NavBar>
      <Btn></Btn>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>

      </Routes>

    </BrowserRouter>

  );
}

export default App;
