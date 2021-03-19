import axios from "axios";
import Cookies from 'js-cookie';
import authHeader from '../service/auth-header';
import SETTINGS from '../utility/settings';


const API_URL_SIGNIN = SETTINGS.SERVER_PROXY + "/api/v1/authentication/";
const API_URL_SIGNUP = SETTINGS.SERVER_PROXY + "/api/v1/registration/";
const API_URL_FORGOT_PASSWORD = SETTINGS.SERVER_PROXY + "/api/v1/users/accounts/update_forgot_password"
const API_URL_SEND_EMAIL_FORGOT_PASSWORD = SETTINGS.SERVER_PROXY + "/api/v1/users/accounts/email/email_token";
const API_URL_UPDATE_PASSWORD = SETTINGS.SERVER_PROXY + "/api/v1/users/accounts/update_password";
const API_URL_VERIFY_USER_EXISTS = SETTINGS.SERVER_PROXY + "/api/v1/users/username/";
const API_URL_VERIFY_EMAIL_EXISTS = SETTINGS.SERVER_PROXY + "/api/v1/users/";
const API_URL_CONTACT_US = SETTINGS.SERVER_PROXY + "/api/v1/help-center/contact-us";
const API_URL_ACTIVATE_ACCOUNT = SETTINGS.SERVER_PROXY + "/api/v1/registration/?token=";

const headers = authHeader();
const region = localStorage.getItem("userRegion")



const contactUs = (type, title, description, captcha) => {
    return axios.post(API_URL_CONTACT_US, { type, title, description, captcha }, headers).then(
        (response) => {
            return response.status
        })
        .catch((error) => {
            return error.response.status
        })

}

const activateAccount = (token) => {
    return axios.get(API_URL_ACTIVATE_ACCOUNT + token).then(
        (response) => {
            return response.status;
        })
        .catch((error) => {
            return error.response.status;
        })
}
const forgotPassword = (password, confirmPassword, token) => {
    return axios.post(API_URL_FORGOT_PASSWORD, { password, confirmPassword, token }).then(
        (response) => {
            return response.status;
        })
        .catch((error) => {
            return error.response.status;
        });
};

const updatePassword = (oldPassword, password, confirmPassword) => {
    return axios.post(API_URL_UPDATE_PASSWORD, {
        oldPassword, password, confirmPassword
    }, headers)
        .then((response) => {
            return response.status
        })
};

const sendEmailForgotPassword = (email, captcha) => {
    return axios.post(API_URL_SEND_EMAIL_FORGOT_PASSWORD, { email, captcha }).then(
        (response) => {
            return response.status
        })
        .catch(
            (error) => {
                console.log(error)
            });
};

const register = (username, email, password, confirmPassword, captcha) => {
    return axios.post(API_URL_SIGNUP, {
        username,
        email,
        password,
        confirmPassword,
        region,
        captcha
    });
};



const login = (username, password) => {
    return axios
        .post(API_URL_SIGNIN, {
            username,
            password,
        })
        .then((response) => {

            if (response.data) {
                setCurrentUser(response.data)
                return response;
            }

        });
};

const verifyUserExists = (username) => {
    return axios.get(API_URL_VERIFY_USER_EXISTS + username).then(
        (response) => {
            return response
        })
        .catch(error => {
        });
};

const verifyEmailExists = (email) => {
    return axios.get(API_URL_VERIFY_EMAIL_EXISTS + email).then(
        (response) => {
            return response
        })
        .catch(error => {
        });
};

const logout = () => {
    Cookies.remove("wtu", { path: '/', domain: SETTINGS.DOMAIN_NAME });
};


const getCurrentUser = () => {
    return Cookies.get("wtu", { path: '/', domain: SETTINGS.DOMAIN_NAME });
};

const setCurrentUser = (jwt) => {
    return Cookies.set('wtu', jwt, { expires: 7, domain: SETTINGS.DOMAIN_NAME });
}
export default {
    register,
    login,
    logout,
    getCurrentUser,
    verifyUserExists,
    verifyEmailExists,
    updatePassword,
    sendEmailForgotPassword,
    forgotPassword,
    contactUs,
    activateAccount,
};