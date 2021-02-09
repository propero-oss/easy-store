import { createStore } from "src/store/create-store";
import { Destroyable, ReadOnlyStore } from "src/store/types";
import {
  Subscribable,
  SubscribableArgs,
  SubscribableValueGenerator,
  subscribe,
} from "src/subscribable";

const passThrough = <T extends unknown[]>(...args: T): T => args;

export function storeFromSubscribable<Sub extends Subscribable, Value = SubscribableArgs<Sub>>(
  subscribable: Sub,
  value: Value,
  compute: SubscribableValueGenerator<Sub, Value> = passThrough as any
): ReadOnlyStore<Value> & Destroyable {
  const { update, sub, unsub, getValue } = createStore<Value>(value);
  const { destroy } = subscribe(subscribable, (...args) => {
    update(() => compute(...args));
  });
  return { sub, unsub, getValue, destroy };
}
