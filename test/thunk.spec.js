import test from 'ava';
import { spy, useFakeTimers, match } from 'sinon';

import thunk from '../src/index';

test.beforeEach(t => {
  t.context.clock = useFakeTimers();
});

test.afterEach(t => {
  t.context.clock.restore();
});

test('calls the provided callback function after n milliseconds', t => {
  const { clock } = t.context;
  const callback = spy();

  thunk(100, callback);

  clock.tick(99);
  t.false(callback.called);

  clock.tick(1);
  t.true(callback.called);
});

test('is synchronous when chained', t => {
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

test('passes a "stop" function to the provided callback function', t => {
  const { clock } = t.context;
  const callback = spy();

  thunk(100, callback);
  clock.tick(100);
  t.true(callback.withArgs(match.func).calledOnce);
});

test('the "stop" function aborts all thunks in chain when invoked', t => {
  const { clock } = t.context;
  const stopper = function (stop) {
    stop();
  };
  const stopSpy = spy(stopper);
  const callback = spy();

  thunk(100, callback)
    .thunk(100, stopSpy)
    .thunk(100, callback)
    .thunk(100, callback);

  clock.tick(100);
  t.true(callback.calledOnce);

  clock.tick(100);
  t.true(stopSpy.calledOnce);

  clock.tick(100);
  t.true(callback.calledOnce);

  clock.tick(100);
  t.true(callback.calledOnce);
});
