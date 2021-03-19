import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import './FormEmailForgotPassword.scss';
import { useHistory } from 'react-router';
import AuthService from '../../service/auth.service';
import ReCAPTCHA from "react-google-recaptcha";
import SETTINGS from "../../utility/settings";



const FormEmailForgotPassword = (props) => {

    let history = useHistory()
    let btnRef = useRef();
    const { register, errors, handleSubmit } = useForm({});
    const [successful, setSuccessful] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [response, setResponse] = useState();
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [tokenCaptcha, setTokenCaptcha] = useState("");

    function onChangeCatpcha(value) {
        setDisableSubmit(false);
        setTokenCaptcha(value)
    }
 


    const onSubmit = async (data) => {
        if (btnRef.current) {
            btnRef.current.setAttribute("disabled", "disabled");
        }
        await AuthService.sendEmailForgotPassword(data.email,tokenCaptcha).then(
            (response) => {
                console.log(response)
                response === 200 ? setSuccessful(true) : setSuccessful(false)
                setResponse(response)
            });
        setSubmit(true)
    };

    useEffect(() => {
        if (response === 200) {
            setTimeout(() => {
                history.push('/')
            }, 1000)
        }
        if(response===204) {
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        }
     
    }, [response])

    return (
        <div>
            {submit && (successful ? (<div className="alert alert-success">A verification link has been sent your email</div>)
                : (<div className="alert alert-danger">Email not found</div>)
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="email"
                    name="email"
                    className="form-control mb-2"
                    ref={register({
                        required: "required"
                    })}
                />
                <input
                    type="submit"
                    className="form-control"
                    disabled={disableSubmit}
                />
                {errors.email && <p>{errors.email.message}</p>}
                <ReCAPTCHA
                    className="recaptcha mt-2 "
                    sitekey={SETTINGS.KEY_CAPTCHA}
                    onChange={(onChangeCatpcha)}
                />
            </form>
        </div>


    );

};

export default FormEmailForgotPassword;