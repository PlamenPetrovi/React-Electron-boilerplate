'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _history = require('history');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var syncHistoryWithStore = function syncHistoryWithStore(store, history) {
  var _store$getState = store.getState(),
      routing = _store$getState.routing;

  if (routing && routing.location) {
    history.replace(routing.location);
  }
};
var api_host_initialState = {
  title: "default",
  description: "default",
  price: 5.0,
  color: false,
  slide_show_of_previous_pictures: false,
  created_at: null,
  updated_at: null,
  static_background_image: null,
  print_logo_image: null
};
var initialState = { "api_host": api_host_initialState };
// const initialState = {"myuser":{},"routing":{},"api_host":{"id":7,"title":"Default"}};
var routerHistory = (0, _history.createMemoryHistory)();
var store = (0, _store2.default)(initialState, routerHistory);
console.log(store);
syncHistoryWithStore(store, routerHistory);

var rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(
    _reactRouterRedux.ConnectedRouter,
    { history: routerHistory },
    _react2.default.createElement(
      'div',
      { className: 'container' },
      _react2.default.createElement(_Header2.default, { history: routerHistory }),
      _routes2.default
    )
  )
), rootElement);
//# sourceMappingURL=app.js.map