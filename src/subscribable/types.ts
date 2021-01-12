export type Subscriber<T extends unknown[]> = (...args: T) => void;
export type SubscribableNotify<T extends unknown[]> = (...args: T) => void;
export type SubscribableSub<T extends unknown[]> = (subscriber: Subscriber<T>) => void;
export type SubscribableUnsub<T extends unknown[]> = (subscriber: Subscriber<T>) => void;

export interface SubscribableOptions {
  limit?: number;
}

export interface Subscribable<T extends unknown[]> {
  sub: SubscribableSub<T>;
  unsub: SubscribableUnsub<T>;
}

export interface Notifiable<T extends unknown[]> {
  notify: SubscribableNotify<T>;
}
