import { Project, Scene } from "concise-motion-core"

export function scene1(project: Project) {
  let scene = new Scene(project, "scene1")

  let circle = scene.circle({
    x: 0,
    y: 0,
    fill: "red",
    width: 100,
    height: 100,
  })

  scene.animate(circle, "x", -500, 500, 1)
  scene.keyframe()
  scene.animate(circle, "x", 500, -500, 1)
  scene.keyframe()
  
  scene.end()
}

