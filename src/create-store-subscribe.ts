import { StoreGetter, SubscribeFunction } from "src/types";

export function createStoreSubscribe<T>(
  sub: SubscribeFunction<[newValue: T, oldValue?: T]>,
  get: StoreGetter<T>,
  immediatelyNotify?: boolean
): SubscribeFunction<[newValue: T, oldValue?: T]> {
  if (!immediatelyNotify) return sub;
  return function subscribe(listeners) {
    const fns = Array.isArray(listeners) ? [...listeners] : [listeners];
    for (const fn of fns) fn(get());
    return sub(fns);
  };
}
