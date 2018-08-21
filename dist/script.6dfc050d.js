// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"src/keyboarder.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Keyboarder = function () {
  function Keyboarder() {
    var _this = this;

    _classCallCheck(this, Keyboarder);

    this.keyState = {};

    window.addEventListener('keydown', function (e) {
      _this.keyState[e.keyCode] = true;
    });

    window.addEventListener('keyup', function (e) {
      this.keyState[e.keyCode] = false;
    }.bind(this));
  }

  _createClass(Keyboarder, [{
    key: 'isDown',
    value: function isDown(keyCode) {
      return this.keyState[keyCode] === true;
    }
  }, {
    key: 'on',
    value: function on(keyCode, callback) {
      window.addEventListener('keydown', function (e) {
        if (e.keyCode === keyCode) {
          callback();
        }
      });
    }
  }]);

  return Keyboarder;
}();

Keyboarder.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, S: 83 };

exports.default = Keyboarder;
},{}],"src/randomcolor.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomColor = getRandomColor;
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
},{}],"src/constants.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colors = exports.screenSize = exports.context = exports.canvas = undefined;

var _randomcolor = require('./randomcolor');

var canvas = exports.canvas = document.getElementById('screen');
var context = exports.context = canvas.getContext('2d');
var screenSize = exports.screenSize = {
  x: canvas.width,
  y: canvas.height
};
var colors = exports.colors = {
  player: '#972D07',
  bullets: '#ED1C24',
  aliens: (0, _randomcolor.getRandomColor)()
};
},{"./randomcolor":"src/randomcolor.js"}],"src/bullet.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('./constants.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bullet = function () {
  function Bullet(playerCenterX) {
    _classCallCheck(this, Bullet);

    this.center = {
      x: playerCenterX,
      y: 445
    };
    this.size = {
      x: 5,
      y: 5
    };
  }

  _createClass(Bullet, [{
    key: 'draw',
    value: function draw() {
      _constants.context.fillStyle = _constants.colors.bullets;
      _constants.context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y);
    }
  }, {
    key: 'update',
    value: function update() {
      this.center.y -= 2;
    }
  }]);

  return Bullet;
}();

exports.default = Bullet;
},{"./constants.js":"src/constants.js"}],"src/colliding.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colliding = colliding;
function colliding(b1, b2) {
  return !(b1 === b2 || b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 || b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 || b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x / 2 || b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2);
}
},{}],"src/player.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _keyboarder = require('./keyboarder');

var _keyboarder2 = _interopRequireDefault(_keyboarder);

var _bullet = require('./bullet');

var _bullet2 = _interopRequireDefault(_bullet);

var _colliding = require('./colliding.js/');

var _constants = require('./constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(game) {
    _classCallCheck(this, Player);

    this.center = {
      x: _constants.screenSize.x / 2 - 10,
      y: 450
    };
    this.size = {
      x: 20,
      y: 20
    };
    this.keyboarder = new _keyboarder2.default();
    this.game = game;
  }

  _createClass(Player, [{
    key: 'draw',
    value: function draw() {
      _constants.context.fillStyle = _constants.colors.player;
      _constants.context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y);
    }
  }, {
    key: 'update',
    value: function update() {
      var _this = this;

      if (this.keyboarder.isDown(_keyboarder2.default.KEYS.LEFT)) {
        this.center.x -= 2;
        if (this.center.x <= 0) this.center.x = 0;
      }
      if (this.keyboarder.isDown(_keyboarder2.default.KEYS.RIGHT)) {
        this.center.x += 2;
        if (this.center.x >= 480) this.center.x = 480;
      }
      if (this.keyboarder.isDown(_keyboarder2.default.KEYS.S)) {
        this.game.bullets.push(new _bullet2.default(this.center.x));
      }
      this.game.aliens.forEach(function (alien) {
        if ((0, _colliding.colliding)(_this, alien)) {
          _this.game.gameOver = true;
        }
      });
    }
  }]);

  return Player;
}();

