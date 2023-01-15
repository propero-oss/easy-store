import { createStore } from "src/store/create-store";
import { Destroyable, ReadOnlyStore } from "src/store/types";
import { Subscribable, SubscribableArgs, SubscribableValueGenerator, subscribe as sub } from "src/subscribable";

const passThrough = <T extends unknown[]>(...args: T): T => args;

export function storeFromSubscribable<Sub extends Subscribable, Value = SubscribableArgs<Sub>>(
  subscribable: Sub,
  value: Value,
  compute: SubscribableValueGenerator<Sub, Value> = passThrough as any
): ReadOnlyStore<Value> & Destroyable {
  const { update, subscribe, unsubscribe, get } = createStore<Value>(value);
  const { destroy } = sub(subscribable, (...args) => {
    update(() => compute(...args));
  });
  return { subscribe, unsubscribe, get, destroy };
}
