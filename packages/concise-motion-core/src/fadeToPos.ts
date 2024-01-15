import { Shape } from "@motion-canvas/2d";
import { Reference, ThreadGenerator, all, delay } from "@motion-canvas/core";
import { potentialRefToNode } from "./refToShape";

export function fadeToPos<T extends Shape>(
  shape: Reference<T> | T,
  position?: [number, number],
  delayTime: number = 0
): ThreadGenerator {
  const shapeObject = potentialRefToNode(shape);

  if (position) {
    return delay(
      delayTime,
      all(
        shapeObject.opacity(1, 1),
        shapeObject.x(0, 0).to(position[0], 1),
        shapeObject.y(0, 0).to(position[1], 1)
      )
    );
  }

  return all(shapeObject.opacity(0, 0).to(1, 1));
}
