const initialState = {
    breeds: [],
    
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case 'GET_BREEDS':
            return {
                ...state,
                breeds: action.payload
            };
        default:
            return state;
    }
}