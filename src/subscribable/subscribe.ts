import { Destroyable } from "src/store";
import { Subscribable, SubscribableArgs } from "src/subscribable/types";

export function subscribeSingle<Sub extends Subscribable>(
  subscribable: Sub,
  handler: (...args: SubscribableArgs<Sub>) => void
): Destroyable {
  subscribable.sub(handler as any);
  const destroy = (): void => subscribable.unsub(handler as any);
  return { destroy };
}

export function subscribeMultiple<Dependencies extends Subscribable[]>(
  subscribables: Dependencies,
  handler: () => void
): Destroyable {
  subscribables.forEach((subscribable) => subscribable.sub(handler));
  const destroy = (): void => subscribables.forEach((subscribable) => subscribable.unsub(handler));
  return { destroy };
}

export function subscribe<Sub extends Subscribable>(
  subscribable: Sub,
  handler: (...args: SubscribableArgs<Sub>) => void
): Destroyable;
export function subscribe<Dependencies extends Subscribable[]>(
  subscribables: Dependencies,
  handler: () => void
): Destroyable;
export function subscribe(
  subscribables: Subscribable | Subscribable[],
  handler: (...args: unknown[]) => void
): Destroyable {
  if (Array.isArray(subscribables)) return subscribeMultiple(subscribables, handler);
  else return subscribeSingle(subscribables, handler);
}