exports.default = Player;
},{"./keyboarder":"src/keyboarder.js","./bullet":"src/bullet.js","./colliding.js/":"src/colliding.js","./constants.js":"src/constants.js"}],"src/alien.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colliding = require('./colliding.js/');

var _constants = require('./constants.js');

var _randomcolor = require('./randomcolor');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Alien = function () {
  function Alien(game) {
    _classCallCheck(this, Alien);

    this.center = {
      x: Math.floor(Math.random() * 500),
      y: 20
    };
    this.size = {
      x: 20,
      y: 20
    };
    this.game = game;
    this.color = (0, _randomcolor.getRandomColor)();
    this.speed = Math.random();
  }

  _createClass(Alien, [{
    key: 'draw',
    value: function draw() {
      _constants.context.fillStyle = this.color;
      _constants.context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y);
    }
  }, {
    key: 'update',
    value: function update() {
      var _this = this;

      this.center.y += this.speed;
      if (this.center.y >= 500) {
        this.game.gameOver = true;
      }
      this.game.bullets.forEach(function (bullet, bulletIndex) {
        _this.game.aliens.forEach(function (alien, alienIndex) {
          if ((0, _colliding.colliding)(alien, bullet)) {
            _this.game.aliens.splice(alienIndex, 1);
          }
          if (_this.game.aliens.length === 0) {
            _this.game.winner = true;
          }
        });
      });
    }
  }]);

  return Alien;
}();

exports.default = Alien;
},{"./colliding.js/":"src/colliding.js","./constants.js":"src/constants.js","./randomcolor":"src/randomcolor.js"}],"src/Game.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _alien = require('./alien');

var _alien2 = _interopRequireDefault(_alien);

var _constants = require('./constants.js');

