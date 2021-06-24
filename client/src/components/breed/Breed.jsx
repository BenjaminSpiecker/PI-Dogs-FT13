import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getBreedById} from '../../actions/index';
import style from './Breed.module.css';

function Breed(props) {

    useEffect(() => {
        props.getBreedById(props.id);
    }, [props.id]);

    return (
        <div className={style.container}>
            <img className={style.image} src={props.breed.image_url} alt={props.breed.name} />
            <h1>{props.breed.name}</h1>
            <ul className="list">
                <li className="item">Maximun height: {props.breed.height_max}</li>
                <li className="item">Minimun height: {props.breed.height_min}</li>
                <li className="item">Maximun weight: {props.breed.weight_max}</li>
                <li className="item">Minimun weight: {props.breed.weight_min}</li>
                <li className="item">Maximun life span: {props.breed.life_span_max}</li>
                <li className="item">Minimun life span:{props.breed.life_span_min}</li>
            </ul>

        </div>
    )
}


function mapStateToProps(state) {
    return {
      breed: state.breed,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      { getBreedById },
      dispatch
    );
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Breed);