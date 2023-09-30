import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutPage from "./AboutPage"
import Analyer from "./Analyzer"
import PlayList from "./PlayList"
import DashBoard from "./DashBoard"

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path = "/playlists" element={
                    <PlayList/>

                }/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;