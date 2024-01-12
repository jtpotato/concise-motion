import { Project, Scene } from "concise-motion-core";

export function scene1(project: Project) {
  let scene = new Scene(project, "scene1");

  let circle = scene.shape("Circle", {
    x: 0,
    y: 0,
    fill: "red",
    width: 100,
    height: 100,
  });

  let line1 = scene.shape("Line", {
    points: [[0, 0], [500, 0]],
    stroke: "blue",
    lineWidth: 5,
    arrow: true,
  })

  scene.animate(circle, "x", -500, 500, 1);
  scene.keyframe();
  scene.animate(circle, "x", 500, -500, 1);
  scene.keyframe();

  scene.end();
}
