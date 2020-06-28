import { curry, go, pipe, map, reduce, filter, log, L } from "../lib/fx.js";

console.clear();

/**
 * # 이터러블 중심 프로그래밍에서의 지연 평가 (Lazy Evaluation)
 * - 제때 계산법
 * - 느긋한 계산법
 * - 제너레이터 / 이터레이터 프로토콜을 기반으로 구현
 */

/**
 * ### L.map
 */

L.map = curry(function* (f, iter) {
  for (const a of iter) yield f(a);
});

const it = L.map((a) => a + 10, [1, 2, 3]);
log([...it]);

/**
 * ### L.filter
 */

L.filter = curry(function* (f, iter) {
  for (const a of iter) if (f(a)) yield a;
});

const it2 = L.filter((a) => a % 2, [1, 2, 3, 4]);
log([...it2]);

console.clear();

/**
 * ### range, map, filter, take, reduce 중첩 사용
 */

const range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length == l) return res;
  }
  return res;
});

go(
  range(10),
  map((n) => n + 10),
  filter((n) => n % 2),
  take(2),
  log
);

/**
 * ### L.range, L.map, L.filter, take, reduce 중첩 사용
 */

go(
  L.range(10),
  L.map((n) => n + 10),
  L.filter((n) => n % 2),
  take(2),
  log
);
