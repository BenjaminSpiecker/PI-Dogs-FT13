import React from "react";
import style from './Card.module.css';

function Card(props) {
  return <div key={props.breed.id} className={style.card}>
    <img
      src={props.breed.image_url}
      alt={props.breed.name}
      className={style.cardImgTop}
    />
    <div className={style.cardBody}>
      <h3 className={style.cardTitle}>{props.breed.name}</h3>
      {props.breed.temperaments.map((temperament) => (
        <p className={style.cardText} key={temperament.id}>
          {temperament.name}
        </p>
      ))}
    </div>
  </div>
}

export default Card;
