import { Curve, Shape } from "@motion-canvas/2d";
import {
  Reference,
  all,
} from "@motion-canvas/core";
import { shapeDefaults } from "./shapeDefaults";
import { fadeToPos } from "./fadeToPos";
import { triangle } from "./triangle";

export function trace(line: Reference<Curve>) {
  return line().end(1, 2);
}

export function latexDefaults() {
  return {
    scale: 4,
    opacity: 0,
  };
}

export function fadeOut(shape: Reference<Shape> | Reference<Curve>) {
  return all(shape().opacity(0, 1), shape().x(0, 1), shape().y(0, 1));
}

export { shapeDefaults, fadeToPos, triangle }