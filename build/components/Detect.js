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

var _reactRouterDom = require('react-router-dom');

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Detect = function (_Component) {
	(0, _inherits3.default)(Detect, _Component);

	function Detect() {
		(0, _classCallCheck3.default)(this, Detect);
		return (0, _possibleConstructorReturn3.default)(this, (Detect.__proto__ || (0, _getPrototypeOf2.default)(Detect)).apply(this, arguments));
	}

	(0, _createClass3.default)(Detect, [{
		key: 'IsCameraExists',
		value: function IsCameraExists() {

			navigator.getMedia({ video: true }, function () {
				// webcam is available
				alert('YES');
			}, function () {
				// webcam is not available
			});
			navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
				alert('connected to the camera');
			}).catch(function () {
				alert('could not connect camera');
			});
		}
	}, {
		key: 'IsPrinterExists',
		value: function IsPrinterExists() {
			var printer = require("node-thermal-printer");
			printer.init({
				type: 'epson',
				interface: '/dev/usb/lp0'
			});
			printer.isPrinterConnected(function (isConnected) {
				if (isConnected) {
					alert("Printer Connected");
				} else {
					alert("Printer Not Connected");
				}
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_reactBootstrap.ButtonToolbar,
					null,
					_react2.default.createElement(
						_reactBootstrap.Button,
						{ onClick: function onClick() {
								return _this2.IsCameraExists();
							} },
						'Detect Camera'
					),
					_react2.default.createElement(
						_reactBootstrap.Button,
						{ onClick: function onClick() {
								return _this2.IsPrinterExists();
							} },
						'Detect Printer'
					),
					_react2.default.createElement(
						_reactRouterDom.Link,
						{ to: '/start' },
						_react2.default.createElement(
							_reactBootstrap.Button,
							null,
							'Main Page'
						)
					)
				)
			);
		}
	}]);
	return Detect;
}(_react.Component);

exports.default = Detect;
//# sourceMappingURL=Detect.js.map