import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

store.subscribe(() => {
    console.log('store changed', store.getState())
})

export default store;