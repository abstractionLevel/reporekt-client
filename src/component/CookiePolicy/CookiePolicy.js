import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';
import SETTINGS from '../../utility/settings';
import './CookiePolicy.scss';


const CookiePolicy = (props) => {

    const isAcconsentCookie = props.cookieAcconsent
    const type = "checkbox"
    const [showRegionModal, setShowRegionModal] = useState(false)
    const [marketing, setMarketing] = useState(true);
    const [preference, setPreference] = useState(true);
    const [statistics, setStatistics] = useState(true);



    const isChecked = (e) => {
        if (e.target.checked === true) {
            return true;
        }
        else {
            return false;
        }
    };

    const onChangeMarketing = (e) => {
        setMarketing(isChecked(e))
    };

    const onChangePreferences = (e) => {
        setPreference(isChecked(e))


    };

    const onChangeStatistics = (e) => {
        setStatistics(isChecked(e))

    };


    const onClick = () => {
        console.log("submit")
        Cookies.set('rcl_consent_given', true, { expires: 7, domain: SETTINGS.DOMAIN_NAME })
        Cookies.set('rcl_preferences_consent', preference, { expires: 7, domain: SETTINGS.DOMAIN_NAME })
        Cookies.set('rcl_statistics_consent', statistics, { expires: 7, domain: SETTINGS.DOMAIN_NAME })
        Cookies.set('rcl_marketing_consent', marketing, { expires: 7, domain: SETTINGS.DOMAIN_NAME })
        window.location.reload(); 
    };

    useEffect(() => {
       
    }, []);

    return (
        <div>
            <Modal show={!isAcconsentCookie} size="lg"  >
                <Modal.Body className="modal-body-cookie-policy">
                    <Form>
                        <div>
                            <p className="text">We & our technology partners ask you to consent to the use of cookies to store and access personal data on your device. By clicking below you are consenting to the use of this technology.</p>
                            <a href="/#/cookie-policy">Cookie Policy</a>
                            <br />
                        </div>
                        <Form.Check className="mt-4" inline disabled checked label="Necessary" type={type} />
                        <Form.Check inline defaultChecked="checked" label="Preferences" value={"Preferences"} type={type} onChange={onChangePreferences} />
                        <Form.Check inline defaultChecked="checked" label="Statistics" type={type} value={"Statistics"} onChange={onChangeStatistics} />
                        <Form.Check inline defaultChecked="checked" label="Marketing" value={"Marketing"} type={type} onChange={onChangeMarketing} />
                        <Button className="d-inline" variant="primary"  onClick={onClick}>Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal >
        </div>
    );
}

export default CookiePolicy;