import { InitialShapeProps } from "./InitialShapeProps";

export class Shape {
  shapeName: string;
  uniqueID: string;
  initialProps: InitialShapeProps;

  constructor(name: string, initial: InitialShapeProps) {
    this.shapeName = name;
    this.uniqueID = crypto.randomUUID().replace(/-/g, "_");
    this.initialProps = initial
  }

  generateRef() {
    return `const ref_${this.uniqueID} = createRef<${this.shapeName}>();`
  }

  generateJSX() {
    return `
      <${this.shapeName} ref={ref_${this.uniqueID}} fill={"${this.initialProps.fill}"} x={${this.initialProps.x}} y={${this.initialProps.y}} width={${this.initialProps.width}} height={${this.initialProps.height}} />
    `
  }
}