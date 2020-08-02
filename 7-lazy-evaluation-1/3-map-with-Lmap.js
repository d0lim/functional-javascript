import { curry, go, pipe, reduce, log, L, take } from "../lib/fx.js";

console.clear();

const takeAll = take(Infinity);

/**
 * ## L.map + take로 map 만들기
 */

const map = curry(pipe(L.map, takeAll));

log(map((a) => a + 10, L.range(4)));

/**
 * ## L.filter + take로 filter 만들기
 */

const filter = curry(pipe(L.filter, takeAll));

log(filter((a) => a % 2, L.range(4)));
