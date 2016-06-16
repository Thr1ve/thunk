import thunk from './index';

export default function thunkify(interval, fns) {
  return fns.reduce((prev, cur) => prev.thunk(interval, cur), { thunk });
}
