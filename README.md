# Thunk
> A simple, chain-able utility function that wraps `setTimeout`

### Installation:
`npm i @thr1ve/thunk`

### Usage:
`thunk(ms, fn)`
 - `ms`: The number of milliseconds to wait before invoking `fn`
 - `fn`: A function to execute

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
