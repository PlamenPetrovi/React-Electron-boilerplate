'use strict';

require('util');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _utils = require('./utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _camera = require('./camera.js');

var _camera2 = _interopRequireDefault(_camera);

var _prompt = require('./prompt.js');

var _slideshow = require('./slideshow.js');

var _slideshow2 = _interopRequireDefault(_slideshow);

var _webapp_server = require('./webapp_server.js');

var _webapp_server2 = _interopRequireDefault(_webapp_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_camera2.default.initialize(function (res, msg, err) {
  if (!res) {
    console.error('camera:', msg, err);

    new _prompt.CameraErrorOnStartupPrompt(-1).start(false, false);
  }
});

/*
 * Trigger photo when clicking / touching anywhere at the screen
 */


//import 'popper.js';
//import 'bootstrap';

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

//'use strict';
(0, _jquery2.default)("body").click(function () {
  trigger();
});

/* Listen for pushbutton on GPIO 3 (PIN 5)
 * Activate the use of GPIOs by setting useGPIO in config.json to true.
 */
if (_utils2.default.getConfig().init.useGPIO !== undefined ? _utils2.default.getConfig().init.useGPIO : true) {
  console.log('GPIO usage activated');
  var gpio = require('rpi-gpio');
  gpio.setMode(gpio.MODE_BCM);
  gpio.setup(3, gpio.DIR_IN, gpio.EDGE_BOTH);
  gpio.on('change', function (channel, value) {
    if (channel == 3 && !value) trigger();
    // NOTE: takePhoto() is secure to don't run twice 
    // at the same time, make sure this is also so for
    // your code.
  });
}

var countdownLength = typeof _utils2.default.getConfig().countdownLength == 'number' ? _utils2.default.getConfig().countdownLength : 5;

var executing = false;
function trigger() {

  if (executing) return;

  executing = true;

  _slideshow2.default.stop();

  if (_camera2.default.isInitialized()) {

    var triggerPhotoOffsetBeforeZero = 0.5; // in seconds

    // start countdown and show spinner afterwards
    var prompt = new _prompt.CountdownPrompt(countdownLength).start(true, false, function () {
      prompt = new _prompt.SpinnerPrompt();
      // wait a sec for spinner to start
      setTimeout(function () {
        prompt.start(true, false);
      }, 1500);
    });

    // take picture after countdown
    setTimeout(function () {

      _camera2.default.takePicture(function (res, msg1, msg2) {

        var message1 = msg1;
        var message2 = msg2;

        prompt.stop(true, false, function () {
          // stop spinner if image is ready

          if (res == 0) {
            var previewDuration = 8;
            // after that show preview
            prompt = new _prompt.PreviewPrompt(message1, previewDuration).start(false, false, function () {
              // end photo task after preview ended
              executing = false;
            });

            setTimeout(function () {
              _utils2.default.prependImage(message1); // add image to collage
            }, 1500);

            _webapp_server2.default.sendNewPhoto(message2); // send image to connected web clients


            _slideshow2.default.start();
          } else {

            console.error(message1, '\n', message2);

            if (res == -1) {
              // camera not initialized
              new _prompt.CameraErrorPrompt(5).start(false, false, function () {
                executing = false;
              });
            } else if (res == -2) {
              // gphoto2 error
              new _prompt.CameraErrorPrompt(5).start(false, false, function () {
                executing = false;
              });
            } else if (res == -3) {
              // sharp error
              new _prompt.SharpErrorPrompt(5).start(false, false, function () {
                executing = false;
              });
            }
          }
        });
      });
    }, (countdownLength - triggerPhotoOffsetBeforeZero) * 1000);
  } else {

    // TODO: Handle uninitialized camera

    _camera2.default.initialize(function (res, msg, err) {
      if (res) {

        executing = false;
        trigger();
      } else {

        // TODO: handle error
        new _prompt.CameraErrorPrompt(5).start(false, false, function () {
          executing = false;
        });
      }
    });
  }
}

/*
 * Module exports
 */
module.exports.triggerPhoto = trigger;
//# sourceMappingURL=booth.js.map