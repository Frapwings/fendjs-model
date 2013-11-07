/**
 * Module dependencies.
 */

var proto = require('./proto');
var statics = require('./static');
var Emitter = require('./loader').Emitter;

/**
 * Expose `createModel`.
 */

module.exports = createModel;

/**
 * Create a new model constructor with the given `name`.
 *
 * @param {String} name
 * @return {Function}
 * @api public
 */

function createModel(name) {
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
    this.model.emit('construct', this, attrs);
  }

  // mixin emitter

  Emitter(Model);

  // statics

  Model.modelName = name;
  Model._base = '/' + name.toLowerCase() + 's';
  Model.attrs = {};
  Model.validators = [];
  Model._headers = {};
  for (var key in statics) Model[key] = statics[key];

  // prototype

  Model.prototype = {};
  Model.prototype.model = Model;
  for (var key in proto) Model.prototype[key] = proto[key];

  return Model;
}

