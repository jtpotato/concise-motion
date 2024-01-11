export class Shape {
  shapeName: string;
  uniqueID: string;

  constructor(name: string) {
    this.shapeName = name;
    this.uniqueID = crypto.randomUUID().replace(/-/g, "_");
  }

  generateRef() {
    return `const ref_${this.uniqueID} = createRef<${this.shapeName}>();`
  }

  generateJSX() {
    return `
      <${this.shapeName} ref={ref_${this.uniqueID}} />
    `
  }
}

export class MotionCanvasImport {
  importName: string;
  importPath: string;

  constructor(name: string, path: string) {
    this.importName = name;
    this.importPath = path;
  }

  toString() {
    return `import { ${this.importName} } from "${this.importPath}"`
  }
}

export class Scene {
  shapes: Shape[];
  imports: MotionCanvasImport[];

  constructor() {
    this.shapes = [];
    this.imports = [new MotionCanvasImport("makeScene2D", "@motion-canvas/2d")]
  }

  circle() {
    let circle = new Shape("Circle")

    this.shapes.push(circle);
    return circle
  }

  finish() {
    const template =
    `
    ${this.imports.join("\n")}

    export default makeScene2D(function* (view) {
      ${this.shapes.map(shape => shape.generateRef()).join("\n")}

      view.add(
        ${this.shapes.map(shape => shape.generateJSX()).join(",\n")}
      )
    })
    `

    console.log(template)
  }
}
