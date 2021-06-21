const initialState = {
    temperaments: [],
    breeds: [],
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case 'GET_BREEDS':
            return {
                ...state,
                breeds: action.payload
            };
        case 'GET_BREED_BY_NAME':
            return {
                ...state,
                breeds: action.payload
            };
        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            };
        default:
            return state;
    }
}