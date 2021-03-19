import React, { useEffect, useState } from 'react';
import axios from 'axios';



const HomeProva = () => {

    const [players, setPlayers] = useState([])

    useEffect(() => {
        axios.get('/api/v1/players/hello').then(
            (response) => {
                setPlayers(response.data)
            }
        )

    }, [])
    console.log(players)

    return (
        <div className="App">
            <header className="App-header">
                {players.map((player) => 
                    <div><p>{player}</p></div>
                )}
            </header>
        </div>
    );

};

export default HomeProva;