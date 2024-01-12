import { Shape } from "../shapes/Shape";

export class AnimationProperties {
  duration: number;
  property: string;
  shape: Shape;
  from: any;
  to: any;

  constructor(
    shape: Shape,
    duration: number,
    property: string,
    from: any,
    to: any
  ) {
    this.duration = duration;
    this.property = property;
    this.shape = shape;
    this.from = from;
    this.to = to;
  }

  toString() {
    return `
      tween(${this.duration}, value => {
        ref_${this.shape.uniqueID}().${this.property}(map(${this.from}, ${this.to}, easeInOutCubic(value)))
      })
    `;
  }
}

export class AnimationKeyframe {
  properties: AnimationProperties[];

  constructor() {
    this.properties = [];
  }

  toString() {
    return `
      yield* all(
        ${this.properties.map((property) => property.toString()).join(",\n")}
      )
    `;
  }
}