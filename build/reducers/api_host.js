'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _reduxActions = require('redux-actions');

var _api_host = require('../actions/api_host');

var _api_host2 = _interopRequireDefault(_api_host);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reduxActions.handleActions)((0, _defineProperty3.default)({}, _api_host2.default.UpdateApi, function (state, action) {
  return (0, _extends3.default)({}, state, action.payload);
}), {});
//# sourceMappingURL=api_host.js.map