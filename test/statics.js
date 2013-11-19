var Modeler = (typeof window !== 'undefined' && window !== null) 
  ? require('fendjs-model') : require(process.env.FENDJS_MODEL ? '../lib-cov/' : '../lib/');
var assert = require('assert');

var User = Modeler('User')
  .attr('id', { type: 'number' })
  .attr('name', { type: 'string' })
  .attr('age', { type: 'number' });


describe('Model.attrs', function () {
  it('should hold the defined attrs', function (){
    assert('string' == User.attrs.name.type);
    assert('number' == User.attrs.age.type);
  })
})

describe('Model.all(fn)', function () {
  beforeEach(function (done) {
    var tobi = new User({ name: 'tobi', age: 2 });
    var loki = new User({ name: 'loki', age: 1 });
    var jane = new User({ name: 'jane', age: 8 });
    tobi.save(function () {
      loki.save(function () {
        jane.save(done);
      });
    });
  })

  afterEach(function (done) {
    User.destroyAll(done);
  });

  it('should respond with a collection of all', function (done) {
    User.all(function(err, users) {
      assert(!err);
      assert(3 == users.length());
      assert('tobi' == users.at(0).name());
      assert('loki' == users.at(1).name());
      assert('jane' == users.at(2).name());
      done();
    });
  })
})

describe('Model.get(id, fn)', function () {
  it('should error', function (done) {
    User.get('foo', function (err, model) {
      assert(err);
      assert(null == model);
      done();
    });
  });

  it('should get a model', function (done) {
    var tobi = new User({ name: 'tobi', age: 2 });
    tobi.save(function () {
      User.get(tobi.id(), function (err, model) {
        assert(!err);
        assert(tobi.name() === model.name());
        done();
      });
    });
  });
})
