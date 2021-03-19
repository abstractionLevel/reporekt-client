import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Col, Container, Row } from 'react-bootstrap';

//Component
import CardReportsOfPlayer from '../../report/CardReportsOfPlayer';
import PieChartReportsTypeOfPlayer from '../../component/PieChartReportsTypeOfPlayer/PieChartReportsTypeOfPlayer';
import PlayerService from '../../service/player.service';
//css
import './playerPage.scss';
//assets

const PlayerPage = () => {

    const { username } = useParams()
    const [checkPlayer, setChekPlayer] = useState(false)
    const [message,setMessage] = useState("");
    const [player,setPlayer] = useState({});


    
    useEffect(()=>{
        if(!checkPlayer) {
            setMessage("Not Found")
        }
        PlayerService.searchPlayer(username).then(
            (response) => {
                setPlayer(response)
                response ? setChekPlayer(true) : setChekPlayer(false)
            }
        );
    },[])

  


    return (
        <div>
            {checkPlayer ? (
                <Container fluid  >
                    <Row className="no-gutters">
                        <Col className='col-12 col-lg-6  col-card-report '>
                            <div>
                                <p className="username">{username}</p>
                                <p className="tot-report">tot reports: {player.reportCount}</p>
                            </div>
                            <div>
                                <CardReportsOfPlayer username={username} />
                            </div>
                        </Col>
                        <Col className='report-type-players  '>
                                <PieChartReportsTypeOfPlayer username={username} />
                        </Col>
                    </Row>
                </Container> ): (
                <Container fluid  >
                    <Row className="">
                        <Col className=''>
                            <h1 className="d-flex justify-content-center mt-5 not-found">{message}</h1>
                        </Col>
                    </Row>
                </Container>
           )}
        </div>

    );
}

export default PlayerPage;