import React, {useContext} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = (event) => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    }

    return (
        <nav>
            <div className="nav-wrapper blue-grey darken-2" style={{ padding: "0 2rem"}}>
                <a href="/" className="brand-logo">Link Shortener</a>
                <ul id='nav-mobile' className="right hide-on-med-and-down">
                    <li><NavLink to='/create'>Create</NavLink></li>
                    <li><NavLink to='/links'>Your Links</NavLink></li>
                    <li><a href='/' onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;