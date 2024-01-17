import { Reference, all, delay } from "@motion-canvas/core";
import { potentialRefToNode } from "../refToShape";
import { Node } from "@motion-canvas/2d";

export function fadeInFrom<T extends Node>(
  location: "bottom",
  shape: Reference<T> | T,
  position: [number, number],
  delayTime: number = 0
) {
  const shapeObject = potentialRefToNode(shape);

  if (location === "bottom") {
    return delay(
      delayTime,
      all(
        shapeObject.opacity(0, 0).to(1, 1),
        shapeObject.x(position[0], 0).to(position[0], 1),
        shapeObject.y(position[1] + 200, 0).to(position[1], 1)
      )
    );
  }
}
