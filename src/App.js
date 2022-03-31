import './App.css';
import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/nav-bar/nav-bar';
import Home from './pages/home/home';
import LogIn from './pages/log-in/log-in';
import SignUp from './pages/sign-up/sign-up';
import ThemeApp from './context/theme-context/theme-context-provider';
import ValidateToken from './pages/validate-token';
import UserProfile from './pages/user-profile/UserProfile';
import PrivateUserRoute from './routes/private-user-route/PrivateUserRoute';
import UserContextProvider from './context/user-context/user-context-provider';
import CustomLolProfile from './pages/custom-lol-profile/CustomLolProfile';
import UploadArtwork from './pages/upload-artwork/UploadArtwork';
import Gallery from './pages/upload-artwork/Gallery';
import UserAccount from './pages/user-account/UserAccount';
import PlayersPool from './pages/players-pool/PlayersPool';
import PlayerResults from './pages/playerResultsSearch/PlayerResults';
import Footer from './components/footer/Footer';
import ComparePlayers from './pages/compare-players/ComparePlayers';
import PrivacyPolicy from './pages/privacy-policy/privacy-policy';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <ThemeApp>
        <UserContextProvider>
          <NavBar></NavBar>
          <Footer></Footer>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<LogIn />}></Route>
            <Route path="/validate" element={<ValidateToken />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/players-pool" element={<PlayersPool />}></Route>
            <Route path="/player-results/" element={<PlayerResults />}></Route>
            <Route
              path="/compare-players/"
              element={<ComparePlayers />}
            ></Route>
            <Route
              path="/user"
              element={
                <PrivateUserRoute>
                  <UserProfile />
                </PrivateUserRoute>
              }
            ></Route>
            <Route
              path="/user/my-lol-profile"
              element={
                <PrivateUserRoute>
                  <CustomLolProfile />
                </PrivateUserRoute>
              }
            ></Route>
            <Route
              path="/user/upload-artwork"
              element={
                <PrivateUserRoute>
                  <UploadArtwork />
                </PrivateUserRoute>
              }
            ></Route>
            <Route
              path="/user/my-gallery/artworks/:token"
              element={
                <PrivateUserRoute>
                  <Gallery />
                </PrivateUserRoute>
              }
            ></Route>
            <Route
              path="/user/my-account"
              element={
                <PrivateUserRoute>
                  <UserAccount />
                </PrivateUserRoute>
              }
            ></Route>
            <Route
              path="/privacy-policy"
              element={<PrivacyPolicy></PrivacyPolicy>}
            ></Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
          </Routes>
        </UserContextProvider>
      </ThemeApp>
    </BrowserRouter>
  );
}

export default App;
