import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutPage from "./AboutPage"
import Analyer from "./Analyzer"
import PlayList from "./PlayList"
import DashBoard from "./DashBoard"

function AppRouter() {
    return (
        <><BrowserRouter>
                <Routes>
                    <Route path="/playlists" element={<PlayList/>} />
                </Routes>
                <Routes>
                    <Route path="/about" element={<AboutPage/>} />
                </Routes>
                <Routes>
                    <Route path="/analyzer" element={<Analyer/>} />
                </Routes>
                <Routes>
                    <Route path="/dashboard" element={<DashBoard/>} />
                </Routes>
        </BrowserRouter></>
    )
}

export default AppRouter;