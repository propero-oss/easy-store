import { createStore } from "src/store/create-store";
import { DeferredValueGenerator, DependencyValueTypes, Destroyable, ReadOnlyStore } from "src/store/types";
import { SubscribableOptions } from "src/subscribable";

export function deriveStore<Dependencies extends ReadOnlyStore<unknown>[], Return>(
  dependencies: Dependencies,
  compute: DeferredValueGenerator<Dependencies, Return>,
  options?: SubscribableOptions
): ReadOnlyStore<Return> & Destroyable {
  const values = () => dependencies.map((dep) => dep.getValue()) as DependencyValueTypes<Dependencies>;
  const computed = () => compute(...values());
  const { getValue, setValue, sub, unsub } = createStore(computed(), options);
  const recompute = () => setValue(computed());
  dependencies.forEach((dep) => dep.sub(recompute));
  const destroy = () => dependencies.forEach((dep) => dep.unsub(recompute));
  return { sub, unsub, getValue, destroy };
}
