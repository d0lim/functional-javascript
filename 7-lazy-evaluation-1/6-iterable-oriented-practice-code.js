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
 * ## 지연성 / 이터러블 중심 프로그래밍 실무적인 코드
 */

var users = [
  {
    name: "a",
    age: 21,
    family: [
      { name: "a1", age: 53 },
      { name: "a2", age: 47 },
      { name: "a3", age: 16 },
      { name: "a4", age: 15 },
    ],
  },
  {
    name: "b",
    age: 24,
    family: [
      { name: "b1", age: 58 },
      { name: "b2", age: 51 },
      { name: "b3", age: 19 },
      { name: "b4", age: 22 },
    ],
  },
  {
    name: "c",
    age: 31,
    family: [
      { name: "c1", age: 64 },
      { name: "c2", age: 62 },
    ],
  },
  {
    name: "d",
    age: 20,
    family: [
      { name: "d1", age: 42 },
      { name: "d2", age: 42 },
      { name: "d3", age: 11 },
      { name: "d4", age: 7 },
    ],
  },
];

const add = (a, b) => a + b;

go(
  users,
  L.map((u) => u.family),
  L.flatten,
  L.filter((u) => u.age < 20),
  L.map((u) => u.age),
  take(4),
  reduce(add),
  log
);
