import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import PlayeService from '../../service/player.service';


//css
import '../css/CardTopPlayers.scss';


const CardTopPlayers = (props) => {

    const [players,setPlayers] = useState([])

   
    useEffect(() => {
        PlayeService.fetchTopPlayer().then(
            (response)=>{
                setPlayers(response)
            }
        )
    }, []);

    return (
        players.map((player, index) =>
            <div key={index} className="card-top-players">
                <Card >
                    <Card.Body>
                        <Card.Title className="title-top-player">
                            <div className='d-inline'><Link to={"player/"+player.nickname}>{player.nickname}</Link></div>
                            <div className='d-inline rep-count ml-2'>{player.reportCount}</div>
                            <div className='d-inline reported'>report/s</div>
                        </Card.Title>
                        <div className="text-top-player">
                            <p>last reported: <Moment format="YYYY/MM/DD">{player.date}</Moment></p>
                        </div>
                    </Card.Body>
                </Card>
                <br />
            </div>
            
        )
    );
};

export default CardTopPlayers;
