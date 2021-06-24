import React from "react";
import Card from '../card/Card';
import { NavLink } from "react-router-dom";
import style from "./Cards.module.css";

function Cards(props) {
  return <div className={style.cards}>
    {props.breeds.rows && props.breeds.rows.length > 0 ? (
    props.breeds.rows.map((breed) => (
      <NavLink to={'/breeds/' + breed.id} key={breed.id}>
        <Card breed={breed} key={breed.id} />
      </NavLink>
    ))
  ) : (
    <div>
      <p>Loading breeds...</p>
    </div>
  )}
  </div>
  
}

export default Cards;
