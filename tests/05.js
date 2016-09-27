const assert = require('assert'); 
eval(require('../answer.js')+''); 

assert.deepEqual(
  objectAssign({foo: 0}, {bar: 1}), 
  {foo: 0, bar:1});

assert.deepEqual(
  objectAssign({foo: 0}, {bar: 1}, {baz: 2}), 
  {foo: 0, bar: 1, baz: 2});

assert.deepEqual(
  objectAssign({foo: 0}, {foo: 1}, {foo: 2}),
  {foo: 2});

assert.deepEqual(
  objectAssign({foo: 0}, null, {bar: 1}, undefined), 
  {foo: 0, bar: 1});

