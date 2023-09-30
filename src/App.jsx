import './App.css';
import { useEffect, useState } from 'react';
import AppRouter from './components/AppRouter.jsx';
import React from "react";
import Analyzer from './components/Analyzer';
import Cookies from 'js-cookie';

function App() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPES = [
    // User
    "user-read-private",
    "user-read-email",
    "user-library-read",
    "user-library-modify",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-top-read",
    
    // Playlists
    "playlist-read-private",
    "playlist-modify-public",
    "playlist-modify-private",
    "playlist-read-collaborative",

    // Spotify Connect
    "app-remote-control",
    "streaming",
    
    // Follow
    "user-follow-read",
    "user-follow-modify"
].join(" ");


  const [token, setToken] = useState(Cookies.get("token") || "")

  useEffect(() => {
    const hash = window.location.hash
    let token = Cookies.get("token")

    if(!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      // TODO: set to a minute for now for testing purposes but we should use 30 days in the future
      Cookies.set("token", token, { expires: 1 / 24 / 60 })
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken("")
    Cookies.remove("token")
  }

  return (
    <>
        <div className="App">
      <header className="App-header">
        {!token ? (
          <div className="pre-login">
            <h1>Vibology</h1>
            <button class="login-button"
              onClick={() => {
                window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${encodeURIComponent(SCOPES)}&response_type=${RESPONSE_TYPE}`;
              }}
            >
              Login to Spotify
            </button>
          </div>
        ) : (
          <>
              <div className="post-login">
                  <button className="logout-button" onClick={logout}>Logout</button>
                </div>

                <div className = "nav-bar">
                  <ul>
                  <li><a href = "http://localhost:3000/Dashboard"> Dashboard</a></li>
                    <li><a href = "http://localhost:3000/analyzer"> Analyzer</a></li>
                    <li><a href = "http://localhost:3000/playlists"> Playlists</a></li>
                    <li><a href = "http://localhost:3000/about"> About</a></li>
                  </ul>
                  <AppRouter/>
                </div>
          </>
        )}
      </header>
    </div>
    </>
  );
}

export default App;
