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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Boomerang = function (_Component) {
  (0, _inherits3.default)(Boomerang, _Component);

  function Boomerang() {
    (0, _classCallCheck3.default)(this, Boomerang);
    return (0, _possibleConstructorReturn3.default)(this, (Boomerang.__proto__ || (0, _getPrototypeOf2.default)(Boomerang)).apply(this, arguments));
  }

  (0, _createClass3.default)(Boomerang, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h2',
          null,
          'Boomerang Page'
        ),
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: '/boomerang/take' },
          _react2.default.createElement(
            _reactBootstrap.Button,
            null,
            ' TapToStart '
          ),
          ' '
        )
      );
    }
  }]);
  return Boomerang;
}(_react.Component);

exports.default = Boomerang;
//# sourceMappingURL=boomerang.js.map