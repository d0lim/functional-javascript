import {
  curry,
  go,
  pipe,
  map,
  reduce,
  filter,
  log,
  L,
  take,
  takeAll,
} from "../lib/fx.js";

console.clear();

/**
 * ## L.flatten
 */

// log([[1, 2], 3, 4, [5, 6], [7, 8, 9]]);
// log([...[1, 2], 3, 4, ...[5, 6], ...[7, 8, 9]]);

const isIterable = (a) => a && a[Symbol.iterator];

L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* a;
    // yield *iterable; is equal to for(const val of iterable) yield val;
    else yield a;
  }
};

var it = L.flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]]);
// log(it.next());
// log(it.next());
// log(it.next());

log([...it]);

log(take(6, L.flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]])));

const flatten = pipe(L.flatten, takeAll);
log(flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]]));

L.deepFlat = function* f(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* f(a);
    else yield a;
  }
};

log([...L.deepFlat([1, [2, [3, 4], [[5]]]])]);
