export type ShapeType = "Circle" | "Line";

export type InitialShapeProps = {
  fill?: string;
  stroke?: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  points?: number[][];
  lineWidth?: number;
  arrow?: boolean;
};

export class Shape {
  shapeName: string;
  uniqueID: string;
  initialProps: InitialShapeProps;

  constructor(name: string, initial: InitialShapeProps) {
    this.shapeName = name;
    this.uniqueID = crypto.randomUUID().replace(/-/g, "_");
    this.initialProps = initial;
  }

  generateRef() {
    return `const ref_${this.uniqueID} = createRef<${this.shapeName}>();`;
  }

  generateJSX() {
    let propStrings = "";

    Object.entries(this.initialProps).forEach(([key, value]) => {
      if (!value) return;

      if (typeof value === "string") {
        propStrings += `${key}="${value}" `;
      } else if (typeof value === "number") {
        propStrings += `${key}={${value}} `;
      } else if (Array.isArray(value)) {
        propStrings += `${key}={${JSON.stringify(value)}} `;
      }

      if (key == "arrow") propStrings += "startArrow "
    });

    return `
    <${this.shapeName} ${propStrings} ref={ref_${this.uniqueID}} />
    `;
  }
}
