'use strict';

Object.defineProperty(exports, "__esModule", {
				value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _LoginPage = require('./containers/LoginPage');

var _LoginPage2 = _interopRequireDefault(_LoginPage);

var _LoggedInPage = require('./containers/LoggedInPage');

var _LoggedInPage2 = _interopRequireDefault(_LoggedInPage);

var _Start = require('./components/Start');

var _Start2 = _interopRequireDefault(_Start);

var _StartPage = require('./containers/StartPage');

var _StartPage2 = _interopRequireDefault(_StartPage);

var _photobooth = require('./components/photobooth');

var _photobooth2 = _interopRequireDefault(_photobooth);

var _boomerang = require('./components/boomerang');

var _boomerang2 = _interopRequireDefault(_boomerang);

var _BoomerangTakePage = require('./containers/BoomerangTakePage');

var _BoomerangTakePage2 = _interopRequireDefault(_BoomerangTakePage);

var _PhotoTakePage = require('./containers/PhotoTakePage');

var _PhotoTakePage2 = _interopRequireDefault(_PhotoTakePage);

var _ProcessingPage = require('./containers/ProcessingPage');

var _ProcessingPage2 = _interopRequireDefault(_ProcessingPage);

var _BoomerangPlayerPage = require('./containers/BoomerangPlayerPage');

var _BoomerangPlayerPage2 = _interopRequireDefault(_BoomerangPlayerPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
				'div',
				{ className: 'row' },
				_react2.default.createElement(
								_reactRouter.Switch,
								null,
								_react2.default.createElement(_reactRouter.Route, { exact: true, path: '/', component: _LoginPage2.default }),
								_react2.default.createElement(_reactRouter.Route, { exact: true, path: '/loggedin', component: _LoggedInPage2.default }),
								_react2.default.createElement(_reactRouter.Route, { exact: true, path: '/start', component: _StartPage2.default }),
								_react2.default.createElement(_reactRouter.Route, { exact: true, path: '/photobooth', component: _photobooth2.default }),
								_react2.default.createElement(_reactRouter.Route, { exact: true, path: '/photobooth/take', component: _PhotoTakePage2.default }),
								_react2.default.createElement(_reactRouter.Route, { exact: true, path: '/photobooth/processing', component: _ProcessingPage2.default }),
								_react2.default.createElement(_reactRouter.Route, { exact: true, path: '/boomerang', component: _boomerang2.default }),
								_react2.default.createElement(_reactRouter.Route, { exact: true, path: '/boomerang/take', component: _BoomerangTakePage2.default }),
								_react2.default.createElement(_reactRouter.Route, { exact: true, path: '/boomerang/player', component: _BoomerangPlayerPage2.default })
				)
);
//# sourceMappingURL=routes.js.map