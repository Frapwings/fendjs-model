/**
 * Module(s)
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

function Modeler (name) {
  if ('string' != typeof name) throw new TypeError('model name required');

  /**
   * Initialize a new model with the given `attrs`.
   *
   * @param {Object} attrs
   * @api public
   */

  function Model (attrs) {
    if (!(this instanceof Model)) return new Model(attrs);
    attrs = attrs || {};
    this._callbacks = {};
    this.attrs = attrs;
    this.dirty = attrs;
    this.fetcher = this.Model.createFetcher ? this.Model.createFetcher() : new Fetcher();
    this.Model.emit('construct', this, attrs);
  }

  // mixin emitter

  Emitter(Model);
  
  // statics

  Model.modelName = name;
  Model.attrs = {};
  Model.validators = [];
  for (var key in statics) Model[key] = statics[key];

  // prototype

  Model.prototype = {};
  Model.prototype.Model = Model;
  for (var key in proto) Model.prototype[key] = proto[key];


  if (plugins.length > 0) {
    for (var i = 0; i < plugins.length; i++) {
      Model.use(plugins[i]);
    }
  } else {
    // Enable default on memory fetcher
    Model.use(function (Model) {
      Model.fetcher = new Fetcher();
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
