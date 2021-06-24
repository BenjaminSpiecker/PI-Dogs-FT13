import React, { useState, useEffect } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getTemperaments } from "../../actions/index";
import { postBreed } from '../../actions/index';
import style from './NewBreed.module.css';


export function NewActivity(props) {

  const [input, setInput] = useState({
    name: '',
    height_max: 0,
    height_min: 0, 
    weight_max: 0, 
    weight_min: 0,
    life_span: 0,
    temperaments: []
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validateForm({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    if( !errors.name && !errors.height_max
        && !errors.height_min && !errors.weight_max
        && !errors.weight_min && !errors.life_span) {
      console.log("entro el if");
      postBreed(input); 
    } else {
      alert("error!")
    }
    setInput({
      name: '',
      height_max: 0,
      height_min: 0, 
      weight_max: 0, 
      weight_min: 0,
      life_span: 0,
      temperaments: []
    })
  }

  function validateForm(input) {
    let errors = {};
    if (!input.name) {
      errors.name = 'Name is required';
    } else if (!/[a-zA-Z\s]$/.test(input.name)) {
      errors.name = 'Name is invalid';
    }
    if (!input.height_max) {
      errors.height_max = 'maximum height is required';
    } else if(!/^[1-9]\d*$/.test(input.height_max)) {
      errors.height_max = 'maximum height must be greater than zero';
    }
    if (!input.height_min) {
      errors.height_min = 'minimum height is required';
    } else if(!/^[1-9]\d*$/.test(input.height_min)) {
      errors.height_min = 'minimum height must be greater than zero';
    }
    if (!input.height_max) {
      errors.weight_max = 'maximum weight is required';
    } else if(!/^[1-9]\d*$/.test(input.weight_max)) {
      errors.weight_max = 'maximum weight must be greater than zero';
    }
    if (!input.weight_min) {
      errors.weight_min = 'minimum weight  is required';
    } else if(!/^[1-9]\d*$/.test(input.weight_min)) {
      errors.weight_min = 'minimum weight must be greater than zero';
    }
    if (!input.life_span) {
      errors.life_span = 'life span is required';
    } else if(!/^[1-9]\d*$/.test(input.life_span)) {
      errors.life_span = 'life span must be greater than zero';
    }
    if (input.temperaments.length <= 0) {
      errors.temperaments = 'select at least one temperament';
    }

    return errors;
  }

  function showTemperaments() {
    return props.temperaments.rows && props.temperaments.rows.length > 0 ? (
      props.temperaments.rows.map((temperament, index) => (
        <option key={temperament.id} value={temperament.name}>
          {temperament.name}
        </option>
      ))
    ) : (
      <option value="">Loading breeds...</option>
    );
  }

  function showTemperamentsSelected() {
    return props.temperaments.rows && props.temperaments.rows.length > 0 ? (
      input.temperaments.map((temperament, index) => (
        <span key={index} className={style.badge}>{temperament}</span>
      ))
    ) : (
      <span></span>
    )
  }

  function selectedTemperament(e) {
    if(!input.temperaments.includes(e.target.value) && e.target.value) {
      input.temperaments.push(e.target.value);
      setErrors(validateForm({
        ...input,
        temperaments: input.temperaments
      }))
    }
  }

  useEffect(() => {
    props.getTemperaments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={style.container}>
      <h1>Create new Breed</h1>
      <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
        <div className={style.input}>
          <label className={style.formLabel} htmlFor="name">Name</label>
          <input className={style.formControl} type="text" name="name" value={input.name} 
          onChange={(e) => handleChange(e)} />
          { errors.name && (<span className={style.formText}>{errors.name}</span>)}
        </div>
        
        <div className={style.input}>
          <label className={style.formLabel} htmlFor="height_max">Maximun Height</label>
          <input className={style.formControl} type="number" name="height_max" value={input.height_max} 
          onChange={(e) => handleChange(e)} />
          { errors.height_max && (<span className={style.formText}>{errors.height_max}</span>)}
        </div>

        <div className={style.input}>
          <label className={style.formLabel} htmlFor="height_min">Minimun Height</label>
          <input className={style.formControl} type="number" name="height_min" value={input.height_min} 
          onChange={(e) => handleChange(e)} />
          { errors.height_min && (<span className={style.formText}>{errors.height_min}</span>)}
        </div>
        
        <div className={style.input}>
          <label className={style.formLabel} htmlFor="weight_max">Maximun Weight</label>
          <input className={style.formControl} type="number" name="weight_max" value={input.weight_max} 
          onChange={(e) => handleChange(e)} />
          { errors.weight_max && (<span className={style.formText}>{errors.weight_max}</span>)}
        </div>

        <div className={style.input}>
          <label className={style.formLabel} htmlFor="weight_min">Minimun Weight</label>
          <input className={style.formControl} type="number" name="weight_min" id="" value={input.weight_min} 
          onChange={(e) => handleChange(e)} />
          { errors.weight_min && (<span className={style.formText}>{errors.weight_min}</span>)}
        </div>

        <div className={style.input}>
          <label className={style.formLabel} htmlFor="life_span">Life span</label>
          <input className={style.formControl} type="number" name="life_span" id="" value={input.life_span} 
          onChange={(e) => handleChange(e)} />
          { errors.life_span && (<span className={style.formText}>{errors.life_span}</span>)}
        </div>

        <div className={style.input}>
          <label className={style.formLabel} htmlFor="temperaments">Temperaments</label>
          <select className={style.formControl} name="temperaments" onClick={(e) => selectedTemperament(e)}>
            <option value="">-</option>
            {showTemperaments()}
          </select>
          { errors.temperaments && (<span className={style.formText}>{errors.temperaments}</span>)}
        </div>

        <div className={style.temperaments}>
          {showTemperamentsSelected()}
        </div>

        <input className={style.btn} type="submit" value="Submit"/>
      </form>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    temperaments: state.temperaments,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getTemperaments },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NewActivity);
