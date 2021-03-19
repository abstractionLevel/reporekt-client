import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthService from '../../service/auth.service';
import './FormLogin.scss';
import { useHistory } from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import iconVisibile from "../../assets/img/eyevisible.png";
import iconInvisibile from "../../assets/img/eyeinvisible.png";



const FormLogin = (props) => {

    const eye = <FontAwesomeIcon icon={faEye} />;

    let history = useHistory()
    const { register, errors, handleSubmit } = useForm({});
    const [successful, setSuccessful] = useState(true);
    const [passwordShown, setPasswordShown] = useState(false);


    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const onSubmit = data => {
        AuthService.login(data.username, data.password).then(
            (response) => {
                history.push('/');
                window.location.reload();

            },
            (error) => {
                setSuccessful(false)
            }
        );
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    className="form-control "
                    name="username"
                    placeholder="username"
                    ref={register({
                        required: "required"
                    })}
                />
                <div className="error-login-page">
                    {errors.username && <p>{errors.username.message}</p>}
                </div>
                <div class="form-group">
                    <div class="input-group" id="show_hide_password">
                        <input
                            type={passwordShown ? "text" : "password"}
                            placeholder="password"
                            className="form-control  d-inline"
                            name="password"
                            ref={register({
                                required: "requred"
                            })}
                        />
                        <div class="input-group-addon div-visibility">
                            <img onClick={togglePasswordVisiblity} width="24px" heigth="24px"src={passwordShown ? iconVisibile : iconInvisibile}></img>
                        </div>
                    </div>
                </div>
               
                <div className="error-login-page">
                    {errors.password && <p>{errors.password.message}</p>}
                    {!successful && <p className="p-0 m-0">username or password incorrect</p>}
                </div>
                <input
                    type="submit"
                    className="form-control"
                />
            </form>
        </div>
    );

};

export default FormLogin;