import { Project } from "concise-motion-core";
import { scene1 } from "./scene1";

const project = new Project("example")

await project.init()

scene1(project)