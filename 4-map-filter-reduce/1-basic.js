import { map, filter, reduce, log } from "../lib/fx.js";

const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

/**
 * # map
 */

log(map((p) => p.name, products));
log(map((p) => p.price, products));

// let names = [];
// for (const p of products) {
//   names.push(p.name);
// }
// log(names);

// let prices = [];
// for (const p of products) {
//   prices.push(p.price);
// }
// log(prices);

/**
 * # 이터러블 프로토콜을 따른 map의 다형성
 */

function* gen() {
  yield 2;
  if (false) yield 3;
  yield 4;
}

log(map((a) => a * a, gen()));

let m = new Map();
m.set("a", 10);
m.set("b", 20);
const it = m[Symbol.iterator]();
log(new Map(map(([k, a]) => [k, a * 2], m)));

/**
 * # filter
 */

log(...filter((p) => p.price < 20000, products));

log(filter((n) => n % 2, [1, 2, 3, 4]));

log(
  filter(
    (n) => n % 2,
    (function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    })()
  )
);

/**
 * # reduce
 */

const nums = [1, 2, 3, 4, 5];

let total = 0;
for (const n of nums) {
  total += n;
}
log(total);

const add = (a, b) => a + b;

log(reduce(add, 0, [1, 2, 3, 4, 5]));

log(reduce(add, [1, 2, 3, 4, 5]));

log(reduce((total_price, product) => total_price + product.price, 0, products));

/**
 * 사실상 이터러블을 따르는 모든 것들은 map, filter, reduce 할 수가 있다.
 */
