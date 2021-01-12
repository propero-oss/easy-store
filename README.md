[![Maintainability](https://api.codeclimate.com/v1/badges/cfc752577cf502adf125/maintainability)](https://codeclimate.com/github/propero-oss/easy-store/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/cfc752577cf502adf125/test_coverage)](https://codeclimate.com/github/propero-oss/easy-store/test_coverage)

# easy-store
Simple, intuitive, functional reactive stores for typescript

    npm i @propero/easy-store

## Getting started
Create a simple store with createStore:

```typescript
import { createStore } from "@propero/easy-store";

// The typings for the store are deferred from initialValue
const myStore = createStore(initialValue);

// If you want to broaden the type of the store, you can explicitly
// define it like this
const myTypedStore = createStore<undefined | number>(undefined);
```

Accessing or updating the current value of a store is as easy as calling getValue and setValue.

```typescript
console.log(myStore.getValue());
myStore.setValue(newValue);
```

Additionally, you can use the update function to change the value of a store based on its current value.

```typescript
myStore.update(value => newValue);
// myStore.getValue() is now newValue

// also works with promises
myStore.update(async value => {
  await sleep(100);
  return newValue;
});
// myStore.getValue() is newValue when the promise resolves
```

You can subscribe or unsubscribe to change in a store using the sub and unsub functions.

```typescript
myStore.setValue(0);
myStore.sub((newVal, oldVal) => console.log(`Change from ${oldVal} to ${newVal}`));

myStore.setValue(10);
// => Change from 0 to 10

myStore.setValue(5);
// => Change from 10 to 5
```

If you have calculated state depending on multiple stores, you can derive a read-only store from them using deriveStore.
The first argument of deriveStore is its dependent stores, the second is a function that takes the store values as arguments and returns the store value.
```typescript
const firstStore = createStore(10);
const secondStore = createStore(20);
const maxStore = deriveStore([firstStore, secondStore], Math.max);
// maxStore.getValue() => 20

secondStore.setValue(5);
// maxStore.getValue() => 10
```

This module also exposes a createSubscribable method to create simple pub-subs.
```typescript
const { sub, unsub, notify } = createSubscribable();
sub(console.log);
notify("Hello World");
// => Hello World
```

All stores and subscribables have a limit to the number of listeners that can be subscribed and will throw once this limit is exceeded.
By default, this limit is set to 100 listeners.
This is, so you don't accidentally subscribe to a store in a loop, event listener or render cycle.
If you need the limit to be higher, you can provide an options object as the last parameter to creation methods like this:
```typescript
const unlimitedStore = createStore(5, { limit: Infinity });
const almostUnlimitedStore = createStore(2, { limit: 10000 });
const unlimitedSubscribable = createSubscribable({ limit: Infinity });
```
