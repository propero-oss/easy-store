import { createStoreAccessors } from "src/store/create-store-accessors";
import { MutableStore } from "src/store/types";
import { createSubscribable, StoreOptions, Subscriber } from "src/subscribable";

export function createStore<T>(value: T, options?: StoreOptions<T>): MutableStore<T> {
  const {
    notify,
    subscribe: sub,
    unsubscribe,
  } = createSubscribable<[value: T, before?: T]>(options);
  const { get, set, update } = createStoreAccessors(notify, value);
  const { immediatelyNotify = false } = options ?? {};

  function subscribe(handler: Subscriber<[value: T, before?: T]>) {
    if (immediatelyNotify) handler(get());
    return sub(handler);
  }

  return { subscribe, unsubscribe, get, set, update };
}
