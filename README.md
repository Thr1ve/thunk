# Thunk
> A simple, chain-able utility function that wraps `setTimeout`

### Installation:
`npm i @thr1ve/thunk`

### Usage:
`thunk(ms, fn)`
 - `ms`: The number of milliseconds to wait before invoking `fn`
 - `fn`: A function to execute
   - `stop`: A function available as a param within `fn` that, when invoked, will cancel all thunks in the chain.

```javascript
import thunk from '@thr1ve/thunk';

thunk(200, () => console.log('beep'));
// logs "beep" to the console after 200 milliseconds
```

##### chaining:
You can chain thunk as many times as you like! it will execute each thunk in a synchronous manner (without blocking the execution of your code).

```javascript
import thunk from '@thr1ve/thunk';

const beep = () => console.log('beep');
const boop = () => console.log('boop');
const bzzt = () => console.log('bzzt');

thunk(200, beep)
  .thunk(100, boop)
  .thunk(300, bzzt);
// logs "beep" to the console after 200 milliseconds
// logs "boop" to the console 100 milliseconds after "beep"
// logs "bzzt" to the console 300 milliseconds after "boop"
```

##### stopping:
The callback passed to `thunk` will also have a `stop` function available as the first parameter. Invoking `stop` will cancel the entire `thunk` chain.

```javascript
import thunk from '@thr1ve/thunk';

const beep = () => console.log('beep');
const boop = () => console.log('boop');
const bzzt = () => console.log('bzzt');

const cancel = stop => {
  if (true) {
    stop();
  }
}

thunk(200, beep)
  .thunk(100, boop)
  .thunk(100, cancel)
  .thunk(300, bzzt);
// logs "beep" to the console after 200 milliseconds
// logs "boop" to the console 100 milliseconds after "beep"
// after another 100 milliseconds, the `cancel` function will invoke `stop`, halting the entire thunk chain
// the function `bzzt` will never be invoked, and "bzzt" will never be logged to the console
```

##### Also available: `thunkify`
If you have many functions you'd like to execute, writing `.thunk` for each individual function may be frustrating. In this case, there is also a `thunkify` function available!

`thunkify(ms, arrayOfFns)`
 - `ms`: The number of milliseconds to wait before invoking the next function in the array
 - `arrayOfFns`: an array of functions to execute

```javascript
import { thunkify } from '@thr1ve/thunk';

const beep = () => console.log('beep');
const boop = () => console.log('boop');
const bzzt = () => console.log('bzzt');

thunkify(200, [beep, boop, bzzt]);
// logs "beep" to the console after 200 milliseconds
// logs "boop" to the console 200 milliseconds after "beep"
// logs "bzzt" to the console 200 milliseconds after "boop"
```
