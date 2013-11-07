/**
 * module loader
 */

exports.Emitter = (typeof window !== 'undefined' && window !== null)
  ? require('emitter') : require('emitter-component');
exports.each = (typeof window !== 'undefined' && window !== null)
  ? require('each') : require('each-component');
