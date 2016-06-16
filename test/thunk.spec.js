import test from 'ava';
import { spy, useFakeTimers } from 'sinon';

import thunk from '../src/thunk';

test.beforeEach(t => {
  t.context.clock = useFakeTimers();
});

test.afterEach(t => {
  t.context.clock.restore();
});

test('should call the provided callback function after n milliseconds', t => {
  const { clock } = t.context;
  const callback = spy();

  thunk(100, callback);

  clock.tick(99);
  t.false(callback.called);

  clock.tick(1);
  t.true(callback.called);
});

test('should be synchronous when chained', t => {
  const { clock } = t.context;
  const callback = spy();

  thunk(100, callback).thunk(200, callback);

  clock.tick(100);
  t.true(callback.calledOnce);

  clock.tick(199);
  t.false(callback.calledTwice);

  clock.tick(1);
  t.true(callback.calledTwice);
});
