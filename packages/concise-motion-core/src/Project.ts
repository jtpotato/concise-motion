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
    if (!fs.existsSync(path.join(cwd, "motion-canvas-project"))) {
      fs.mkdirSync(cwd, {
        recursive: true,
      });

      const bunInit = Bun.spawn(["bunx", "@motion-canvas/create@latest"], {
        cwd: cwd,
        stdin: "pipe",
      });

      bunInit.stdin.write("motion-canvas-project" + "\n");
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
        cwd: path.join(cwd, "motion-canvas-project"),
      });
    }

    fs.rmSync(path.join(cwd, "motion-canvas-project", "src/scenes"), { recursive: true, force: true });
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

    const cwd = path.join(homedir(), ".cache/concise-motion", "motion-canvas-project");

    Bun.write(path.join(cwd, "src/project.ts"), template);

    console.log("Open a new terminal with the following:")
    console.log(`cd ${cwd}`)
    console.log(`bun run start`)
  }
}
