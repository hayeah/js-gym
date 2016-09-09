const assert = require('assert');
const range = require('../answer.js').range;

let o = {a: 1, b: 2, c: 3};

for(let [k, v] of range(o)) {
  assert.equal(o[k], v);
}

let a = [1, 2, 3];
for(let [i, v] of range(a)) {
  assert.equal(a[i], v);
}

