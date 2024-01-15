import { Promisable, ThreadGenerator, all, delay } from "@motion-canvas/core";

/** Takes a `gap` in seconds, and sequentially animates everything passed into it. */
export function cascade(gap: number, ...animations: Generator<void | ThreadGenerator | Promise<any> | Promisable<any>, void, any>[]) {
  return all(
    ...animations.map((animation, index) => delay(index * gap, animation))
  );
}
