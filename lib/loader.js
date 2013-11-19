/**
 * module loader
 */

exports.Emitter = (typeof window !== 'undefined' && window !== null)
  ? require('emitter') : require('emitter-component');
exports.each = (typeof window !== 'undefined' && window !== null)
  ? require('each') : require('each-component');
exports.object = (typeof window !== 'undefined' && window !== null)
  ? require('object') : require('object-component');
exports.uuid = (typeof window !== 'undefined' && window !== null)
  ? require('node-uuid') : require('uuid');
