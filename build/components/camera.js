'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

var _gphoto = require('gphoto2');

var _gphoto2 = _interopRequireDefault(_gphoto);

var _utils = require('./utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Camera = function () {
	function Camera() {
		(0, _classCallCheck3.default)(this, Camera);
	}

	/*
 * Detect and configure camera
 */


	(0, _createClass3.default)(Camera, [{
		key: 'initialize',
		value: function initialize(callback) {
			this.GPhoto = new _gphoto2.default.GPhoto2();

			// Negative value or undefined will disable logging, levels 0-4 enable it.
			this.GPhoto.setLogLevel(-1);

			var self = this;
			this.GPhoto.list(function (list) {
				if (list.length === 0) {
					callback(false, 'No camera found', null);
					return;
				}
				self.camera = list[0];

				console.log('gphoto2: Found', self.camera.model);

				if (_utils2.default.getConfig().gphoto2.capturetarget) {
					self.camera.setConfigValue('capturetarget', _utils2.default.getConfig().gphoto2.capturetarget, function (err) {
						if (err) {
							callback(false, 'setting config failed', err);
						} else {
							callback(true);
						}
					});
				}
			});
		}
	}, {
		key: 'isInitialized',
		value: function isInitialized() {
			return this.camera !== undefined;
		}
	}, {
		key: 'isConnected',
		value: function isConnected(callback) {
			this.camera.getConfig(function (err, settings) {
				if (err) {
					if (callback) callback(false, 'connection test failed', err);
				} else {
					self.camera == undefined; // needs to be reinitialized
					if (callback) callback(true);
				}
			});
		}
	}, {
		key: 'takePicture',
		value: function takePicture(callback) {
			var self = this;

			if (self.camera === undefined) {
				callback(-1, 'camera not initialized', null);
				return;
			}

			var filepath = _utils2.default.getPhotosDirectory() + "img_" + _utils2.default.getTimestamp() + ".jpg";
			var webFilepath = _utils2.default.getWebAppPhotosDirectory() + "img_" + _utils2.default.getTimestamp() + ".jpg";
			var maxImageSize = _utils2.default.getConfig().maxImageSize ? _utils2.default.getConfig().maxImageSize : 1500;
			var keep = _utils2.default.getConfig().gphoto2.keep === true ? true : false;

			self.camera.takePicture({ download: true, keep: keep }, function (err, data) {

				if (err) {
					self.camera = undefined; // needs to be reinitialized
					callback(-2, 'connection to camera failed', err);
					return;
				}

				(0, _sharp2.default)(data) // resize image to given maxSize
				.resize(Number(maxImageSize)) // scale width to 1500
				.toFile(filepath, function (err) {

					if (err) {
						callback(-3, 'resizing image failed', err);
					} else {
						callback(0, filepath, webFilepath);
					}
				});
			});
		}
	}]);
	return Camera;
}();

/*
 * Module exports for connection
 */
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

var camera = new Camera();
exports.default = camera;
//# sourceMappingURL=camera.js.map