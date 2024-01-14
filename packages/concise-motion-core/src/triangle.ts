import { PossibleVector2, SignalValue } from "@motion-canvas/core";


export function triangle(scaleX: number, scaleY: number) {
  let trianglePoints = [
    [0, 0],
    [150, 0],
    [150, -150],
    [0, 0],
  ];

  trianglePoints = trianglePoints.map(([x, y]) => [x - 75, y + 75]);
  trianglePoints = trianglePoints.map(([x, y]) => [x * scaleX, y * scaleY]);

  return {
    points: trianglePoints as SignalValue<PossibleVector2>[],
    lineWidth: 8,
    end: 0,
    // closed: true
  };
}
