import { createStore } from "src/store/create-store";
import {
  DeferredValueGenerator,
  DependencyHandler,
  DependencyValueTypes,
  Destroyable,
  ReadOnlyStore,
} from "src/store/types";
import { SubscribableOptions, subscribe } from "src/subscribable";

export function getStoreValues<Stores extends ReadOnlyStore[]>(stores: Stores): DependencyValueTypes<Stores> {
  return stores.map((store) => store.get()) as any;
}

export function dependOnStores<Dependencies extends ReadOnlyStore[]>(
  dependencies: Dependencies,
  handler: DependencyHandler<Dependencies>,
  initialCall: boolean = false
): Destroyable {
  const wrapper = (): void => handler(...getStoreValues(dependencies));
  if (initialCall) wrapper();
  return subscribe(dependencies, wrapper);
}

export function deriveStore<Dependencies extends ReadOnlyStore[], Value>(
  dependencies: Dependencies,
  compute: DeferredValueGenerator<Dependencies, Value>,
  options?: SubscribableOptions
): ReadOnlyStore<Value> & Destroyable {
  const { get, set, subscribe, unsubscribe } = createStore(compute(...getStoreValues(dependencies)), options);
  const { destroy } = dependOnStores(dependencies, (...values) => {
    set(compute(...values));
  });
  return { subscribe, unsubscribe, get, destroy };
}
