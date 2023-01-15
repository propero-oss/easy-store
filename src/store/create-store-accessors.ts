import { StoreReadAccessors, StoreUpdater, StoreWriteAccessors } from "src/store/types";
import { isPromise } from "src/util";

export function createStoreAccessors<T>(
  notify: (value: T, before: T) => void,
  value: T
): StoreReadAccessors<T> & StoreWriteAccessors<T> {
  function get(): T {
    return value;
  }

  function set(newVal: T): void {
    const before = value;
    value = newVal;
    if (newVal !== before) notify(newVal, before);
  }

  function update(updater: StoreUpdater<T>): any {
    const result = updater(get());
    if (!isPromise(result)) return set(result);
    return result.then(set);
  }

  return { get, set, update };
}
