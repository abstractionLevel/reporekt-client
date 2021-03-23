import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import AuthService from '../../service/auth.service';
import { Col, Container, Row } from 'react-bootstrap';
import './ActivateAccountPage.scss';


const ActivateAccountPage = () => {

    const { token } = useParams()
    const [successful, setSuccessful] = useState("");

    useEffect(() => {
        AuthService.activateAccount(token).then(
            (response) => {
                if(response===200) {
                    setSuccessful(<div className="alert alert-success">Account activated: <a href="/login" className="activate-account-login">LOGIN</a></div>)
                }
                if(response===401) {
                    setSuccessful(<div className="alert alert-danger">Token expired, Please signup again</div>)
                }
                if(response===404) {
                    setSuccessful(<div className="alert alert-danger">Token not valid, Please signup again</div>)
                }
            });
    }, [])

    return (
        <div>

            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col className="col-lg-4 form-login p-0">
                        {successful}
                    </Col>
                </Row>
            </Container>
        </div>
    );

};


export default ActivateAccountPage;