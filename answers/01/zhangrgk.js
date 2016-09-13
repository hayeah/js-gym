let o = {a: 1, b: 2, c: 3};

for(let [k, v] of range(o)) {
  console.log(`${k} => ${v}`);
}
/*
Output:

a => 1
b => 2
c => 3
*/


let a = [1, 2, 3];
for(let [i, v] of range(a)) {
  console.log(`${i} => ${v}`);
}
/*
Output:

0 => 1
1 => 2
2 => 3
*/

function* range(o) {
  for(let i of Object.keys(o)) {
    yield [i, o[i]];
  }
};