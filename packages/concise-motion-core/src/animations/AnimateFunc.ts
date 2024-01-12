import { Shape } from "../shapes/Shape";
import { MotionCanvasAnimationProperties } from "./AnimationProperties";
import { AnimationProperties } from "./Animations";

export function animateWithAliases(shape: Shape, duration: number, property: MotionCanvasAnimationProperties, from: any, to: any) {
  let animationProperty = new AnimationProperties(
    shape,
    duration,
    property,
    from,
    to
  );

  return animationProperty
}