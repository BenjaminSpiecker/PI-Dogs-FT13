import React from 'react';
import style from './Home.module.css';
import { NavLink } from 'react-router-dom';


export default function Home() {
    return (
        <div className={style.container}>
            <div className={style.jumbotron}>
            </div>
            <div className={style.contents}>
                <h1 className={style.title}>API Dogs</h1>
                <h2 className={style.text}>look for breeds dogs and their characteristics.</h2>
                <button className={style.button}><NavLink to="/breeds">Start</NavLink></button>
            </div>
        </div>
    )
}
