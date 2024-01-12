import fs from "fs";
import { homedir } from "os";
import path from "path";

export class Project {
  name: string;
  sceneNames: string[];

  constructor(name: string) {
    this.name = name;
    this.sceneNames = [];
  }

  async init() {
    const userDir = homedir();
    const cwd = path.join(userDir, ".cache/concise-motion");
    if (!fs.existsSync(path.join(cwd, this.name))) {
      fs.mkdirSync(cwd, {
        recursive: true,
      });

      // initialise motion canvas
      // const bunInit = Bun.spawn(["echo", "HI!"], {
      const bunInit = Bun.spawn(["bunx", "@motion-canvas/create@latest"], {
        cwd: cwd,
        stdin: "pipe",
      });

      bunInit.stdin.write(this.name + "\n");
      bunInit.stdin.flush();
      await Bun.sleep(500);
      bunInit.stdin.write("\n");
      bunInit.stdin.flush();
      await Bun.sleep(500);
      bunInit.stdin.write("\n");
      bunInit.stdin.flush();
      await Bun.sleep(500);
      bunInit.stdin.write("\n");
      bunInit.stdin.flush();

      bunInit.stdin.end();

      const text = await new Response(bunInit.stdout).text();
      console.log(text);

      Bun.spawn(["bun", "install"], {
        cwd: path.join(cwd, this.name),
      });
    }

    fs.rmSync(path.join(cwd, this.name, "src/scenes"), { recursive: true, force: true });
  }

  registerScene(name: string) {
    this.sceneNames.push(name);
  }

  end() {
    const template = `
    // src/project.ts
    import {makeProject} from '@motion-canvas/core';

    ${this.sceneNames.map((name) => `import ${name} from './scenes/${name}?scene';`).join("\n")}

    export default makeProject({
      scenes: [${this.sceneNames.map((name) => name).join(", ")}],
    });
    `;

    console.log(template);

    const cwd = path.join(homedir(), ".cache/concise-motion");
    const projectFile = path.join(cwd, this.name, "src/project.ts");
    Bun.write(projectFile, template);

    Bun.spawn(["bun", "run", "start"], {
      cwd: path.join(cwd, this.name),
    });

    console.log("Visit http://localhost:9000/")
  }
}
