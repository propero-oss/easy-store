import { StoreReadAccessors, StoreUpdater, StoreWriteAccessors } from "src/store/types";
import { SubscribableNotify } from "src/subscribable";
import { isPromise } from "src/util";

export function createStoreAccessors<T>(
  notify: SubscribableNotify<[value: T, before: T]>,
  value: T
): StoreReadAccessors<T> & StoreWriteAccessors<T> {
  function getValue(): T {
    return value;
  }

  function setValue(newVal: T): void {
    const before = value;
    value = newVal;
    if (newVal !== before) notify(newVal, before);
  }

  // Type of updater is not narrowed by isPromise<result> so return statements here
  // cause superfluous errors therefore return type is any. Correct typing is defined
  // in StoreWriteAccessors type
  function update(updater: StoreUpdater<T>): any {
    const result = updater(getValue());
    if (!isPromise(result)) return setValue(result);
    return result.then(setValue);
  }

  return { getValue, setValue, update };
}
