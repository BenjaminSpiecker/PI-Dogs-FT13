import axios from 'axios';

// export function addMovieFavorite(payload) {
//   return { type: "ADD_MOVIE_FAVORITE", payload };
// }

export function getBreeds(offset, order, filter) {
 
  const params = 'offset=' + offset 
    + '&orderValue=' + order.value
    + '&orderOption=' + order.option
    + '&filterValue=' + filter.value
    + '&filterOption=' + filter.option;

  return function(dispatch) {

    return axios.get(`http://localhost:3001/dogs?${params}`)
      .then(response => response.data)
      .then(data => {
        dispatch({ type: "GET_BREEDS", payload: data });
      })
      .catch(err => console.log(err));
  };
}

export function getBreedByName(offset, order, filter, name) {

  return function(dispatch) {

    const params = 'offset=' + offset 
      + '&orderValue=' + order.value
      + '&orderOption=' + order.option
      + '&filterValue=' + filter.value
      + '&filterOption=' + filter.option
      + '&name=' + name;

    return axios.get(`http://localhost:3001/dogs?${params}`)
      .then(response => response.data)
      .then(data => {
        dispatch({ type: "GET_BREED_BY_NAME", payload: data});
      })
      .catch(err => console.log(err));
  }
}

export function getTemperaments() {
 
  return function(dispatch) {

    return axios.get(`http://localhost:3001/temperaments`)
      .then(response => response.data)
      .then(data => {
        dispatch({ type: "GET_TEMPERAMENTS", payload: data });
      })
      .catch(err => console.log(err));
  };
}

const actions = {getBreeds, getBreedByName, getTemperaments};
export default actions;