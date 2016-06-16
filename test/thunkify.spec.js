import test from 'ava';
import { spy, useFakeTimers, match } from 'sinon';

import { thunkify } from '../src/index';

test.beforeEach(t => {
  t.context.clock = useFakeTimers();
});

test.afterEach(t => {
  t.context.clock.restore();
});

test('is a function', t => {
  t.is(typeof thunkify, 'function');
});

test('calls the next function in the provided array every n milliseconds', t => {
  const { clock } = t.context;
  const callback = spy();
  thunkify(100, [
    callback,
    callback
  ]);

  clock.tick(99);
  t.false(callback.calledOnce);

  clock.tick(1);
  t.true(callback.calledOnce);

  clock.tick(99);
  t.false(callback.calledTwice);

  clock.tick(1);
  t.true(callback.calledTwice);
});
