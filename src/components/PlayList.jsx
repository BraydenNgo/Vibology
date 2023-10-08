import React from "react"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import "../App.css";

const PlayList = () => {
    const [playlistData, setPlaylistData] = useState([]);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
    const [userPlaylists, setUserPlaylists] = useState([]);
    
    const fetchUserPlaylists = async () => {
        try {
            const response = await axios.get(
                'https://api.spotify.com/v1/me/playlists',
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                }
            );
            setUserPlaylists(response.data.items);
        } catch (error) {
            console.error('Error fetching user playlists:', error);
        }
    };

    useEffect(() => {
        fetchUserPlaylists();
    }, []);

    useEffect(() => {
        async function fetchPlaylist() {
            try {
                const response = await axios.get(
                    `https://api.spotify.com/v1/playlists/${selectedPlaylistId}/tracks`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('token')}`,
                        },
                    }
                );
                setPlaylistData(response.data.items);
            } catch (error) {
                console.error('Error fetching playlist:', error);
            }
        }
        if (selectedPlaylistId) {
            fetchPlaylist();
        }
    }, [selectedPlaylistId]);

    const handlePlaylistChange = (event) => {
        setSelectedPlaylistId(event.target.value);
    };
    
    return(
        <div>
            <h1>Playlist Songs</h1>
            <select onChange={handlePlaylistChange}>
                <option value={null}>Select a Playlist</option>
                {userPlaylists.map((playlist) => (
                    <option key={playlist.id} value={playlist.id}>
                        {playlist.name}
                    </option>
                ))}
            </select>
            <ul className="playlistTracks">
                {playlistData.map((track) => (
                    <li key={track.track.id}>{track.track.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default PlayList;