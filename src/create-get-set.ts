import {
  NotifyFunction,
  StoreGetter,
  StoreSetter,
  UpdateFunction,
} from "src/types";

export function createGetSet<T>(
  initial: T,
  notify: NotifyFunction<[newVal: T, oldVal?: T]>
): [get: StoreGetter<T>, set: StoreSetter<T>] {
  let value: T = initial;
  let oldValue: T | undefined = undefined;

  return [
    () => value,
    function set(newValue: T | UpdateFunction<T>): void | Promise<void> {
      if (typeof newValue === "function")
        return Promise.resolve((newValue as UpdateFunction<T>)(value)).then(
          set
        );
      oldValue = value;
      value = newValue;
      notify(value, oldValue);
    } as any,
  ];
}
