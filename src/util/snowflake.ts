let counter = 0;

/**
 * Generates a random, unique ID that is sortable by point of creation
 * Consists of 12 characters for the current date, 2 characters for an
 * incrementing counter and 2 characters of randomness in hex format.
 * @return The generated ID
 */
export const snowflake = (prefix: string = ""): string =>
  prefix +
  Date.now().toString(16).padStart(12, "0") +
  (counter++ & 0xff).toString(16).padStart(2, "0") +
  ((Math.random() * 0xff) & 0xff).toString(16).padStart(2, "0");
