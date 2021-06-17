import axios from 'axios';

export function addMovieFavorite(payload) {
  return { type: "ADD_MOVIE_FAVORITE", payload };
}

export function getBreeds(offset, order) {
  const {value, option} = order;
  return function(dispatch) {
    
    const params = 'offset=' + offset 
      + '&orderValue=' + value
      + '&orderOption=' + option;

    return axios.get(`http://localhost:3001/dogs?${params}`)
      .then(response => response.data)
      .then(data => {
        dispatch({ type: "GET_BREEDS", payload: data });
      })
      .catch(err => console.log(err));
  };
}
// ?limit=${limit}&offset=${offset}
// &continent=${filter.continent}&orderName=${order.name}&orderPopulation=${order.population}

const actions = {getBreeds};
export default actions;