import fs from "fs";
import { homedir } from "os";
import path from "path";

export class Project {
  name: string;

  constructor(name: string) {
    this.name = name;
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
  }
}
