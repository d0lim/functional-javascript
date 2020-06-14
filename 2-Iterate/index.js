const log = console.log;

/**
 * 기존과 달라진 ES6에서의 리스트 순회
 * - for i++
 * - for of
 */

// ES5
const list = [1, 2, 3];
for (var i = 0; i < list.length; i++) {
  log(list[i]);
}
const str = "abc";
for (var i = 0; i < list.length; i++) {
  log(str[i]);
}

// ES6
for (const a of list) {
  log(a);
}
for (const a of str) {
  log(a);
}

/**
 * Array를 통해 알아보기
 */

log("Arr -----------------");
const arr = [1, 2, 3];
log(arr[Symbol.iterator]);
for (const a of arr) log(a);

/**
 * Set을 통해 알아보기
 */

log("Set -----------------");
const set = new Set([1, 2, 3]);
for (const a of set) log(a);

/**
 * Map을 통해 알아보기
 */

log("Map -----------------");
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
for (const a of map.keys()) log(a);
for (const a of map.values()) log(a);
for (const a of map.entries()) log(a);

/**
 * ## 이터러블 / 이터레이터
 * - 이터러블 : 이터레이터를 리턴하는 [Symbol.iterator]() 를 가진 값. 이터러블[Symbol.iterator]()를 실행하면 이터레이터가 리턴된다는 뜻
 * - 이터레이터 : { value, done } 객체를 리턴하는 next() 를 가진 값. 이터레이터.next()를 호출하면 { value, done }가 리턴된다는 뜻
 * - 이터러블 / 이터레이터 프로토콜 : 이터러블을 for ... of, 전개 연산자(...) 등과 함께 동작하도록 하는 프로토콜(규약)
 */
