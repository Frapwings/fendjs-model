/**
 * Module dependencies.
 */

var proto = require('./proto');
var statics = require('./static');
var Fetcher = require('./fetcher').Fetcher;
var Emitter = require('./loader').Emitter;

/**
 * Expose `Modeler`.
 */

module.exports = Modeler;


var plugins = [];


/**
 * Create a new model constructor with the given `name`.
 *
 * @param {String} name
 * @return {Function}
 * @api public
 */

function Modeler(name) {
  if ('string' != typeof name) throw new TypeError('model name required');

  /**
   * Initialize a new model with the given `attrs`.
   *
   * @param {Object} attrs
   * @api public
   */

  function Model(attrs) {
    if (!(this instanceof Model)) return new Model(attrs);
    attrs = attrs || {};
    this._callbacks = {};
    this.attrs = attrs;
    this.dirty = attrs;
    this.Model.emit('construct', this, attrs);
  }

  // mixin emitter

  Emitter(Model);
  
  var fetcher = new Fetcher();

  // statics

  Model.modelName = name;
  Model.attrs = {};
  Model.validators = [];
  Model.fetcher = fetcher;
  for (var key in statics) Model[key] = statics[key];

  // prototype

  Model.prototype = {};
  Model.prototype.Model = Model;
  Model.prototype.fetcher = fetcher;
  for (var key in proto) Model.prototype[key] = proto[key];


  if (plugins.length > 0) {
    for (var plugin in plugins) {
      Model.use(plugin);
    }
  } else {
    // Enable default Restful model
    Model.use(function (Model) {
      Model._base = '/' + name.toLowerCase() + 's';
      Model._headers = {};

      var statics = require('./rest/static');
      for (var key in statics) Model[key] = statics[key];

      var proto = require('./rest/proto');
      for (var key in proto) Model.prototype[key] = proto[key];
    });
  }

  return Model;
}

/**
 * Use the given plugin `fn() on all model`.
 *
 * @param {Function} fn
 * @return {Function} Modeler
 * @api public
 */

Modeler.use = function (fn) {
  plugins.push(fn);
  return this;
};
