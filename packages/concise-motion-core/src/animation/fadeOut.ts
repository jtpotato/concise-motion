import { Line, Node } from "@motion-canvas/2d";
import { Reference, all } from "@motion-canvas/core";
import { potentialRefToNode } from "../refToShape";

/**
 * Fades a given Shape or Curve out, moving it to the origin simultaneously. Happens over `1` second.
 */

export function fadeOut<T extends Node>(shape: Reference<T> | T) {
  const shapeObject = potentialRefToNode(shape);

  return all(
    shapeObject.opacity(0, 1),
    shapeObject.x(0, 1),
    shapeObject.y(0, 1),
  );
}

export function fadeOutLine<T extends Line>(shape: Reference<T> | T) {
  const shapeObject = potentialRefToNode(shape);

  return all(
    shapeObject.opacity(0, 0.8),
    shapeObject.x(0, 1),
    shapeObject.y(0, 1),
    shapeObject.start(1, 1),
  );
}
