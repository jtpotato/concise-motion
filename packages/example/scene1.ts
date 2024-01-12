import { Scene } from "concise-motion-core"

export function scene1() {
  let scene = new Scene()

  let circle = scene.circle()

  scene.animate(circle, "position.x", 0, 100, 1)
  scene.keyframe()
  scene.animate(circle, "position.x", 100, 0, 1)
  
  scene.finish()
}

