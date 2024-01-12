import { Circle } from "./shapes/Circle";
import { Shape } from "./shapes/Shape";

class MotionCanvasImport {
  importName: string;
  importPath: string;

  constructor(name: string, path: string) {
    this.importName = name;
    this.importPath = path;
  }

  toString() {
    return `import { ${this.importName} } from "${this.importPath}"`;
  }
}

export class MotionCanvasImports {
  imports: MotionCanvasImport[];

  constructor() {
    this.imports = [];
  }

  add(name: string, path: string) {
    if (this.imports.find((importItem) => importItem.importName == name)) {
      return;
    }

    this.imports.push(new MotionCanvasImport(name, path));
  }

  toString() {
    return this.imports.map((importItem) => importItem.toString()).join("\n");
  }
}

class AnimationProperties {
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
        ref_${this.shape.uniqueID}().${this.property}(map(${this.from}, ${this.to}, value}))
      })
    `;
  }
}

class AnimationKeyframe {
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

export class Scene {
  shapes: Shape[];
  imports: MotionCanvasImports;
  animationKeyframes: AnimationKeyframe[];

  constructor() {
    this.shapes = [];
    this.imports = new MotionCanvasImports();
    this.imports.add("makeScene2D", "@motion-canvas/2d");
    this.animationKeyframes = [new AnimationKeyframe()];
  }

  circle() {
    let circle = new Circle();
    this.imports.add("Circle", "@motion-canvas/2d");
    this.imports.add("createRef", "@motion-canvas/core");
    this.shapes.push(circle);

    return circle;
  }

  keyframe() {
    let keyframe = new AnimationKeyframe();
    this.animationKeyframes.push(keyframe);
    return keyframe;
  }

  animate(
    shape: Shape,
    property: string,
    from: any,
    to: any,
    duration: number
  ) {
    this.imports.add("map, tween", "@motion-canvas/core");

    let animationProperty = new AnimationProperties(
      shape,
      duration,
      property,
      from,
      to
    );

    let keyframe = this.animationKeyframes[this.animationKeyframes.length - 1];
    keyframe.properties.push(animationProperty);
  }

  finish() {
    const template = `
    ${this.imports.toString()}

    export default makeScene2D(function* (view) {
      ${this.shapes.map((shape) => shape.generateRef()).join("\n")}

      view.add(
        ${this.shapes.map((shape) => shape.generateJSX()).join(",\n")}
      )

      ${this.animationKeyframes
        .map((keyframe) => keyframe.toString())
        .join("\n")}
    })
    `;

    console.log(template);
  }
}
