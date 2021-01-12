export class SubscriberLimitExceededError extends Error {
  constructor() {
    super(
      `The store subscriber limit has been exceeded.
This probably means you are subscribing to a store value in a loop, event handler or inside an ui component without cleanup.
Please make sure to unsubscribe leftover handlers properly.`
    );
  }
}