var _randomcolor = require('./randomcolor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.gameOver = false;
    this.winner = false;
    this.player = new _player2.default(this);
    this.aliens = [new _alien2.default(this), new _alien2.default(this), new _alien2.default(this), new _alien2.default(this), new _alien2.default(this), new _alien2.default(this), new _alien2.default(this), new _alien2.default(this)];
    this.bullets = [];
    this.ticks();
  }

  _createClass(Game, [{
    key: 'draw',
    value: function draw() {
      _constants.context.clearRect(0, 0, 500, 500);
      this.bullets.forEach(function (bullet) {
        bullet.draw();
      });
      this.aliens.forEach(function (alien) {
        alien.draw();
      });
      this.player.draw();
    }
  }, {
    key: 'ticks',
    value: function ticks() {
      var _this = this;

      if (this.gameOver) {
        _constants.context.textAlign = 'center';
        _constants.context.font = '48px Helvetica';
        _constants.context.fillStyle = 'black';
        _constants.context.fillText('game over', _constants.screenSize.x / 2, _constants.screenSize.y / 2);
      } else if (this.winner) {
        _constants.context.textAlign = 'center';
        _constants.context.font = '48px Helvetica';
        _constants.context.fillStyle = (0, _randomcolor.getRandomColor)();
        _constants.context.fillText('WINNER', _constants.screenSize.x / 2, _constants.screenSize.y / 2);
      } else {
        this.update();
        this.draw();
        window.requestAnimationFrame(function () {
          return _this.ticks();
        });
      }
    }
  }, {
    key: 'update',
    value: function update() {
      this.player.update();
      this.aliens.forEach(function (alien) {
        alien.update();
      });
      this.bullets.forEach(function (bullet) {
        bullet.update();
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.context.textAlign = 'center';
      this.context.font = '48px Helvetica';
      this.context.fillStyle = 'black';
      this.context.fillText('game over', this.screenSize.x / 2, this.screenSize.y / 2);
    }
  }]);

  return Game;
}();

exports.default = Game;
},{"./player":"src/player.js","./alien":"src/alien.js","./constants.js":"src/constants.js","./randomcolor":"src/randomcolor.js"}],"script.js":[function(require,module,exports) {
'use strict';

var _Game = require('./src/Game');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// class Game {
//   constructor () {
//     this.gameOver = false
//     this.player = new Player(this)
//     this.aliens = [new Alien(this), new Alien(this), new Alien(this), new Alien(this), new Alien(this), new Alien(this), new Alien(this), new Alien(this)]
//     this.bullets = []
//     this.tick()
//   }
//   draw () {
//     context.clearRect(0, 0, 500, 500)
//     this.bullets.forEach(function (bullet) {
//       bullet.draw()
//     })
//     this.aliens.forEach(function (alien) {
//       alien.draw()
//     })
//     this.player.draw()
//   }
//   ticks () {
//     if (this.gameOver) {
//       context.textAlign = 'center'
//       context.font = '48px Helvetica'
//       context.fillStyle = 'black'
//       context.fillText('game over', screenSize.x / 2, screenSize.y / 2)
//     } else {
//       this.update()
//       this.draw()
//       requestAnimationFrame(() => this.ticks())
//     }
//   }
//   update () {
//     this.player.update()
//     this.aliens.forEach((alien) => {
//       alien.update()
//     })
//     this.bullets.forEach(function (bullet) {
//       bullet.update()
//     })
//   }
//   stop () {
//     this.context.textAlign = 'center'
//     this.context.font = '48px Helvetica'
//     this.context.fillStyle = 'black'
//     this.context.fillText('game over', this.screenSize.x / 2, this.screenSize.y / 2)
//   }
// }

// class Player {
//   constructor (game) {
//     this.center = {
//       x: screenSize.x / 2 - 10,
//       y: 450
//     }
//     this.size = {
//       x: 20,
//       y: 20
//     }
//     this.keyboarder = new Keyboarder()
//     this.game = game
//   }
//   draw () {
//     context.fillStyle = colors.player
//     context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)
//   }
//   update () {
//     if (this.keyboarder.isDown(Keyboarder.KEYS.LEFT)) {
//       this.center.x -= 2
//       if (this.center.x <= 0) this.center.x = 0
//     }
//     if (this.keyboarder.isDown(Keyboarder.KEYS.RIGHT)) {
//       this.center.x += 2
//       if (this.center.x >= 480) this.center.x = 480
//     }
//     if (this.keyboarder.isDown(Keyboarder.KEYS.S)) {
//       this.game.bullets.push(new Bullet(this.center.x))
//     }
//     this.game.aliens.forEach((alien) => {
//       if (colliding(this, alien)) {
//         this.game.gameOver = true
//       }
//     })
//   }
// }
// class Alien {
//   constructor (game) {
//     this.center = {
//       x: Math.floor(Math.random() * 500),
//       y: 20
//     }
//     this.size = {
//       x: 20,
//       y: 20
//     }
//     this.game = game
//     this.color = getRandomColor()
//     this.speed = Math.random()
//   }
//   draw () {
//     context.fillStyle = this.color
//     context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)
//   }
//   update () {
//     this.center.y += this.speed
//     if (this.center.y >= 500) {
//       this.game.gameOver = true
//     }
//     this.game.bullets.forEach((bullet, bulletIndex) => {
//       this.game.aliens.forEach((alien, alienIndex) => {
//         if (colliding(alien, bullet)) {
//           this.game.aliens.splice(alienIndex, 1)
//         }
//         if (this.game.aliens.length === 0) {
//           this.game.gameOver = true
//         }
//       })
//     })
//   }
// }
// class Bullet {
//   constructor (playerCenterX) {
//     this.center = {
//       x: playerCenterX,
//       y: 445
//     }
//     this.size = {
//       x: 5,
//       y: 5
//     }
//     this.game = game
//   }
//   draw () {
//     context.fillStyle = colors.bullets
//     context.fillRect(this.center.x, this.center.y, this.size.x, this.size.y)
//   }
//   update () {
//     this.center.y -= 2
//   }
// }

var game = new _Game2.default();
},{"./src/Game":"src/Game.js"}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '54975' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.6dfc050d.map