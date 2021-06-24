import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getBreeds,
  getBreedByName,
  getTemperaments,
} from "../../actions/index";
import Cards from '../cards/Cards';
import { NavLink } from "react-router-dom";
import style from "./Breeds.module.css";

function Breeds(props) {

  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState({
    option: "temperament",
    value: "none",
  });
  const [order, setOrder] = useState({
    option: "name",
    value: "ASC",
  });
  const [breedToSearch, setBreedToSearch] = useState("");

  useEffect(() => {
    if (breedToSearch) {
      props.getBreedByName(offset, order, filter, breedToSearch);
    } else {
      props.getBreeds(offset, order, filter);
    }
    props.getTemperaments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, props.limit, filter, order, breedToSearch]);

  function showTemperaments() {
    return props.temperaments.rows && props.temperaments.rows.length > 0 ? (
      props.temperaments.rows.map((temperament, index) => (
        <option key={temperament.id} value={temperament.name}>
          {temperament.name}
        </option>
      ))
    ) : (
      <option value="none">Loading breeds...</option>
    );
  }

  function showPagination() {
    let pageItems = [];
    if (props.breeds.count && props.breeds.count > 0) {
      for (let i = 1; i <= Math.ceil(props.breeds.count / props.limit); i++) {
        pageItems.push(
          <li className={style.pageItem} key={i}>
            <NavLink
              to="breeds"
              className={style.pageLink}
              onClick={handleClick}
            >
              {i}
            </NavLink>
          </li>
        );
      }
    }
    return pageItems;
  }

  function handleClick(e) {
    const page = e.target.childNodes[0].data;
    setOffset(page * props.limit - props.limit);
  }

  function handleSearch(e) {
    setBreedToSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
  }
  function handleChangeFilter(e) {
    if (e.target.name === "filterOption") {
      setFilter({
        ...filter,
        option: e.target.value,
      });
    } else if (e.target.name === "filterValue") {
      setFilter({
        ...filter,
        value: e.target.value,
      });
    }
  }
  function handleChangeOrder(e) {
    if (e.target.name === "orderOption") {
      setOrder({
        ...order,
        option: e.target.value,
      });
    } else if (e.target.name === "orderValue") {
      setOrder({
        ...order,
        value: e.target.value,
      });
    }
  }

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <label>Search: </label>
        <input type="text" name="search" id="search" onChange={handleSearch} />
        <hr />
        <label>Order: </label>
        <select
          name="orderOption"
          value={order.option}
          onChange={handleChangeOrder}
        >
          <option value="name">name</option>
          <option value="height_min">minimun height</option>
          <option value="height_max">maximun height</option>
          <option value="weight_min">minimun weight</option>
          <option value="weight_max">maximun weight</option>
        </select>
        <select
          name="orderValue"
          value={order.value}
          onChange={handleChangeOrder}
        >
          <option value="ASC">Ascendent</option>
          <option value="DESC">Descendent</option>
        </select>
        <hr />
        <label>Filter: </label>
        <select
          name="filterOption"
          value={filter.temperament}
          onChange={handleChangeFilter}
        >
          <option value="temperament">Temperament</option>
          <option value="breed">Breed</option>
        </select>
        <select
          name="filterValue"
          value={filter.temperament}
          onChange={handleChangeFilter}
        >
          <option value="none"> - </option>
          {showTemperaments()}
        </select>
        <hr />
        {/* <input type="submit" value="Submit"/> */}
      </form>
      
      <Cards breeds={props.breeds} limit={props.limit}/>

      <nav className={style.page}>
        <ul className={style.pagination}>{showPagination()}</ul>
      </nav>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    breeds: state.breeds,
    temperaments: state.temperaments,
    limit: state.limit,
    offset: state.offset
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { getBreeds, getBreedByName, getTemperaments },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Breeds);
