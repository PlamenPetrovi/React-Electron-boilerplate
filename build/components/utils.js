'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _path2 = require('path');

var _path3 = _interopRequireDefault(_path2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import sharp from 'sharp';


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

var Utils = function () {
  function Utils() {
    (0, _classCallCheck3.default)(this, Utils);


    var defaultConfig = _path3.default.join(__dirname, '../', './config.json');
    var ownConfig = _path3.default.join(__dirname, '../', './my.config.json');
    this.config_path = _fs2.default.existsSync(ownConfig) ? ownConfig : defaultConfig;

    this.defaultContentDirectory = _path3.default.join(__dirname, '../', '/content');
    this.webappSymlink = _path3.default.join(__dirname, "../", "./webapp/photos");

    this.maxImages = 20;

    this.getConfig();
    this.checkGrayscaleMode();
    this.getContentDirectory();

    this.initializeBranding();
    this.loadRecentImagesAfterStart();
    this.printIpAddresses();
  }

  (0, _createClass3.default)(Utils, [{
    key: 'getConfig',
    value: function getConfig() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this.config || force) {
        this.config = require(this.config_path);
        return this.config;
      }
      return this.config;
    }
  }, {
    key: 'saveConfig',
    value: function saveConfig(new_config, callback) {

      // TODO: Add json-schema validation for config.json

      if (!new_config) {
        callback(false);
        return;
      }

      var self = this;
      _fs2.default.writeFile(this.config_path, (0, _stringify2.default)(new_config, null, "\t"), function (err) {
        if (err) {
          console.error('utils: updating config.json failed', err);
          callback(false, err);
        } else {
          // force config.json to be reloaded
          var _path = require.resolve(self.config_path);
          delete require.cache[_path];

          self.config = require(self.config_path); // should not be needed
          //console.log('utils: config.json updated: \n'+JSON.stringify(self.config, null, "\t"));
          console.log('utils: config.json updated');
          callback(true);
        }
      });
    }
  }, {
    key: 'getContentDirectory',
    value: function getContentDirectory() {
      if (this.contentDir === undefined) {
        var newContentDir = this.config.content_dir;
        if (newContentDir !== null && typeof newContentDir === 'string' && newContentDir.length > 0) {
          // if valid path in config
          try {
            if (!_fs2.default.existsSync(String(newContentDir))) _fs2.default.mkdirSync(String(newContentDir));
            this.contentDir = newContentDir.startsWith('/') ? newContentDir : _path3.default.join(__dirname, '../', newContentDir);
          } catch (err) {
            // fallback: default
            console.error('Could not open or create content_dir \'' + this.config.content_dir + '\' like defined in config.json. ' + err + '\nInstead going to use default \'', this.defaultContentDirectory, '\'');
            if (!_fs2.default.existsSync(this.defaultContentDirectory)) _fs2.default.mkdirSync(this.defaultContentDirectory);
            this.contentDir = this.defaultContentDirectory;
          }
        } else {
          // fallback: default
          if (!_fs2.default.existsSync(this.defaultContentDirectory)) _fs2.default.mkdirSync(this.defaultContentDirectory);
          this.contentDir = this.defaultContentDirectory;
        }
      }

      // initalized the depending directories
      this.getPhotosDirectory();
      this.getWebAppPhotosDirectory();

      return this.contentDir;
    }
  }, {
    key: 'getPhotosDirectory',
    value: function getPhotosDirectory() {
      if (this.photosDir === undefined) {
        var photoDir = _path3.default.join(this.contentDir, "photos/");
        if (!_fs2.default.existsSync(photoDir)) _fs2.default.mkdirSync(photoDir);
        this.photosDir = photoDir;
        return this.photosDir;
      }
      return this.photosDir;
    }
  }, {
    key: 'getWebAppPhotosDirectory',
    value: function getWebAppPhotosDirectory() {
      if (this.webappSymlinkInitialized === undefined || !this.webappSymlinkInitialized) {
        if (_fs2.default.existsSync(this.webappSymlink)) {
          try {
            _fs2.default.unlinkSync(this.webappSymlink);
          } catch (err) {
            console.error('utils: could not remove old symlink, probably a problem with access rights', err);
          }
        }
        _fs2.default.symlinkSync(this.photosDir, this.webappSymlink);
        this.webappSymlinkInitialized = true;
      }
      return 'photos/';
    }

    // ---------------------------------------------------- //

  }, {
    key: 'loadRecentImagesAfterStart',
    value: function loadRecentImagesAfterStart() {

      var photos_dir = this.getPhotosDirectory();
      var self = this;
      _fs2.default.readdir(photos_dir, function (err, files) {

        if (files) {
          files.sort();
          var numberImages = files.length < self.maxImages ? files.length : self.maxImages;
          for (var i = 0; i < numberImages; i++) {
            //console.log(photos_dir+"/"+files[i]);
            // just take jpegs
            if (files[i].endsWith(".jpg") || files[i].endsWith(".jpeg") || files[i].endsWith(".JPG") || files[i].endsWith(".JPEG")) {
              self.prependImage(self.getPhotosDirectory() + "/" + files[i]);
            }
          }
        }
      });
    }
  }, {
    key: 'prependImage',
    value: function prependImage(path) {
      var img = (0, _jquery2.default)('<img>');
      img.attr('src', path);
      var div = (0, _jquery2.default)('<div class="img-wrapper col-6 col-md-4">').append(img);
      (0, _jquery2.default)("#collage").prepend(div);
    }

    // ---------------------------------------------------- //

  }, {
    key: 'initializeBranding',
    value: function initializeBranding() {
      if (this.config.branding) {

        var type = this.config.branding.type;
        if (type) {
          if (type == 'text') {
            (0, _jquery2.default)('#front').html(this.config.branding.content);
          } else if (type == 'image') {
            (0, _jquery2.default)('#front').html("Not yet implemented");
          }
        }

        var position = this.config.branding.position;
        if (position) {
          if (position == 'center') {
            (0, _jquery2.default)('#front').css('align-items', 'center');
            (0, _jquery2.default)('#front').css('justify-content', 'center');
          } else if (position == 'topleft') {
            (0, _jquery2.default)('#front').css('align-items', 'flex-start');
            (0, _jquery2.default)('#front').css('justify-content', 'flex-start');
          } else if (position == 'topright') {
            (0, _jquery2.default)('#front').css('align-items', 'flex-start');
            (0, _jquery2.default)('#front').css('justify-content', 'flex-end');
          } else if (position == 'bottomleft') {
            (0, _jquery2.default)('#front').css('align-items', 'flex-end');
            (0, _jquery2.default)('#front').css('justify-content', 'flex-start');
          } else if (position == 'bottomright') {
            (0, _jquery2.default)('#front').css('align-items', 'flex-end');
            (0, _jquery2.default)('#front').css('justify-content', 'flex-end');
          }
        }
      }
    }
  }, {
    key: 'getTimestamp',
    value: function getTimestamp() {
      var now = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

      var secs = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
      var mins = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
      var hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
      var date = now.getDate() < 10 ? '0' + String(now.getDate()) : String(now.getDate());
      var month = now.getMonth() + 1 < 10 ? '0' + String(now.getMonth() + 1) : String(now.getMonth() + 1);
      var year = String(now.getFullYear());

      return year + month + date + '_' + hours + '-' + mins + '-' + secs;
    }
  }, {
    key: 'getDate',
    value: function getDate(now) {
      return now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    }
  }, {
    key: 'printIpAddresses',
    value: function printIpAddresses() {
      var ifaces = _os2.default.networkInterfaces();

      (0, _keys2.default)(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function (iface) {
          if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
          }

          if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            console.log("utils: interface", ifname + ':' + alias, iface.address);
          } else {
            // this interface has only one ipv4 adress
            console.log("utils: interface", ifname, iface.address);
          }
          ++alias;
        });
      });
    }
  }, {
    key: 'checkGrayscaleMode',
    value: function checkGrayscaleMode() {
      if (this.getConfig().init.grayscaleMode) {
        console.log("utils: using grayscale mode");
        (0, _jquery2.default)('head').append('<link rel="stylesheet" type="text/css" href="css/grayscale.css">');
      }
    }
  }, {
    key: 'convertImageForDownload',
    value: function convertImageForDownload(filename, grayscale, callback) {

      var self = this;
      var _path = _path3.default.join(this.photosDir, filename);
      var newFilename = 'photo-booth_' + filename.replace('img_', '');
      var tmpDir = _path3.default.join(this.getPhotosDirectory(), './tmp');
      var convertedFilepath = _path3.default.join(this.getPhotosDirectory(), './tmp', newFilename);
      var webappFilepath = _path3.default.join(this.getWebAppPhotosDirectory(), 'tmp', newFilename);

      if (!_fs2.default.existsSync(tmpDir)) _fs2.default.mkdirSync(tmpDir);

      function cb(err) {
        if (err) {
          callback(false, 'resizing image failed', err);
        } else {
          callback(true, webappFilepath);
        }
        // delete file after 10s
        setInterval(function () {
          if (_fs2.default.existsSync(convertedFilepath)) _fs2.default.unlinkSync(convertedFilepath);
        }, 10000);
      }

      // if (grayscale) {
      //   sharp(_path) // resize image to given maxSize
      //     .grayscale()
      //     .resize(self.config.webapp.maxDownloadImageSize)  // Scale down images on webapp
      //     .toFile(convertedFilepath, cb);
      // } else {
      //   sharp(_path) // resize image to given maxSize
      //     .resize(self.config.webapp.maxDownloadImageSize)  // Scale down images on webapp
      //     .toFile(convertedFilepath, cb);
      // }
    }
  }]);
  return Utils;
}();

/*
 * Module exports for connection
 */


var utils = new Utils();
exports.default = utils;
//# sourceMappingURL=utils.js.map