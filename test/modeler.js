var Modeler = (typeof window !== 'undefined' && window !== null) 
  ? require('fendjs-model') : require(process.env.FENDJS_MODEL ? '../lib-cov/' : '../lib/');
var assert = require('assert');


describe('Modeler(name)', function () {
  it('should return a new model constructor', function () {
    var Something = Modeler('Something');
    assert('function' == typeof Something);
  })
});

describe('Modeler.use(fn)', function () {
  it('should extend model', function () {
    var ret = Modeler.use(function (Model) {
      assert(Model);
    });
    assert(ret === Modeler);
    var User = Modeler('User')
      .attr('id')
      .attr('name');
    assert(User);
  });
});
