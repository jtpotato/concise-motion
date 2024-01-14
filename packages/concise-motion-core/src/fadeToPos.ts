import { Shape } from "@motion-canvas/2d";
import { Reference, all, delay } from "@motion-canvas/core";

export function fadeToPos(
  shape: Reference<Shape> | Shape,
  position?: [number, number],
  delayTime: number = 0
) {
  let shapeObject = null;
  // if is Reference<Shape>
  if (shape instanceof Function) {
    shapeObject = shape();
  }
  else {
    shapeObject = shape;
  }

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
