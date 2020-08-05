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

console.clear();

/**
 * ## L.flatMap
 */

L.flatMap = curry(pipe(L.map, L.flatten));
const flatMap = curry(pipe(L.map, flatten));

var it = L.flatMap(
  map((a) => a * a),
  [
    [1, 2],
    [3, 4],
    [5, 6, 7],
  ]
);
log([...it]);

log(
  flatMap((a) => a, [
    [1, 2],
    [3, 4],
    [5, 6, 7],
  ])
);

log(
  flatMap(
    L.range,
    map((a) => a + 1, [1, 2, 3])
  )
);

var it = L.flatMap(
  L.range,
  map((a) => a + 1, [1, 2, 3])
);

log(it.next());
log(it.next());
log(it.next());
log(it.next());
log(it.next());
log(it.next());

log(
  take(
    3,
    L.flatMap(
      L.range,
      map((a) => a + 1, [1, 2, 3])
    )
  )
);
