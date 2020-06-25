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
