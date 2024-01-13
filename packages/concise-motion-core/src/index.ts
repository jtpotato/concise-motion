import { Curve, Shape } from "@motion-canvas/2d";
import { PossibleVector2, Reference, SignalValue, all } from "@motion-canvas/core";

export function shapeDefaults() {
  return {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    fill: "#f00",
    opacity: 0,
  };
}

export function fadeToPos(
  shape: Reference<Shape>,
  position?: [number, number]
) {
  if (position) {
    return all(
      shape().opacity(1, 1),
      shape().x(position[0], 1),
      shape().y(position[1], 1)
    );
  }
  
  return all(shape().opacity(0, 0).to(1, 1));
}

export function triangle(scaleX: number, scaleY: number) {
  let trianglePoints = [
    [0, 0],
    [150, 0],
    [150, -150],
    [0, 0]
  ]

  trianglePoints = trianglePoints.map(([x, y]) => [x - 75, y + 75])
  trianglePoints = trianglePoints.map(([x, y]) => [x * scaleX, y * scaleY])

  return {
    points: trianglePoints as SignalValue<PossibleVector2>[],
    lineWidth: 8,
    end: 0
    // closed: true
  }
}

export function trace(line: Reference<Curve>) {
  return line().end(1, 2);
}

export function latexDefaults() {
  return {
    scale: 4,
    opacity: 0,
  }
}

export function fadeOut(shape: Reference<Shape> | Reference<Curve>) {
  return all(
    shape().opacity(0, 1),
    shape().x(0, 1),
    shape().y(0, 1)
  )
}