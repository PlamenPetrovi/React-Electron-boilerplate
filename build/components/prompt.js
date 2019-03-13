"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SharpErrorPrompt = exports.CameraErrorOnStartupPrompt = exports.CameraErrorPrompt = exports.PreviewPrompt = exports.CountdownPrompt = exports.SpinnerPrompt = exports.default = undefined;

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _slideshow = require("./slideshow.js");

var _slideshow2 = _interopRequireDefault(_slideshow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
 * This file is part of "photo-booth" 
 * Copyright (c) 2018 Philipp Trenz
 *
 * For more information on the project go to
 * <https://github.com/philipptrenz/photo-booth>
 * 
 * This program is free software: you can redistribute it and/or modify  
 * it under the terms of the GNU General Public License as published by  
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU 
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License 
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

var Prompt = function () {

	/*
  * If duration < 0: No timeout
  */
	function Prompt(html, duration) {
		(0, _classCallCheck3.default)(this, Prompt);

		this.active = false;
		this.activated = true;
		this.duration = duration;
		this.container = (0, _jquery2.default)("#prompt");
		this.html = html;
	}

	(0, _createClass3.default)(Prompt, [{
		key: "start",
		value: function start() {
			var stay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
			var instant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
			var callback = arguments[2];

			_slideshow2.default.stop(); // stop slideshow if running
			var self = this;
			if (self.activated && !self.active) {
				self.active = true;
				(0, _jquery2.default)(self.container).html(self.html);
				(0, _jquery2.default)(self.container).fadeIn(250);

				if (self.duration >= 0) {
					self.timeout = setTimeout(function () {
						self.stop(stay, instant, callback);
					}, self.duration * 1000);
				}
				return this;
			} else {
				return null;
			}
		}
	}, {
		key: "stop",
		value: function stop() {
			var stay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
			var instant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
			var callback = arguments[2];

			var self = this;
			self.activated = false; // prevent from starting after stop() was called
			if (self.active) {
				clearTimeout(self.timeout);

				if (stay) {
					(0, _jquery2.default)(self.container).html('');
					self.active = false;
					if (callback !== undefined) callback();
				} else {
					var fadeOutTime = instant ? 0 : 250;
					(0, _jquery2.default)(self.container).fadeOut(fadeOutTime, function () {
						(0, _jquery2.default)(self.container).html('');
						self.active = false;
						if (callback !== undefined) callback();
					});
				}
			} else {
				if (callback !== undefined) callback();
			}
		}
	}]);
	return Prompt;
}();

var SpinnerPrompt = function (_Prompt) {
	(0, _inherits3.default)(SpinnerPrompt, _Prompt);

	function SpinnerPrompt() {
		(0, _classCallCheck3.default)(this, SpinnerPrompt);
		return (0, _possibleConstructorReturn3.default)(this, (SpinnerPrompt.__proto__ || (0, _getPrototypeOf2.default)(SpinnerPrompt)).call(this, '<div class="loading"><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></div>', -1));
	}

	return SpinnerPrompt;
}(Prompt);

var PreviewPrompt = function (_Prompt2) {
	(0, _inherits3.default)(PreviewPrompt, _Prompt2);

	function PreviewPrompt(filepath, duration) {
		(0, _classCallCheck3.default)(this, PreviewPrompt);
		return (0, _possibleConstructorReturn3.default)(this, (PreviewPrompt.__proto__ || (0, _getPrototypeOf2.default)(PreviewPrompt)).call(this, '<div id=\'preview\' style=\'background-image: url(\"' + filepath + '\");\'></div>', duration));
	}

	return PreviewPrompt;
}(Prompt);

var CameraErrorPrompt = function (_Prompt3) {
	(0, _inherits3.default)(CameraErrorPrompt, _Prompt3);

	function CameraErrorPrompt(duration) {
		(0, _classCallCheck3.default)(this, CameraErrorPrompt);
		return (0, _possibleConstructorReturn3.default)(this, (CameraErrorPrompt.__proto__ || (0, _getPrototypeOf2.default)(CameraErrorPrompt)).call(this, '<div class="error"><i class="fa fa-camera" aria-hidden="true"></i>  Whoops ...<br /><p>Something went wrong, please check the camera and try again</p></div>', duration));
	}

	return CameraErrorPrompt;
}(Prompt);

var CameraErrorOnStartupPrompt = function (_Prompt4) {
	(0, _inherits3.default)(CameraErrorOnStartupPrompt, _Prompt4);

	function CameraErrorOnStartupPrompt(duration) {
		(0, _classCallCheck3.default)(this, CameraErrorOnStartupPrompt);
		return (0, _possibleConstructorReturn3.default)(this, (CameraErrorOnStartupPrompt.__proto__ || (0, _getPrototypeOf2.default)(CameraErrorOnStartupPrompt)).call(this, '<div class="error"><i class="fa fa-camera" aria-hidden="true"></i>  Oh no ...<br /><p>No camera found. Please check the connection and test by triggering a photo</p></div>', duration));
	}

	return CameraErrorOnStartupPrompt;
}(Prompt);

var SharpErrorPrompt = function (_Prompt5) {
	(0, _inherits3.default)(SharpErrorPrompt, _Prompt5);

	function SharpErrorPrompt(duration) {
		(0, _classCallCheck3.default)(this, SharpErrorPrompt);
		return (0, _possibleConstructorReturn3.default)(this, (SharpErrorPrompt.__proto__ || (0, _getPrototypeOf2.default)(SharpErrorPrompt)).call(this, '<div class="error"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>  Whoops ...<br /><p>Something went wrong when saving the photo, please try again</p></div>', duration));
	}

	return SharpErrorPrompt;
}(Prompt);

var CountdownPrompt = function () {
	function CountdownPrompt(duration) {
		(0, _classCallCheck3.default)(this, CountdownPrompt);

		this.active = false;
		this.activated = true;
		this.duration = duration;
		this.container = (0, _jquery2.default)("#prompt");

		this.htmlPre = '<span id="countdown">';
		this.htmlPost = '</span>';
	}

	(0, _createClass3.default)(CountdownPrompt, [{
		key: "start",
		value: function start() {
			var stay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
			var instant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
			var callback = arguments[2];

			_slideshow2.default.stop();
			var self = this;
			if (self.activated && !self.active) {
				self.active = true;
				(0, _jquery2.default)(self.container).fadeIn(250);

				// first time run immediatly	
				self.html = self.htmlPre + self.duration + self.htmlPost;
				(0, _jquery2.default)(self.container).html(self.html);
				(0, _jquery2.default)(self.container).children().fadeOut(900);
				self.duration--;

				self.interval = setInterval(function () {
					if (self.duration > 0) {
						self.html = self.htmlPre + self.duration + self.htmlPost;
						(0, _jquery2.default)(self.container).html(self.html);
						(0, _jquery2.default)(self.container).children().fadeOut(900);
						self.duration--;
					} else {
						clearInterval(self.interval);
						self.stop(stay, instant, callback);
					}
				}, 1000);
				return this;
			} else {
				return null;
			}
		}
	}, {
		key: "stop",
		value: function stop() {
			var stay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
			var instant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
			var callback = arguments[2];

			var self = this;
			this.activated = false; // prevent from starting after stop() was called
			if (self.active) {
				clearInterval(self.interval);
				if (stay) {
					(0, _jquery2.default)(self.container).html('');
					self.active = false;
					if (callback !== undefined) callback();
				} else {
					var fadeOutTime = instant ? 0 : 250;
					(0, _jquery2.default)(self.container).fadeOut(fadeOutTime, function () {
						(0, _jquery2.default)(self.container).html('');
						self.active = false;
						if (callback !== undefined) callback();
					});
				}
			} else {
				if (callback !== undefined) callback();
			}
		}
	}]);
	return CountdownPrompt;
}();

/*
 * Module exports for connection
 */


exports.default = Prompt;
exports.SpinnerPrompt = SpinnerPrompt;
exports.CountdownPrompt = CountdownPrompt;
exports.PreviewPrompt = PreviewPrompt;
exports.CameraErrorPrompt = CameraErrorPrompt;
exports.CameraErrorOnStartupPrompt = CameraErrorOnStartupPrompt;
exports.SharpErrorPrompt = SharpErrorPrompt;
//# sourceMappingURL=prompt.js.map