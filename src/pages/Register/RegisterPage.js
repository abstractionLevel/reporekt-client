import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Col, Container, Row } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";
import SETTINGS from "../../utility/settings";
import IconOk from "../../assets/img/pass.png";
import IconFail from "../../assets/img/fail.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";


//service
import AuthService from '../../service/auth.service';

//scss
import './RegisterPage.scss';


const RegisterPage = (props) => {


    const iconCheck = <FontAwesomeIcon icon={faCheck} />;
    const iconFail = <FontAwesomeIcon icon={faTimes} />;
    const { register, errors, handleSubmit, watch } = useForm({});

    const passwordWatched = useRef({});

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [usernameAlreadyExist, setUsernameAlreadyExist] = useState();
    const [emailAlreadyExists, setEmailAlreadyExists] = useState();
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [tokenCaptcha, setTokenCaptcha] = useState("");

    passwordWatched.current = watch("password", "")

    function onChangeCatpcha(value) {
        setDisableSubmit(false);
        setTokenCaptcha(value)
    }

    const onChangeUsername = (e) => {
        if (e.target.value != "" && e.target.value.length >= 3) {
            AuthService.verifyUserExists(e.target.value).then(
                (response) => {
                    response.status === 200 ? setUsernameAlreadyExist(true) : setUsernameAlreadyExist(false)
                }
            );
        }

    }

    const onChangeEmail = (e) => {
        if (e.target.value != "") {
            AuthService.verifyEmailExists(e.target.value).then(
                (response) => {
                    response.status === 200 ? setEmailAlreadyExists(true) : setEmailAlreadyExists(false)
                }
            );
        }

    }


    const onSubmit = data => {
        setDisableSubmit(true)

        if (usernameAlreadyExist === true || emailAlreadyExists === true) {
            setDisableSubmit(false);
        }

        if (usernameAlreadyExist === false && emailAlreadyExists === false) {
            props.history.push({
                pathname: '/message',
                state: {
                    successful: true,
                    email: data.email
                }
            });
        }



    };


    useEffect(() => {
        if (tokenCaptcha !== "") {
            setDisableSubmit(false)
        }
    }, [tokenCaptcha])

    return (
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col className="col-lg-4 form-login p-0">
                    <h5>Sign Up</h5>
                    <div className="">
                        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                            <input
                                name="username"
                                className="form-control  "
                                type="text"
                                placeholder="username"
                                onChange={onChangeUsername}
                                ref={register({
                                    required: "You must specify a username",
                                    minLength: {
                                        value: 3,
                                        message: "username must have at least 3 characters"
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9_]+$/,
                                        message: "No Speacial Characters"
                                    },

                                })}
                            />
                            {usernameAlreadyExist == true && <i className="icon-username-fail">{iconFail}</i>}
                            {usernameAlreadyExist == false && <i className="icon-username-check">{iconCheck}</i>}
                            <div className="error-register-page">
                                {errors.username && <p>{errors.username.message}</p>}
                            </div>
                            <input
                                name="email"
                                className="form-control "
                                type="email"
                                placeholder="email"
                                onChange={onChangeEmail}
                                ref={register({
                                    required: "required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "invalid email address"
                                    }
                                })}
                            />
                            {emailAlreadyExists == true && <i className="icon-email-fail">{iconFail}</i>}
                            {emailAlreadyExists == false && <i className="icon-email-check">{iconCheck}</i>}
                            <div className="error-register-page">
                                {errors.email && <p>{errors.email.message}</p>}
                            </div>
                            <input
                                name="password"
                                className="form-control"
                                type="password"
                                placeholder="password"
                                ref={register({
                                    required: "You must specify a password",
                                    minLength: {
                                        value: 8,
                                        message: "Password must have at least 8 characters"
                                    }
                                })}
                            />
                            <div className="error-register-page">
                                {errors.password && <p>{errors.password.message}</p>}
                            </div>
                            <input
                                name="confirmPassword"
                                className="form-control"
                                placeholder="confirm password"
                                type="password"
                                ref={register({
                                    validate: value =>
                                        value === passwordWatched.current || "The passwords do not match"
                                })}
                            />
                            <div className="error-register-page">
                                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                            </div>
                            <input type="submit" className="form-control " disabled={disableSubmit} />
                            <ReCAPTCHA
                                className="recaptcha mt-2 "
                                sitekey={SETTINGS.KEY_CAPTCHA}
                                onChange={(onChangeCatpcha)}
                            />
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    )

};

export default RegisterPage;