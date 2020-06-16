const log = console.log;

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

const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

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
