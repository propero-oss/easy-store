import { createStore } from "src/create-store";
import {
  Destroyable,
  PromiseOr,
  ReadonlyStore,
  StoreOptions,
  StoreValues,
} from "src/types";

export function deriveStore<
  T extends ReadonlyStore<any>[] | ReadonlyArray<ReadonlyStore<any>>,
  R
>(
  stores: T,
  handler: (...values: StoreValues<T>) => R,
  initial?: R,
  options?: StoreOptions
): ReadonlyStore<R> & Destroyable;
export function deriveStore<
  T extends ReadonlyStore<any>[] | ReadonlyArray<ReadonlyStore<any>>,
  R
>(
  stores: T,
  handler: (...values: StoreValues<T>) => Promise<R>,
  initial: R,
  options?: StoreOptions
): ReadonlyStore<R> & Destroyable;
export function deriveStore<
  T extends ReadonlyStore<any>[] | ReadonlyArray<ReadonlyStore<any>>,
  R
>(
  stores: T,
  handler: (...values: StoreValues<T>) => PromiseOr<R>,
  initial?: R,
  options?: StoreOptions
): ReadonlyStore<R> & Destroyable {
  const { get, set, subscribe } = createStore<R>(initial as R, options);
  const listener = () => {
    const result = handler(...(stores.map((it) => it.get()) as any));
    if (
      result &&
      typeof result === "object" &&
      "then" in result &&
      typeof result["then"] === "function"
    )
      result.then(set);
    else set(result as any);
  };

  listener();
  const handles = stores.map((it) => it.subscribe(listener));
  const destroy = () => handles.forEach((it) => it());

  return { get, subscribe, destroy };
}
