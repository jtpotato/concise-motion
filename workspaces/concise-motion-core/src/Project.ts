import fs from "fs";

export class Project {
  constructor() {
    if (!fs.existsSync("~/tmp/concise-motion")) {
      fs.mkdirSync("~/tmp/concise-motion", { recursive: true });
    }
  }
}
