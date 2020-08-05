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
  flatten,
} from "../lib/fx.js";

console.clear();

/**
 * ## 2차원 배열 다루기
 */

const arr = [
  [1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10],
];

go(
  arr,
  L.flatten,
  L.filter((a) => a % 2),
  take(3),
  log
);
