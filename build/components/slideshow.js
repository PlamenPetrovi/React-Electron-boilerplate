'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _utils = require('./utils.js');

var _utils2 = _interopRequireDefault(_utils);

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

var Slideshow = function () {
  function Slideshow() {
    (0, _classCallCheck3.default)(this, Slideshow);


    if (_utils2.default.getConfig().slideshow !== undefined && _utils2.default.getConfig().slideshow.enabled) {
      var params = _utils2.default.getConfig().slideshow;

      this.enabled = true;

      this.delay = typeof params.activatesAfterSeconds == 'number' ? params.activatesAfterSeconds : 30;
      this.duration = typeof params.secondsPerImages == 'number' ? params.secondsPerImages : 8;
      if (this.duration < 4) this.duration = 4;

      console.log('slideshow: enabled');

      var self = this;
      (0, _jquery2.default)('body').mousemove(function () {
        self.stop();
        self.start();
      });

      this.start();
    } else {
      this.enabled = false;
    }
  }

  (0, _createClass3.default)(Slideshow, [{
    key: 'start',
    value: function start() {

      var numImgs = (0, _jquery2.default)('#collage img').map(function () {
        return this.src;
      }).get().length;
      if (this.enabled && numImgs > 2) {
        var self = this;
        self.slideshowDelay = setTimeout(function () {
          self.slideshow = setInterval(function () {
            // get all image sources and choose one randomly
            var arr = (0, _jquery2.default)('#collage img').map(function () {
              return this.src;
            }).get();
            var idx = Math.floor(Math.random() * arr.length);
            var clzz = "slideshow-" + idx;

            if (self.prevImg == clzz) {
              idx = idx + 1 < arr.length ? idx + 1 : idx - 1;
            }

            (0, _jquery2.default)('#collage').append("<div id='slideshow-" + clzz + "' class='slideshow' style='background-image: url(" + arr[idx] + ");'>");
            (0, _jquery2.default)('#slideshow-' + clzz).fadeIn(3000, function () {

              if (self.prevImg !== undefined) (0, _jquery2.default)(self.prevImg).remove();
              self.prevImg = '#slideshow-' + clzz;
            });

            //$('#slideshow').css('background-image', 'url("' + arr[idx] + '")');
            //if ($('#slideshow:hidden')) $('#slideshow').fadeIn(3000);
          }, self.duration * 1000);
        }, self.delay * 1000);
      }
    }
  }, {
    key: 'stop',
    value: function stop(callback) {
      if (this.enabled) {
        clearTimeout(this.slideshowDelay);
        clearInterval(this.slideshow);
        (0, _jquery2.default)('.slideshow').fadeOut(500, function () {
          if (callback) callback();
        });
      } else {
        if (callback) callback();
      }
    }
  }]);
  return Slideshow;
}();

/*
 * Module exports for connection
 */


var slideshow = new Slideshow();
exports.default = slideshow;
//# sourceMappingURL=slideshow.js.map