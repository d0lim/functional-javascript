const log = console.log;

const apply1 = (f) => f(1);
const add2 = (a) => a + 2;
log(apply1(add2));
log(apply1((a) => a - 1));

const times = (f, n) => {
  let i = -1;
  while (++i < n) f(i);
};

times(log, 3);
times((a) => log(a + 10), 3);
