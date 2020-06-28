import { curry, go, pipe, map, reduce, filter, log } from "../lib/fx.js";

/**
 * ## range
 */

const add = (a, b) => a + b;

const range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

log(range(5));
// [0, 1, 2, 3, 4]

console.clear();

var list = range(4);

log(reduce(add, list));

/**
 * ## 느긋한 L.range
 */

console.clear();

const L = {};
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

var list = range(4);
log(list);
log(reduce(add, list));

function test(name, time, f) {
  console.time(name);
  while (time--) f();
  console.timeEnd(name);
}

// test("range", 10, () => reduce(add, range(10000000)));
// test("range", 10, () => reduce(add, L.range(10000000)));

console.clear();

/**
 * ## take
 */

const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length == l) return res;
  }
  return res;
});

console.time("");
go(range(100000), take(5), reduce(add), log);
console.timeEnd("");

console.time("");
go(L.range(100000), take(5), reduce(add), log);
console.timeEnd("");
