/*!
  * Xcodi class-toggler.js v1.0.0 (https://taint1811.github.io)
  * Copyright 2020 Tai Nguyen
  * Licensed under MIT (https://taint1811.github.io)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('./dom/data.js'), require('./dom/event-handler.js'), require('./dom/manipulator.js')) :
  typeof define === 'function' && define.amd ? define(['./dom/data.js', './dom/event-handler.js', './dom/manipulator.js'], factory) :
  (global = global || self, global.ClassToggler = factory(global.Data, global.EventHandler, global.Manipulator));
}(this, (function (Data, EventHandler, Manipulator) { 'use strict';

  Data = Data && Object.prototype.hasOwnProperty.call(Data, 'default') ? Data['default'] : Data;
  EventHandler = EventHandler && Object.prototype.hasOwnProperty.call(EventHandler, 'default') ? EventHandler['default'] : EventHandler;
  Manipulator = Manipulator && Object.prototype.hasOwnProperty.call(Manipulator, 'default') ? Manipulator['default'] : Manipulator;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v5.0.0-alpha1): util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var toType = function toType(obj) {
    if (obj === null || obj === undefined) {
      return "" + obj;
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  };

  var isElement = function isElement(obj) {
    return (obj[0] || obj).nodeType;
  };

  var typeCheckConfig = function typeCheckConfig(componentName, config, configTypes) {
    Object.keys(configTypes).forEach(function (property) {
      var expectedTypes = configTypes[property];
      var value = config[property];
      var valueType = value && isElement(value) ? 'element' : toType(value);

      if (!new RegExp(expectedTypes).test(valueType)) {
        throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
      }
    });
  };

  var getjQuery = function getjQuery() {
    var _window = window,
        jQuery = _window.jQuery;

    if (jQuery && !document.body.hasAttribute('data-no-jquery')) {
      return jQuery;
    }

    return null;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'class-toggler';
  var VERSION = '1.0.2';
  var DATA_KEY = 'xcodiui.class-toggler';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var DefaultType = {
    addClass: '(null|array|string)',
    breakpoints: '(null|array|string)',
    removeClass: '(null|array|string)',
    responsive: '(null|boolean)',
    target: '(null|string)',
    toggleClass: '(null|array|string)'
  };
  var Default = {
    addClass: null,
    breakpoints: ['', 'sm', 'md', 'lg', 'xl'],
    removeClass: null,
    responsive: false,
    target: 'body',
    toggleClass: null
  };
  var CLASS_NAME_CLASS_TOGGLER = 'xc-class-toggler';
  var EVENT_CLASS_ADDED = 'classadded';
  var EVENT_CLASS_REMOVED = 'classremoved';
  var EVENT_CLASS_TOGGLE = 'classtoggle';
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var SELECTOR_CLASS_TOGGLER = '.xc-class-toggler';
  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ClassToggler = /*#__PURE__*/function () {
    function ClassToggler(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      Data.setData(element, DATA_KEY, this);
    } // Getters


    var _proto = ClassToggler.prototype;

    // Public
    _proto.add = function add() {
      var _this = this;

      var target = this._target();

      var classNames = this._config.addClass.replace(/\s/g, '').split(',');

      classNames.forEach(function (className) {
        target.classList.add(className);

        _this._customEvent(EVENT_CLASS_ADDED, target, true, className);
      });
    };

    _proto.remove = function remove() {
      var _this2 = this;

      var target = this._target();

      var classNames = this._config.removeClass.replace(/\s/g, '').split(',');

      classNames.forEach(function (className) {
        if (_this2._config.responsive) {
          _this2._updateResponsiveClassNames(className).forEach(function (className) {
            target.classList.remove(className);

            _this2._customEvent(EVENT_CLASS_REMOVED, target, false, className);
          });
        } else {
          target.classList.remove(className);

          _this2._customEvent(EVENT_CLASS_REMOVED, target, false, className);
        }
      });
    };

    _proto.toggle = function toggle() {
      var _this3 = this;

      var target = this._target();

      var classNames = this._config.toggleClass.replace(/\s/g, '').split(',');

      if (this._config.responsive) {
        classNames.forEach(function (className) {
          var responsiveClassNames = _this3._updateResponsiveClassNames(className);

          if (responsiveClassNames.filter(function (className) {
            return target.classList.contains(className);
          }).length) {
            _this3._updateResponsiveClassNames(className).forEach(function (className) {
              _this3._config.removeClass = className;

              _this3.remove();

              _this3._customEvent(EVENT_CLASS_TOGGLE, target, false, className);
            });
          } else {
            _this3._config.addClass = className;

            _this3.add();

            _this3._customEvent(EVENT_CLASS_TOGGLE, target, true, className);
          }
        });
      } else {
        classNames.forEach(function (className) {
          if (target.classList.contains(className)) {
            _this3._config.removeClass = className;

            _this3.remove();

            _this3._customEvent(EVENT_CLASS_TOGGLE, target, false, className);
          } else {
            _this3._config.addClass = className;

            _this3.add();

            _this3._customEvent(EVENT_CLASS_TOGGLE, target, true, className);
          }
        });
      }
    };

    _proto.class = function _class() {
      this._config.toggleClass = this._config.class;

      if (this._element.getAttribute('responsive')) {
        this._config.responsive = this._element.getAttribute('responsive');
      }

      this.toggle();
    } // Private
    ;

    _proto._target = function _target() {
      if (this._config.target === 'body') {
        return document.querySelector(this._config.target);
      }

      if (this._config.target === '_parent') {
        return this._element.parentNode;
      }

      return document.querySelector(this._config.target);
    };

    _proto._customEvent = function _customEvent(eventName, target, add, className) {
      var event = new CustomEvent(eventName, {
        detail: {
          target: target,
          add: add,
          className: className
        }
      });
      target.dispatchEvent(event);
    };

    _proto._breakpoint = function _breakpoint(className) {
      var breakpoints = this._config.breakpoints;
      return breakpoints.filter(function (breakpoint) {
        return breakpoint.length > 0;
      }).filter(function (breakpoint) {
        return className.includes(breakpoint);
      })[0];
    };

    _proto._breakpoints = function _breakpoints(className) {
      var breakpoints = this._config.breakpoints;
      return breakpoints.slice(0, breakpoints.indexOf(breakpoints.filter(function (breakpoint) {
        return breakpoint.length > 0;
      }).filter(function (breakpoint) {
        return className.includes(breakpoint);
      })[0]) + 1);
    };

    _proto._updateResponsiveClassNames = function _updateResponsiveClassNames(className) {
      var bp = this._breakpoint(className);

      return this._breakpoints(className).map(function (breakpoint) {
        return breakpoint.length > 0 ? className.replace(bp, breakpoint) : className.replace("-" + bp, breakpoint);
      });
    };

    _proto._includesResponsiveClass = function _includesResponsiveClass(className) {
      var _this4 = this;

      return this._updateResponsiveClassNames(className).filter(function (className) {
        return _this4._config.target.contains(className);
      });
    } // Static
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, this.constructor.Default, {}, Manipulator.getDataAttributes(this._element), {}, config);
      typeCheckConfig(NAME, config, this.constructor.DefaultType);
      return config;
    };

    ClassToggler.classTogglerInterface = function classTogglerInterface(element, config) {
      var data = Data.getData(element, DATA_KEY);

      var _config = typeof config === 'object' && config;

      if (!data) {
        data = new ClassToggler(element, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"" + config + "\"");
        }

        data[config]();
      }
    };

    ClassToggler.jQueryInterface = function jQueryInterface(config) {
      return this.each(function () {
        ClassToggler.classTogglerInterface(this, config);
      });
    };

    _createClass(ClassToggler, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType;
      }
    }]);

    return ClassToggler;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_CLASS_TOGGLER, function (event) {
    event.preventDefault();
    event.stopPropagation();
    var toggler = event.target;

    if (!toggler.classList.contains(CLASS_NAME_CLASS_TOGGLER)) {
      toggler = toggler.closest(SELECTOR_CLASS_TOGGLER);
    }

    if (typeof toggler.dataset.addClass !== 'undefined') {
      ClassToggler.classTogglerInterface(toggler, 'add');
    }

    if (typeof toggler.dataset.removeClass !== 'undefined') {
      ClassToggler.classTogglerInterface(toggler, 'remove');
    }

    if (typeof toggler.dataset.toggleClass !== 'undefined') {
      ClassToggler.classTogglerInterface(toggler, 'toggle');
    }

    if (typeof toggler.dataset.class !== 'undefined') {
      ClassToggler.classTogglerInterface(toggler, 'class');
    }
  });
  var $ = getjQuery();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   * add .xc-class-toggler to jQuery only if jQuery is present
   */

  if ($) {
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    $.fn[NAME] = ClassToggler.jQueryInterface;
    $.fn[NAME].Constructor = ClassToggler;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return ClassToggler.jQueryInterface;
    };
  }

  return ClassToggler;

})));
//# sourceMappingURL=class-toggler.js.map
