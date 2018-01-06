import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';

const Router = (
    <Provider store={store}>
        <App/>
    </Provider>
);

export default Router;
