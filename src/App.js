//component
import Header from './header/Header';
import HomePage from './pages/homePage/HomePage';
import PlayerPage from './pages/playerPage/PlayerPage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import Message from './pages/Message/Message';
import ReporterPage from './pages/Report/ReporterPage';
import PrivateRoute from './utility/PrivateRoute';
import LoggedRouter from './utility/LoggedRouter';
import ContactUsPage from './pages/ContactUs/ContactUsPage'
import CookiePolicyPage from './pages/CookiePolicy/CookiePolicyPage'
import ActivateAccountPage from './pages/ActivateAccountPage/ActivateAccountPage'
import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import PasswordForgotPage from './pages/PasswordForgotPage/PasswordForgotPage';
import EmailForgotPasswordPage from './pages/EmailForgotPasswordPage/EmailForgotPasswordPage';
import Cookies from 'js-cookie';
import CookiePolicy from './component/CookiePolicy/CookiePolicy'
import SETTINGS from './utility/settings';

//class
import './assets/scss/default.scss';
//service
import AuthService from './service/auth.service';
import UserProfile from './pages/userPage/UserProfile';




const App = (props) => {

    const userRegion = localStorage.getItem("userRegion");
    let isAcconsentCookie = Cookies.get("rcl_consent_given", { path: '/', domain: SETTINGS.DOMAIN_NAME });
    const [currentUser, setCurrentUser] = useState(undefined);






    useEffect(() => {

        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }

    }, [userRegion]);


    return (
        <div>
            <Router>
            <CookiePolicy cookieAcconsent={isAcconsentCookie} />
            <Header user={currentUser} />
            {userRegion ? (
                <div className="App">
                    <div className="image">
                        <Switch>
                            <Route exact path='/' component={HomePage} />
                            <Route path="/register" component={RegisterPage} />
                            <PrivateRoute path='/do/report' component={ReporterPage} />
                            <Route path='/cookie-policy' component={CookiePolicyPage} />
                            <LoggedRouter path="/login" component={LoginPage} />
                            <PrivateRoute path="/help-center" component={ContactUsPage} />
                            <Route path="/activate-account/:token" component={ActivateAccountPage} />
                            <Route path='/emailForgotPassword' component={EmailForgotPasswordPage} />
                            <Route path="/message" component={Message} />
                            <Route path='/player/:username' exact  component={PlayerPage} />
                            <Route path='/forgotPassword/:token' component={PasswordForgotPage} />
                            <PrivateRoute path='/profile' component={UserProfile} />
                        </Switch>
                    </div>
                </div>) : (<p></p>)
            }
            </Router>
        </div>
    )

}

export default App;
