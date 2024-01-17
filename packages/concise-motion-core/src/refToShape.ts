import { Node } from "@motion-canvas/2d";
import { Reference } from "@motion-canvas/core";

export function potentialRefToNode<T extends Node>(shape: Reference<T> | T): T {
  let shapeObject = null;
  // if is Reference<Shape>
  if (shape instanceof Function) {
    shapeObject = shape();
  }
  else {
    shapeObject = shape;
  }

  return shapeObject;
}