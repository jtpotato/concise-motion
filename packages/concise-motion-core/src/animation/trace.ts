import { Curve } from "@motion-canvas/2d";
import { Reference } from "@motion-canvas/core";

/**
 * Traces a Curve from start to finish over 2 seconds.
 */

export function trace(line: Reference<Curve>) {
  return line().end(1, 2);
}
