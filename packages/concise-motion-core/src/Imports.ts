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