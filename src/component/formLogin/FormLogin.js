import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthService from '../../service/auth.service';
import './FormLogin.scss';
import { useHistory } from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import iconVisibile from "../../assets/img/eyevisible.png";
import iconInvisibile from "../../assets/img/eyeinvisible.png";



const FormLogin = (props) => {


    let history = useHistory()
    const { register, errors, handleSubmit } = useForm({});
    const [successful, setSuccessful] = useState(true);
    const [passwordShown, setPasswordShown] = useState(false);
    const [message,setMessage] = useState("")


    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const onSubmit = data => {
        AuthService.login(data.username, data.password).then(
            (response) => {
                console.log(response)
                if (response.status == 200) {
                    history.push('/');
                    window.location.reload();
                }
                if (response.status == 401) {
                    setMessage("Rip: Banned")
                }
                if (response.status == 404) {
                    setMessage("Bad  Credential")
                }
            }
        );
    };

    return (
        <div>
            <p className="p-0 m-0 mb-2">{message}</p>
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
                            <img onClick={togglePasswordVisiblity} width="24px" heigth="24px" src={passwordShown ? iconVisibile : iconInvisibile}></img>
                        </div>
                    </div>
                </div>

                <div className="error-login-page">
                    {errors.password && <p>{errors.password.message}</p>}
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