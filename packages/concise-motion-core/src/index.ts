import { Curve, Shape } from "@motion-canvas/2d";
import {
  Reference,
  all,
} from "@motion-canvas/core";
import { shapeDefaults } from "./shapeDefaults";
import { fadeToPos } from "./fadeToPos";
import { triangle } from "./triangle";

/**
 * Traces a Curve from start to finish over 2 seconds.
 */
export function trace(line: Reference<Curve>) {
  return line().end(1, 2);
}

/**
 * Returns the default values for LaTeX.
 * @returns ```{ scale: 4, opacity: 0 }```
 */
export function latexDefaults() {
  return {
    scale: 4,
    opacity: 0,
  };
}

/**
 * Fades a given Shape or Curve out, moving it to the origin simultaneously. Happens over `1` second.
 */
export function fadeOut(shape: Reference<Shape> | Reference<Curve>) {
  return all(shape().opacity(0, 1), shape().x(0, 1), shape().y(0, 1));
}

export { shapeDefaults, fadeToPos, triangle }