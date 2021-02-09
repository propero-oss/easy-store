import { Subscribable } from "src/subscribable";
import { PromiseIf } from "src/util";

export type StoreUpdater<T> = (value: T) => T | Promise<T>;
export type StoreUpdate<T> = <Updater extends StoreUpdater<T>>(
  updater: Updater
) => PromiseIf<Updater>;
export type StoreGet<T> = () => T;
export type StoreSet<T> = (value: T) => void;

export interface StoreReadAccessors<T> {
  getValue: StoreGet<T>;
}

export interface StoreWriteAccessors<T> {
  setValue: StoreSet<T>;
  update: StoreUpdate<T>;
}

export interface Destroyable {
  destroy: () => void;
}

export interface ReadOnlyStore<T = unknown>
  extends Subscribable<[value: T, before: T]>,
    StoreReadAccessors<T> {}
export interface MutableStore<T> extends ReadOnlyStore<T>, StoreWriteAccessors<T> {}

export type StoreValueType<T> = T extends Subscribable<infer Type> ? Type[0] : never;
export type DependencyValueTypes<T extends Subscribable[]> = {
  [Index in keyof T]: StoreValueType<T[Index]>;
};
export type DependencyHandler<T extends ReadOnlyStore[]> = (
  ...values: DependencyValueTypes<T>
) => void;
export type DeferredValueGenerator<T extends ReadOnlyStore[], R> = (
  ...values: DependencyValueTypes<T>
) => R;
export type AsyncDeferredValueGenerator<T extends ReadOnlyStore[], Value> = (
  ...values: DependencyValueTypes<T>
) => Promise<Value> | Value;
