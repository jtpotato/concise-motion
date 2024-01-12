import { InitialShapeProps } from "./InitialShapeProps";
import { Shape } from "./Shape";

export class Circle extends Shape {
  constructor(initial: InitialShapeProps) {
    super("Circle", initial)
  }
}