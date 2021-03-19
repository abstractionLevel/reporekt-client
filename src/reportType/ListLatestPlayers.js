import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PlayerService from '../service/player.service';
import './ListLatestPlayers.scss';



const ListLatestPlayers = props => {

    const [players, setPlayers] = useState([])

    useEffect(() => {
        PlayerService.fetchLatestPlayers().then(
            (response) => {
                setPlayers(response)
            });
    }, []);


    return (
        <ListGroup>
            {players.map((player, index) =>
                <div key={index} className='mb-2 list'>
                    <Link to={'player/' + player.nickname}>
                        <ListGroup.Item key='index'>
                            {player.nickname}
                        </ListGroup.Item>
                    </Link>
                </div>
            )}
        </ListGroup>
    );
};

export default ListLatestPlayers;
