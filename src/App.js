import './App.css';
import Btn from './components/btn';
import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/nav-bar/nav-bar';
import Home from './pages/home/home';
import LogIn from './pages/log-in/log-in';
import SignUp from './pages/sign-up/sign-up';
import ThemeApp from './context/theme-context/theme-context-provider';
import ValidateToken from './pages/validate-token';
import TokenContextProvider from './context/token-context/token-context-provider';
import UserProfile from './pages/user-profile/UserProfile';
import PrivateUserRoute from './routes/private-user-route/PrivateUserRoute';
import UserContextProvider from './context/user-context/user-context-provider';

function App() {

  return (
    <BrowserRouter>
      <ThemeApp>
        <UserContextProvider>
          <TokenContextProvider>
            <div>

            </div>
            <NavBar></NavBar>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<LogIn />}></Route>
              <Route path="/validate" element={<ValidateToken />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/user" element={<PrivateUserRoute><UserProfile /></PrivateUserRoute>}></Route>
            </Routes>
          </TokenContextProvider>
        </UserContextProvider>
      </ThemeApp>
    </BrowserRouter>
  );
}

export default App;
