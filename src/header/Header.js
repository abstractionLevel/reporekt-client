import React from 'react';
//components
import MyNavBar from '../navBar/Navbar';

import './header.scss';

const Header = (props) => {
    console.log("")
    const currentUser = props.user;
    return(
        <header className='mb-2'>
            <MyNavBar user={currentUser}/>
        </header>

    );

}

export default Header;
