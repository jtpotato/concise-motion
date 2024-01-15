import { Curve, Shape } from "@motion-canvas/2d";
import { Reference } from "@motion-canvas/core";

export function potentialRefToShape(shape: Reference<Shape> | Reference<Curve> | Shape) {
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