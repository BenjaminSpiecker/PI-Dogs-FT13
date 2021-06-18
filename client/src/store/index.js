import {createStore, applyMiddleware, compose} from 'redux';
import reducer from '../reducers/index';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const composedEnhancer = compose(applyMiddleware(thunk), composeWithDevTools());

const store = createStore(reducer, composedEnhancer);

export default store;