import React, { useState, useRef, useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import { Col, Container, Row } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";
import ContactUsService from '../../service/auth.service';
import SETTINGS from "../../utility/settings";



//Service

//sccss


const ContactUsPage = () => {

    const { register, errors, handleSubmit } = useForm({});
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [captcha, setCaptcha] = useState("");
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false)
    const [submit, setSubmit] = useState(false)

    const submitRef = useRef();

    const type = ["BUG", "ASSISTANCE"];

    function onChangeCatpcha(value) {
        setDisableSubmit(false);
        setCaptcha(value)
    }

    const onSubmit = data => {
        setDisableSubmit(true)
        ContactUsService.contactUs(data.type, data.title, data.description,captcha).then(
            (response) => {
                response === 200 ? setSuccessful(<div className="alert alert-success">The message has been successfully sent</div>) : setSuccessful(<div className="alert alert-danger">there was a problem</div>)
            });

            setSubmit(true)

    };

    useEffect(() => {
        if (submit) {
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        }
    }, [submit])

    return (
        <div>
            {successful}

            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col className="col-lg-8 form-login p-0">
                        <h5>Contact Us</h5>
                        <div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <select name="type"
                                    className="form-control mb-2"
                                    ref={register({
                                        required: "select one option"
                                    })}>
                                    <option value="">Select an Type</option>
                                    {type.map((type, index) =>
                                        <option value={type}>{type}</option>
                                    )}
                                </select>
                                {errors.type && <p>{errors.type.message}</p>}
                                <input
                                    name="title"
                                    className="form-control mb-2 "
                                    type="text"
                                    placeholder="Title"
                                    ref={register({
                                        required: "You must specify a title",
                                    })}
                                />
                                {errors.title && <p>{errors.title.message}</p>}

                                <textarea
                                    rows="12" 
                                    name="description"
                                    className="form-control mb-2"
                                    ref={register({
                                        required: "write an description's bug",
                                        minLength: {
                                            value: 1,
                                            message: "min 1 letter"
                                        },
                                        maxLength: {
                                            value: 2000,
                                            message: "max 2000"
                                        }
                                    })}
                                />
                                {errors.description && <p>{errors.description.message}</p>}


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
        </div>
    )

}

export default ContactUsPage;