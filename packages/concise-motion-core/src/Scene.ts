import { homedir } from "os";
import { InitialShapeProps, Shape, ShapeType } from "./shapes/Shape";
import path from "path";
import { Project } from "./Project";
import { MotionCanvasImports } from "./Imports";
import {
  AnimationKeyframe,
  AnimationProperties,
} from "./animations/Animations";
import { animateWithAliases } from "./animations/AnimateFunc";
import { MotionCanvasAnimationProperties } from "./animations/AnimationProperties";

export class Scene {
  shapes: Shape[];
  imports: MotionCanvasImports;
  animationKeyframes: AnimationKeyframe[];
  filename: string;
  projectName: string;

  background: string = "#000";

  constructor(project: Project, filename: string) {
    this.shapes = [];
    this.imports = new MotionCanvasImports();
    this.imports.add("makeScene2D", "@motion-canvas/2d");
    this.animationKeyframes = [new AnimationKeyframe()];
    this.projectName = project.name;

    const uniqueID = crypto.randomUUID().replace(/-/g, "_");
    this.filename = `${filename}_${uniqueID}`;

    project.registerScene(this.filename);
  }

  shape(name: ShapeType, initialProps: InitialShapeProps) {
    let shape = new Shape(name, initialProps);
    this.imports.add(name, "@motion-canvas/2d");
    this.imports.add("createRef", "@motion-canvas/core");
    this.shapes.push(shape);

    return shape;
  }

  keyframe() {
    let keyframe = new AnimationKeyframe();
    this.animationKeyframes.push(keyframe);
    return keyframe;
  }

  animate(
    shape: Shape,
    property: MotionCanvasAnimationProperties,
    from: any,
    to: any,
    duration: number
  ) {
    this.imports.add("easeInOutCubic, all, map, tween", "@motion-canvas/core");

    const animationProperty = animateWithAliases(
      shape,
      duration,
      property,
      from,
      to
    );

    let keyframe = this.animationKeyframes[this.animationKeyframes.length - 1];
    keyframe.properties.push(animationProperty);
  }

  end() {
    const cwd = path.join(homedir(), ".cache/concise-motion");
    const sceneFile = path.join(
      cwd,
      "motion-canvas-project",
      "src/scenes",
      this.filename + ".tsx"
    );

    const template = `
    // src/scenes/${this.filename}.tsx
    ${this.imports.toString()}

    export default makeScene2D(function* (view) {
      view.fill("${this.background}")

      ${this.shapes.map((shape) => shape.generateRef()).join("\n")}

      view.add(
        <>
        ${this.shapes.map((shape) => shape.generateJSX()).join("\n")}
        </>
      )

      ${this.animationKeyframes
        .map((keyframe) => keyframe.toString())
        .join("\n")}
    })
    `;

    console.log(template);

    Bun.write(sceneFile, template);
  }
}
