import { map, filter, reduce, curry, log } from "../lib/fx.js";

const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

/**
 * # 코드를 값으로 다루어 표현력 높이기
 */

/**
 * ## go, pipe
 */

const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

go(
  0,
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100,
  log
);

const f = pipe(
  (a, b) => a + b,
  (a) => a + 10,
  (a) => a + 100
);

log(f(4, 1));

console.clear();

const add = (a, b) => a + b;

go(
  products,
  (products) => filter((p) => p.price < 20000, products),
  (products) => map((p) => p.price, products),
  (prices) => reduce(add, prices),
  log
);

/**
 * ## curry
 */

const mult = curry((a, b) => a * b);
log(mult(1)(2));

const mult3 = mult(3);
log(mult3(10));
log(mult3(5));
log(mult3(1));

/**
 * curry는 함수를 부분적으로 실행한다.
 * 즉, 실행을 기다리는 함수를 리턴하게 된다.
 * 그러면 go의 구조를 한번 생각해보자.
 * go는 함수들을 인자로 받으며, 해당 함수들을 재귀적으로 실행한다.
 * 이 재귀적으로 실행하는 부분을 reduce가 맡게 되는데,
 * reduce는 Iterator에 들어 있는 값들을 꺼내서, f 즉 전달한 함수를 실행한 후
 * 실행 결과를 acc에 합쳐주는 함수이다.
 * 결론적으로 go에서는 함수들의 배열이 Iterable로써 전달되고, 첫 값이
 * 첫번째 인자로 전달된다.
 * 그리고 전달된 첫 값을 Iterable인 List 안에 들어있는 함수들에 하나씩
 * 적용시켜서 반환시키는 작업을 해서 마지막 반환값까지 받아내는 것이다.
 * 그러면 map, filter, reduce에 curry를 적용하면 인자가 하나일 경우
 * 두번째 인자인 iterable을 받을 때까지 기다리는 함수를 리턴하게 된다.
 * go는 두 번째 인자인 함수들로부터 나온 반환값을 다음 함수에 적용하는
 * 것이니, curry가 적용되어 있다면 go를 더 효율적으로 아래와 같이
 * 사용할 수 있게 되는 것이다.
 */

go(
  products,
  filter((p) => p.price < 20000),
  map((p) => p.price),
  reduce(add),
  log
);

/**
 * # 함수 조합으로 함수 만들기
 */

console.clear();

const total_price = pipe(
  map((p) => p.price),
  reduce(add)
);

const base_total_price = (predi) => pipe(filter(predi), total_price);

go(
  products,
  base_total_price((p) => p.price < 20000),
  log
);

go(
  products,
  base_total_price((p) => p.price >= 20000),
  log
);
