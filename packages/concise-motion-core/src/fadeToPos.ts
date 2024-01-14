import { Shape } from "@motion-canvas/2d";
import { Reference, all, delay } from "@motion-canvas/core";

export function fadeToPos(
  shape: Reference<Shape>,
  position?: [number, number],
  delayTime: number = 0
) {
  if (position) {
    return delay(
      delayTime,
      all(
        shape().opacity(1, 1),
        shape().x(position[0], 1),
        shape().y(position[1], 1)
      )
    );
  }

  return all(shape().opacity(0, 0).to(1, 1));
}
