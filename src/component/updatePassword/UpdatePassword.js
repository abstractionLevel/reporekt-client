import React, { useState, useRef, useEffect } from 'react';
import { useForm } from "react-hook-form";
import AuthService from '../../service/auth.service';
import './UpdatePassword.scss';
import { useHistory } from "react-router"


const UpdatePassword = () => {

    const { register, errors, handleSubmit, watch } = useForm({});

    const passwordWatched = useRef({});
    let submitRef = useRef();


    const [response, setResponse] = useState();
    const [message, setMessage] = useState("")

    passwordWatched.current = watch("password", "")

    let history = useHistory()

    var regularExpression = /[0-9]/;


    const onSubmit = data => {
        if(submitRef.current) {
            submitRef.current.setAttribute("disabled", "disabled");
        }
        AuthService.updatePassword(data.oldPassword, data.password, data.confirmPassword).then(
            (response) => {
                setResponse(response)
            });
    };

    useEffect(() => {
        if (response === 200) {
            setMessage("Password Update")
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        }
        if (response === 204) {
            setMessage("Password Don't Match")
            window.location.reload();
            
        }
    }, [response])



    return (
        <div>
            <h5>Update Password</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
                {message}
                <input
                    name="oldPassword"
                    className="form-control mb-2"
                    type="password"
                    placeholder="actual password"
                    ref={register({
                        required: "You must type an actual  password"
                    })}
                />
                {errors.oldPassword && <p>{errors.oldPassword.message}</p>}
                <input
                    name="password"
                    className="form-control mb-2"
                    type="password"
                    placeholder="new password"
                    ref={register({
                        required: "You must type a new  password",
                        pattern: {
                            value: regularExpression,
                            message: "Password must contain 1 or more digit characters"
                        },
                        minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters"
                        }
                    })}
                />
                {errors.password && <p>{errors.password.message}</p>}
                <input
                    name="confirmPassword"
                    className="form-control mb-2"
                    type="password"
                    placeholder="confirm password"
                    ref={register({
                        validate: value =>
                            value === passwordWatched.current || "The passwords do not match"
                    })}
                />
                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                <input type="submit" className="form-control mb-1"  ref={submitRef}/>

            </form>
            {response === 200 && <div className="alert alert-success">{message}</div>}
            {response === 204 && <div className="alert alert-danger">{message}</div>}
        </div>
    );

};


export default UpdatePassword