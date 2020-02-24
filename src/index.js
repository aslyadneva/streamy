import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom'; 
import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware, compose } from 'redux'; 
import reduxThunk from 'redux-thunk'; 
 
import App from './components/App';
import reducers from './reducers'; 
import history from './history'; 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk))); 


ReactDOM.render(
<Provider store={store}>
  <Router history={history}>
    <App />
  </Router>
</Provider>, 
document.getElementById('root'));

