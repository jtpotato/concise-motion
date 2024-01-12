import { homedir } from "os";
import { Circle } from "./shapes/Circle";
import { Shape } from "./shapes/Shape";
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
    property: MotionCanvasAnimationProperties,
    from: any,
    to: any,
    duration: number
  ) {
    this.imports.add("map, tween", "@motion-canvas/core");

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
      this.projectName,
      "src/scenes",
      this.filename + ".tsx"
    );

    const template = `
    // src/scenes/${this.filename}.tsx
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

    Bun.write(sceneFile, template);
  }
}
