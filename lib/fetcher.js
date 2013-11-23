/**
 * Module(s)
 */

var Collection = require('fendjs-collection');
var uuid = require('./loader').uuid;
var object = require('./loader').object;
var noop = function () {};

/**
 * Export(s)
 */
exports.Fetcher = Fetcher;


/**
 * OnMemory Fetcher
 */
function Fetcher () {
  this._store = {};
}

Fetcher.prototype.destroy = function (model, fn) {
  try {
    model.Model.emit('destroying', model);
    model.emit('destroying');

    delete this._store[model.Model.modelName][model.primary()];

    model.destroyed = true;
    model.Model.emit('destroy', model);
    model.emit('destroy');

    return fn(null);
  } catch (e) {
    return fn(e);
  }
};

Fetcher.prototype.save = function (model, fn) {
  var key = model.Model.primaryKey;
  fn = fn || noop;
  if (!model.isValid()) return fn(new Error('validation failed'));

  try {
    if (!this._store[model.Model.modelName]) {
      this._store[model.Model.modelName] = {};
    }

    model.Model.emit('saving', model);
    model.emit('saving');

    var id = uuid.v4();
    this._store[model.Model.modelName][id] = model.toJSON();

    model.primary(id);
    model.dirty = {};
    model.Model.emit('save', model);
    model.emit('save');

    return fn(null);
  } catch (e) {
    return fn(e);
  }
};

Fetcher.prototype.update = function (model, fn) {
  fn = fn || noop;
  if (!model.isValid()) return fn(new Error('validation failed'));

  try {
    model.Model.emit('saving', model);
    model.emit('saving');

    this._store[model.Model.modelName][model.primary()] = model.toJSON();

    model.dirty = {};
    model.Model.emit('save', model);
    model.emit('save');

    return fn(null);
  } catch (e) {
    return fn(e);
  }
};

Fetcher.prototype.destroyAll = function (Model, fn) {
  try {
    var models = this._store[Model.modelName];
    object.keys(models).forEach(function (id) {
      delete models[id];
    });
    return fn(null, []);
  } catch (e) {
    return fn(e);
  }
};

Fetcher.prototype.all = function (Model, fn) {
  try {
    var col = new Collection;
    var models = this._store[Model.modelName];
    object.keys(models).forEach(function (id) {
      col.push(new Model(models[id]));
    });
    return fn(null, col);
  } catch (e) {
    return fn(e);
  }
};

Fetcher.prototype.get = function (Model, id, fn) {
  try {
    return fn(null, new Model(this._store[Model.modelName][id]));
  } catch (e) {
    return fn(e);
  }
};
