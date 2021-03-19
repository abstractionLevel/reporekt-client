import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FormForgotPassword from '../../component/formForgotPassword/FormForgotPassword';



const PasswordForgot = () => {

    return (
        <Container fluid >
            <Row className="justify-content-md-center">
                <Col className="col-lg-4 form-login">
                    <h5>Password Forgot</h5>
                    <FormForgotPassword/>
                </Col>
            </Row>
        </Container >
    );
};

export default PasswordForgot;
