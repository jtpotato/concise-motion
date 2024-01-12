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