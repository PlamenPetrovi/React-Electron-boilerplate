'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = configureStore;

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _reduxLocalstorage = require('redux-localstorage');

var _reduxLocalstorage2 = _interopRequireDefault(_reduxLocalstorage);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _user = require('./reducers/user');

var _user2 = _interopRequireDefault(_user);

var _api_host = require('./reducers/api_host');

var _api_host2 = _interopRequireDefault(_api_host);

var _photo = require('./reducers/photo');

var _photo2 = _interopRequireDefault(_photo);

var _boomerang = require('./reducers/boomerang');

var _boomerang2 = _interopRequireDefault(_boomerang);

var _reduxForm = require('redux-form');

var _user3 = require('./actions/user');

var _user4 = _interopRequireDefault(_user3);

var _api_host3 = require('./actions/api_host');

var _api_host4 = _interopRequireDefault(_api_host3);

var _photo3 = require('./actions/photo');

var _photo4 = _interopRequireDefault(_photo3);

var _boomerang3 = require('./actions/boomerang');

var _boomerang4 = _interopRequireDefault(_boomerang3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore(initialState, routerHistory) {
  var router = (0, _reactRouterRedux.routerMiddleware)(routerHistory);

  var actionCreators = (0, _extends3.default)({}, _user4.default, {
    push: _reactRouterRedux.push
  }, _api_host4.default, _photo4.default, _boomerang4.default);

  var reducers = {
    myuser: _user2.default,
    api_host: _api_host2.default,
    photo: _photo2.default,
    boomerang: _boomerang2.default,
    reduxFormReducer: _reduxForm.reducer
  };

  var middlewares = [_reduxThunk2.default, router];

  var composeEnhancers = function () {
    var compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (process.env.NODE_ENV === 'development' && compose_) {
      return compose_({ actionCreators: actionCreators });
    }
    return _redux.compose;
  }();

  var enhancer = composeEnhancers(_redux.applyMiddleware.apply(undefined, middlewares), (0, _reduxLocalstorage2.default)());
  var rootReducer = (0, _redux.combineReducers)(reducers);

  return (0, _redux.createStore)(rootReducer, initialState, enhancer);
}
//# sourceMappingURL=store.js.map