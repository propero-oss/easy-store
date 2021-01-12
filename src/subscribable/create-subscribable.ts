import { SubscriberLimitExceededError } from "src/subscribable/errors";
import { Notifiable, Subscribable, SubscribableOptions, Subscriber } from "src/subscribable/types";

export function createSubscribable<T extends unknown[]>(
  options?: SubscribableOptions
): Subscribable<T> & Notifiable<T> {
  const { limit = 100 } = options ?? {};
  const subs: Subscriber<T>[] = [];

  function sub(subscriber: Subscriber<T>): void {
    if (subs.length >= limit) throw new SubscriberLimitExceededError();
    subs.push(subscriber);
  }

  function unsub(subscriber: Subscriber<T>): void {
    const index = subs.lastIndexOf(subscriber);
    if (index === -1) return;
    subs.splice(index, 1);
  }

  function notify(...args: T): void {
    subs.forEach((sub) => sub(...args));
  }

  return { sub, unsub, notify };
}
