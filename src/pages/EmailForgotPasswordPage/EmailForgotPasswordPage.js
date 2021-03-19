import React from 'react';
import {Col,Row,Container} from 'react-bootstrap';
import EmailForgotPassword from '../../component/EmailForgotPassword/FormEmailForgotPassword';


const EmailForgotPasswordPage = () => {

    return (
        <Container fluid>
			<Row className="justify-content-md-center">
				<Col className="col-lg-4 form-login">
					<h5>Email</h5>
					<EmailForgotPassword/>
				</Col>
			</Row>
		</Container>
    );
};


export default EmailForgotPasswordPage