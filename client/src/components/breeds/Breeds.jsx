import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { getBreeds, getBreedByName, getTemperaments } from '../../actions/index';
import style from './Breeds.module.css';

function Breeds(props) {

    const [limit] = useState(8);
    const [offset, setOffset] = useState(0);
    const [filter, setFilter] = useState({
        option: 'temperament',
        value: 'none'
    });
    const [order, setOrder] = useState({
        option: 'name',
        value: 'ASC'
    });
    const [breedToSearch, setBreedToSearch] = useState('');

    useEffect(() => {
        if(breedToSearch) {
            props.getBreedByName(offset, order, filter, breedToSearch);
        } else {
            props.getBreeds(offset, order, filter);
        }
        props.getTemperaments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset, limit, filter, order, breedToSearch]);


    function showBreeds() {
        console.log(props.breeds);
        return (props.breeds.rows && props.breeds.rows.length > 0)
            ? props.breeds.rows.map( (breed, index) => 
            <div key={breed.id} className={style.card}>
                <img src={breed.image_url} alt={breed.name} className={style.cardImgTop}/>
                <div className={style.cardBody}>
                    <h3 className={style.cardTitle}>{breed.name}</h3>
                    {breed.temperaments.map( temperament => 
                        <p className={style.cardText} key={temperament.id}>{temperament.name}</p>
                    )}
                </div>
            </div>
            )
            : <div>
                <p>Loading breeds...</p>
              </div>
    }
    function showPagination() {
        let pageItems = [];
        if(props.breeds.count && props.breeds.count > 0) {
            for(let i=1; i <= Math.ceil(props.breeds.count/limit); i++) {
                pageItems.push(
                    <li className={style.pageItem} key={i}>
                        <NavLink to="breeds" className={style.pageLink} onClick={handleClick}>{i}</NavLink>
                    </li>);
            }
        }
        return pageItems;
    }
    function showTemperaments() {
        return (props.temperaments.rows && props.temperaments.rows.length > 0)
        ? props.temperaments.rows.map( (temperament, index) => <option 
            key={temperament.id}
            value={temperament.name}
        >   
            {temperament.name}
        </option>

        )
        : <option value="none">Loading breeds...</option>
    }

    function handleClick(e) {
        const page = e.target.childNodes[0].data;
        setOffset(page * limit - limit);
    }
    function handleSearch(e) {
        setBreedToSearch(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e);
    }
    function handleChangeFilter(e) {
        if(e.target.name === 'filterOption') {
            setFilter({
                ...filter,
                option: e.target.value
            });
        } else if(e.target.name === 'filterValue') {
            setFilter({
                ...filter,
                value: e.target.value
            });
        }
    }
    function handleChangeOrder(e) {
        if(e.target.name === 'orderOption') {
            setOrder({
                ...order,
                option: e.target.value
            });
        } else if(e.target.name === 'orderValue') {
            setOrder({
                ...order,
                value: e.target.value
            });
        }
    }

    return (
        <div className={style.container}>
            <form onSubmit={handleSubmit}>
                <label>Search: </label>
                <input type="text" name="search" id="search" onChange={handleSearch}/>
                <hr/>
                <label>Order: </label>
                <select name="orderOption" value={order.option} onChange={handleChangeOrder}>
                    <option value="name">name</option>
                    <option value="height_min">minimun height</option>
                    <option value="height_max">maximun height</option>
                    <option value="weight_min">minimun weight</option>
                    <option value="weight_max">maximun weight</option>
                </select>
                <select name="orderValue" value={order.value} onChange={handleChangeOrder}>
                    <option value="ASC">Ascendent</option>
                    <option value="DESC">Descendent</option>
                </select>
                <hr/>
                <label>Filter: </label>
                <select name="filterOption" value={filter.temperament} onChange={handleChangeFilter}>
                    <option value="temperament">Temperament</option>
                    <option value="breed">Breed</option>
                </select>
                <select name="filterValue" value={filter.temperament} onChange={handleChangeFilter}>
                    <option value="none"> - </option>
                    {showTemperaments()}
                </select>
                <hr/>
                {/* <input type="submit" value="Submit"/> */}
            </form>
            <div className={style.cards}>
                {showBreeds()}
            </div>
            <nav className={style.page}>
                <ul className={style.pagination}>
                    {showPagination()}
                </ul>
            </nav>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        breeds: state.breeds,
        temperaments: state.temperaments
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getBreeds, getBreedByName, getTemperaments}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Breeds);