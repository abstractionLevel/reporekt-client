import React, { useRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from "react-router-dom";
import AuthService from '../../service/auth.service';
import { useHistory } from "react-router"


const ForgotPassword = () => {

    const { register, errors, handleSubmit, watch } = useForm({});
    const [response, setResponse] = useState();
    const [message, setMessage] = useState("")
    const passwordWatched = useRef({});
    passwordWatched.current = watch("password", "")

    const { token } = useParams();

    let history = useHistory()

    const onSubmit = data => {
        AuthService.forgotPassword(data.password, data.confirmPassword, token).then(
            (response) => {
                setResponse(response)
            });
    };



    useEffect(() => {
        if (response === 200) {
            setMessage("Password Update")
            setTimeout(() => {
                history.push('/');
            }, 2000);
        }
        if (response === 401) {
            setMessage("Not Allowed")
           // window.location.reload();

        }
    }, [response])

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="password"
                className="form-control mb-2"
                name="password"
                placeholder="password"
                ref={register({
                    required: "You must specify a password",
                    minLength: {
                        value: 8,
                        message: "Password must have at least 8 characters"
                    }
                })}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <input
                type="password"
                className="form-control mb-2"
                placeholder="confirmPassword"
                name="confirmPassword"
                ref={register({
                    required: "required",
                    validate: value =>
                        value === passwordWatched.current || "The password do not match"
                })}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            <input
                type="submit"
                className="form-control mb-1"
            />
            {response === 200 && <div className="alert alert-success">{message}</div>}
            {response === 401 && <div className="alert alert-danger">{message}</div>}
        </form>

    );
};

export default ForgotPassword;