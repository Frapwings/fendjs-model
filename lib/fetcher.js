/**
 * module(s)
 */

var Collection = require('fendjs-collection');
var request = require('superagent');
var noop = function () {};

/**
 * export(s)
 */
exports.Fetcher = Fetcher;


/**
 * Fetcher
 */
function Fetcher () {
}

Fetcher.prototype.destroy = function (model, error, fn) {
  var self = model;
  var url = model.url();
  model.model.emit('destroying', model);
  model.emit('destroying');
  request
    .del(url)
    .set(model.model._headers)
    .end(function (res) {
      if (res.error) return fn(error(res), res);
      self.destroyed = true;
      self.model.emit('destroy', self, res);
      self.emit('destroy');
      fn(null, res);
    });
};

Fetcher.prototype.save = function (model, error, fn) {
  var self = model;
  var url = model.model.url();
  var key = model.model.primaryKey;
  fn = fn || noop;
  if (!model.isValid()) return fn(new Error('validation failed'));
  model.model.emit('saving', model);
  model.emit('saving');
  request
    .post(url)
    .set(model.model._headers)
    .send(self)
    .end(function (res) {
      if (res.error) return fn(error(res), res);
      if (res.body) self.primary(res.body[key]);
      self.dirty = {};
      self.model.emit('save', self, res);
      self.emit('save');
      fn(null, res);
    });
};

Fetcher.prototype.update = function (model, error, fn) {
  var self = model;
  var url = model.url();
  fn = fn || noop;
  if (!model.isValid()) return fn(new Error('validation failed'));
  model.model.emit('saving', model);
  model.emit('saving');
  request
    .put(url)
    .set(model.model._headers)
    .send(self)
    .end(function(res){
      if (res.error) return fn(error(res), res);
      self.dirty = {};
      self.model.emit('save', self, res);
      self.emit('save');
      fn(null, res);
    });
};

Fetcher.prototype.destroyAll = function (model, error, fn) {
  var Model = model;
  var url = Model.url('');
  request
    .del(url)
    .set(Model._headers)
    .end(function (res) {
      if (res.error) return fn(error(res), null, res);
      fn(null, [], res);
    });
};

Fetcher.prototype.all = function (model, error, fn) {
  var Model = model;
  var url = Model.url('');
  request
    .get(url)
    .set(Model._headers)
    .end(function (res) {
      if (res.error) return fn(error(res), null, res);
      var col = new Collection;
      for (var i = 0, len = res.body.length; i < len; ++i) {
        col.push(new Model(res.body[i]));
      }
      fn(null, col, res);
    });
};

Fetcher.prototype.get = function (model, error, id, fn) {
  var Model = model;
  var url = Model.url(id);
  request
    .get(url)
    .set(Model._headers)
    .end(function (res) {
      if (res.error) return fn(error(res), null, res);
      var model = new Model(res.body);
      fn(null, model, res);
    });
};
