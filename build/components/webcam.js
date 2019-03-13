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

var _reactWebcam = require('react-webcam');

var _reactWebcam2 = _interopRequireDefault(_reactWebcam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WebcamCapture = function (_React$Component) {
  (0, _inherits3.default)(WebcamCapture, _React$Component);

  function WebcamCapture() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, WebcamCapture);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = WebcamCapture.__proto__ || (0, _getPrototypeOf2.default)(WebcamCapture)).call.apply(_ref, [this].concat(args))), _this), _this.setRef = function (webcam) {
      _this.webcam = webcam;
    }, _this.capture = function () {
      var imageSrc = _this.webcam.getScreenshot();
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(WebcamCapture, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'camera-enter' },
        _react2.default.createElement(
          'div',
          { style: { zIndex: -1 } },
          _react2.default.createElement(_reactWebcam2.default, {
            audio: false,
            ref: this.setRef,
            screenshotFormat: 'image/jpeg',
            width: '100%',
            height: '100%'
          })
        ),
        _react2.default.createElement(
          'div',
          { style: { position: "absolute", top: "50%", color: "white", width: "100%", textAlign: "center" } },
          _react2.default.createElement(
            'h1',
            null,
            'Ok! Get Ready ...'
          )
        ),
        _react2.default.createElement(
          'button',
          { onClick: this.capture },
          'Capture photo'
        )
      );
    }
  }]);
  return WebcamCapture;
}(_react2.default.Component);

exports.default = WebcamCapture;
//# sourceMappingURL=webcam.js.map