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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _reactBootstrap = require('react-bootstrap');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Start = (_temp = _class = function (_Component) {
	(0, _inherits3.default)(Start, _Component);

	function Start(props) {
		(0, _classCallCheck3.default)(this, Start);
		return (0, _possibleConstructorReturn3.default)(this, (Start.__proto__ || (0, _getPrototypeOf2.default)(Start)).call(this, props));
	}

	(0, _createClass3.default)(Start, [{
		key: 'ConfigureOwnState',
		value: function ConfigureOwnState(results) {
			if (results.updated_at === undefined) return;
			if (this.state.api_host.updated_at != results.updated_at) {
				this.setState({ api_host: results });
				console.log("SDJFLSDJF:LSDKJF:LSDKJF: => ", this.state.api_host);
				this.saveToLocal();
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var mycomponent = this;
			// 	this.getInitialState();
			var obj = {
				method: 'Get',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Token token=8d702b11f4b1fc52d06b90b49750b2217d57831c1b23b25561'
				} };
			fetch('https://photo-booth-201515.appspot.com/api/v1/photo_booth', obj).then(function (res) {
				return res.json();
			}).then(function (resjson) {
				if (resjson.updated_at === undefined) return;
				if (mycomponent.props.api_host.updated_at != resjson.updated_at) {
					mycomponent.props.onUpdate(resjson);
				}

				return resjson;
			});
		}
	}, {
		key: 'handleStartPhotoBooth',
		value: function handleStartPhotoBooth(e) {
			this.props.history.push('/photobooth');
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						_reactBootstrap.Button,
						{ onClick: this.handleStartPhotoBooth.bind(this) },
						' Photo Booth '
					),
					_react2.default.createElement(
						_reactRouterDom.Link,
						{ to: '/boomerang' },
						_react2.default.createElement(
							_reactBootstrap.Button,
							null,
							' Boomerang '
						),
						' '
					)
				)
			);
		}
	}]);
	return Start;
}(_react.Component), _class.propTypes = {
	onUpdate: _propTypes2.default.func.isRequired
}, _temp);
exports.default = Start;
//# sourceMappingURL=Start.js.map