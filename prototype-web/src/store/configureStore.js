// import mapReducer from '../reducers/mapReducer'
import rootReducer from '../reducers'
import {createStore} from 'redux'

const configureStore = (state) => {
  return createStore(rootReducer, state);
};

export default configureStore;
