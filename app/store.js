import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerMiddleware, routerReducer as routing, push } from 'react-router-redux';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';

import myuser from './reducers/user';
import api_host from './reducers/api_host'
import photo from './reducers/photo'
import boomerang from './reducers/boomerang'
import { reducer as reduxFormReducer } from 'redux-form';


import userActions from './actions/user';
import api_actions from './actions/api_host';
import photo_actions from './actions/photo';
import boomerang_actions from './actions/boomerang'

export default function configureStore(initialState, routerHistory) {
  const router = routerMiddleware(routerHistory);

  const actionCreators = {
    ...userActions,
    push,
    ...api_actions,
    ...photo_actions,
    ...boomerang_actions
  };

  const reducers = {
    myuser,
    api_host,
    photo ,
    boomerang,
    reduxFormReducer
  };

  const middlewares = [ thunk, router ];

  const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if(process.env.NODE_ENV === 'development' && compose_) {
      return compose_({ actionCreators });
    }
    return compose;
  })();

  const enhancer = composeEnhancers(applyMiddleware(...middlewares), persistState());
  const rootReducer = combineReducers(reducers);

  return createStore(rootReducer, initialState, enhancer);
}
