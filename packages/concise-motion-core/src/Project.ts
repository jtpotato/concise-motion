import fs from "fs";
import { homedir } from "os";
import path from "path";

export class Project {
  constructor() {
    const userDir = homedir();
    if (!fs.existsSync(path.join(userDir, ".cache/concise-motion"))) {
      fs.mkdirSync(path.join(userDir, ".cache/concise-motion"), {
        recursive: true,
      });

      // initialise motion canvas with `bun init @motion-canvas@latest`
      Bun.sp
    }
  }
}
