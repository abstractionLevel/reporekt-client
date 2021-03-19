import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FormLogin from '../../component/formLogin/FormLogin'
import { Link } from 'react-router-dom';


const LoginPage = () => {



	return (
		<Container fluid>
			<Row className="justify-content-md-center">
				<Col className="col-lg-4 form-login">
					<h5>Login</h5>
					<FormLogin />
					<div className="d-flex">
						<div class="mr-auto p-2">
							<Link to="/register/">
								<p className="signup">Sign Up</p>
							</Link>
						</div>
						<div class="p-2">
							<Link to="/emailForgotPassword">
								<p className="login">Forgot Password/Nickname?</p>
							</Link>
						</div>


					</div>
				</Col>
			</Row>
		</Container>
	);

};

export default LoginPage