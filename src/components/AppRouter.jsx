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
                    <Route path="/about" element={<AboutPage/>} />
                    <Route path="/analyzer" element={<Analyer/>} />
                    <Route path="/dashboard" element={<DashBoard/>} />
                </Routes>
        </BrowserRouter></>
    )
}

export default AppRouter;