import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import ImageSettings from '../assets/img/settings.png';
import ImageLogin from '../assets/img/login.png';
import IMAGES from '../utility/regionImage';
import SearchImage from '../assets/img/search2.png';
import { Link, useHistory } from 'react-router-dom';



//service
import AuthService from '../service/auth.service';

import './navbar.scss';

const MyNavBar = (props) => {

    let history = useHistory()
    const acconsentCookie = Cookies.get("rcl_consent_given");

    const userRegion = localStorage.getItem("userRegion")

    const user = props.user;
    const [isUser, setIsUser] = useState(false);
    const [searchPlayer, setSearchPlayer] = useState("")
    const [showRegionModal, setShowRegionModal] = useState(false)
    const [showSearchPlayer, setShowSearchPlayer] = useState(false)
    const [navExpanded, setNavExpanded] = useState(false)

    const onToggleNavExpanded = (expanded) => {
        setNavExpanded(expanded)
    };

    const onSelectCloseNav = () => {
        setNavExpanded(false);
    }

    const logOut = () => {
        AuthService.logout();
        history.push("/");
        window.location.reload();

    };

    const onClickOpenRegionModal = () => {
        setShowRegionModal(true)
    }

    const onHideRegionModal = () => {
        setShowRegionModal(false)
        window.location.reload();
    }
    const onClickRegionModal = e => {
        localStorage.setItem("userRegion", e.target.value)
        setShowRegionModal(false)
        window.location.reload();
    }

    const onChangeSearchPlayer = (e) => {
        setSearchPlayer(e.target.value)
    };

    const onClickSearchPlayer = () => {
        const url = encodeURI('player/' + searchPlayer)
        setShowSearchPlayer(false)
        setSearchPlayer("")
        history.push(url);
    };

    const onClickCloseSearchPlayer = () => {
        setShowSearchPlayer(false)
    }

    const toggleButtonSearchPlayer = () => {
        setShowSearchPlayer(true)
    }

    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
      }
    const images = importAll(require.context('../assets/img/region/', false, /\.(png|jpe?g|svg)$/));



    const imgSetting = <img className="img-settings mt-2" src={ImageSettings} width='42px' height='42px'></img>
    const imgLogin = <img className="img-settings mt-2" src={ImageLogin} width='48px' height='48px'></img>

    const CustomToggleSettings = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={e => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {imgSetting}
            {children}
        </a>
    ));

    useEffect(() => {
        if (user) {
            setIsUser(true)
        }


    }, [user]);

    const CustomToggleProfile = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={e => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {imgLogin}
            {children}
        </a>
    ));


    useEffect(() => {
        if (user) {
            setIsUser(true)
        }
        if (!userRegion && acconsentCookie != undefined) {
            setShowRegionModal(true)
        }
      
        console.log("dio cane")
    }, [user]);


    return (
        <Navbar expand="lg" onToggle={onToggleNavExpanded} expanded={navExpanded}>
            <div className='d-flex inline'>
                <Navbar.Brand href={"/"} className="d-none d-md-block "><h2 className="d-inline font-weight-bold title-url">ReporRekt</h2><p className="d-inline font-weight-bold">.com</p></Navbar.Brand>
                <Navbar.Brand href={"/"} className="d-none d-sm-block d-md-none d-block d-sm-none mt-2"><h5 className="d-inline font-weight-bold">ReporRekt</h5><p className="d-inline font-weight-bold">.com</p></Navbar.Brand>
                <Button variant="outline-success button-region d-none d-md-block" onClick={onClickOpenRegionModal} >{userRegion}</Button>
                <Button variant="outline-success btn-sm d-none d-sm-block d-md-none d-block d-sm-none" onClick={onClickOpenRegionModal} >{userRegion}</Button>
            </div>
            <img className="img-search d-none d-sm-block d-md-none d-block d-sm-none mt-2  ml-5" src={SearchImage} onClick={toggleButtonSearchPlayer} width='42px' height='42px'></img>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {showSearchPlayer && (<div className='search-player-res'>
                <input type="text" onChange={onChangeSearchPlayer} placeholder="search a player..." value={searchPlayer} className="search-d pl-2" />)(
                <button type="button" class="close-search mr-4 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={onClickCloseSearchPlayer}>
                        <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"></path>
                    </svg>
                </button>
                <img src={SearchImage} with="32px" height="32px" className="imgSearch-responsive mr-3" onClick={onClickSearchPlayer}></img>
            </div>)}
            <Navbar.Collapse id="responsive-navbar-nav" className="mr-2" >
                <Form inline className='ml-auto pr-5 d-none d-md-block' onSubmit={e => e.preventDefault()}>
                    <input type="text" onChange={onChangeSearchPlayer} placeholder="Search" value={searchPlayer} className=" form-control" />
                    <Button variant="outline-success " onClick={onClickSearchPlayer} >Search</Button>
                </Form>
                <Nav className="pl-2"   >
                    <Link className="mr-3 mt-3" onClick={onSelectCloseNav} to={"/do/report"}>Report</Link>
                    {isUser ? (<div><div className="row d-none d-lg-block">
                        <Dropdown drop="left" id='dropdown-button-drop-left'>
                            <Dropdown.Toggle as={CustomToggleSettings} >
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item ><Link to={"/profile"}>Profile</Link></Dropdown.Item>
                                <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
                                <Dropdown.Item ><Link to={"/help-center"}>Help-Center</Link></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                        <div className="d-none d-sm-block d-md-none d-block d-sm-none" >
                            <Dropdown drop="left" id='dropdown-button-drop-left'>
                                <Link onClick={onSelectCloseNav} to={"/profile"}>Profile</Link>
                                <br />
                                <Link onClick={onSelectCloseNav} to={"/"} onClick={logOut}>Logout</Link>
                                <br />
                                <Link onClick={onSelectCloseNav} to={"/help-center"}>Help-Center</Link>
                                <br />
                            </Dropdown>

                        </div></div>)
                        : (
                            <div>
                                <div className="d-none d-sm-block">
                                    <Dropdown drop="left" id='dropdown-button-drop-left '>
                                        <Dropdown.Toggle as={CustomToggleProfile} >
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item ><Link to={"/register"}>SignUp</Link></Dropdown.Item>
                                            <Dropdown.Item ><Link to={"/login"}>Login</Link></Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div className=" d-none d-sm-block d-md-none d-block d-sm-none">
                                    <Link className="p-0" onClick={onSelectCloseNav} to={"/register"}> SignUp </Link>
                                    <br/>
                                    <Link className="p-0" onClick={onSelectCloseNav} to={"/login"}> Login </Link>
                                </div>
                            </div>
                        )}
                        
                </Nav>
            </Navbar.Collapse>
            <Modal show={showRegionModal} size="sm" onHide={onHideRegionModal} >
                <Modal.Body>
                    <div>
                        <div className="d-flex justify-content-center">
                            <h4 className="mb-1 ">Select Region</h4>
                        </div>
                        {Object.entries(IMAGES).map(([key, value]) =>
                            <div>
                                <div className="d-inline"></div>
                                <div className="d-inline">
                                    <Button variant="outline-dark" className="mb-2" size="sm" value={key} block onClick={onClickRegionModal}>
                                        <img className="float-left" src={value}/>
                                        {key}
                                    </Button>
                                </div>
                            </div>
                        )}
                        <br />
                    </div>
                </Modal.Body>
            </Modal>
        </Navbar>
    );

}

export default MyNavBar;
