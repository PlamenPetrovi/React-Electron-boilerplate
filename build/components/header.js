'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function (_Component) {
	(0, _inherits3.default)(Header, _Component);

	function Header() {
		(0, _classCallCheck3.default)(this, Header);
		return (0, _possibleConstructorReturn3.default)(this, (Header.__proto__ || (0, _getPrototypeOf2.default)(Header)).apply(this, arguments));
	}

	(0, _createClass3.default)(Header, [{
		key: 'GoBack',
		value: function GoBack() {
			this.props.history.goBack();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				'div',
				{ className: 'row' },
				_react2.default.createElement(
					_reactBootstrap.Navbar,
					{ inverse: true, collapseOnSelect: true },
					_react2.default.createElement(
						_reactBootstrap.Navbar.Header,
						null,
						_react2.default.createElement(
							_reactBootstrap.Navbar.Brand,
							null,
							_react2.default.createElement(
								'a',
								{ href: '#brand' },
								'PHOTOBOOTH'
							)
						),
						_react2.default.createElement(_reactBootstrap.Navbar.Toggle, null)
					),
					_react2.default.createElement(
						_reactBootstrap.Navbar.Collapse,
						null,
						_react2.default.createElement(
							_reactBootstrap.Nav,
							{ pullRight: true },
							_react2.default.createElement(_reactBootstrap.NavItem, { eventKey: 1, href: '#' }),
							_react2.default.createElement(
								_reactBootstrap.NavItem,
								{ eventKey: 2, href: '#', onClick: function onClick() {
										return _this2.GoBack();
									} },
								'Go Back'
							)
						)
					)
				)
			);
		}
	}]);
	return Header;
}(_react.Component);

exports.default = Header;
//# sourceMappingURL=Header.js.map