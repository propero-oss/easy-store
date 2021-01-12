import { createStoreAccessors } from "src/store/create-store-accessors";
import { MutableStore } from "src/store/types";
import { createSubscribable, SubscribableOptions } from "src/subscribable";

export function createStore<T>(value: T, options?: SubscribableOptions): MutableStore<T> {
  const { notify, sub, unsub } = createSubscribable<[value: T, before: T]>(options);
  const { getValue, setValue, update } = createStoreAccessors(notify, value);
  return { sub, unsub, getValue, setValue, update };
}
