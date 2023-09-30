import './App.css';
import { useEffect, useState } from 'react';
import AppRouter from './components/AppRouter.jsx';
import React from "react";
import Analyzer from './components/Analyzer';

function App() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState(window.localStorage.getItem("token"))

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if(!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
      setToken(token)
    }
  })

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
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
                window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
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