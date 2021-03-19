import React , {useEffect,useState} from 'react';
import UpdatePassword from '../../component/updatePassword/UpdatePassword';
import {Col,Container,Row} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


const UserProfile = () => {

    const regionName = localStorage.getItem("userRegion")
    const handleRemoveRegion = () =>  {
        localStorage.removeItem("userRegion")
        window.location.reload()
    }

    return (
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col className="col-lg-4">
                    <h5 className="mt-5">Server</h5>
                    <input className="form-control " type="password " disabled  value={regionName} />
                    <Button className="form-control mb-5 mt-1 " onClick={handleRemoveRegion}>Change Region</Button>
                    <UpdatePassword/>
                </Col>
            </Row>
        </Container>

    );
};

export default UserProfile;