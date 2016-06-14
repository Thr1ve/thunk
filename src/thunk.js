export default function thunk(time, fn) {
  let funcs = [];
  let ids = [];
  let cont = true;

  const add = (ms, cb) => {
    funcs.push({ ms, cb });
    return { thunk: add };
  };

  const cancel = () => {
    ids.forEach(id => clearTimeout(id));
  };

  const stop = () => {
    cont = false;
  };

  add(time, fn);

  tick(funcs);

  return {
    thunk(m, f) {
      add(m, f);
      return { thunk: add };
    }
  };

  function tick(arr) {
    const { ms, cb } = arr.shift();
    let id = setTimeout(() => {
      cb(stop);
      if (!cont) {
        cancel();
      } else if (arr.length) {
        tick(arr);
      }
    }, ms);
    ids.push(id);
  }
}
