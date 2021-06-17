import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Nav.module.css';

function Nav() {
    return (
        <nav className={style.navbar}>
            <h1 className={style.logo}>DogsApp</h1>
            <ul className={style.navbarNav }>
                <li className={style.navItem}>
                    <NavLink to="/" className={style.navLink} activeClassName="activo">Home</NavLink>
                    </li>
                <li className={style.navItem}>
                    <NavLink to="/breeds" className={style.navLink} activeClassName="activo">Breeds</NavLink>
                    </li>
                <li className={style.navItem}>
                    <NavLink to="/new-activity" className={style.navLink} activeClassName="activo">New Breeds</NavLink>
                    </li>
            </ul>
        </nav>
    )
}

export default Nav;
