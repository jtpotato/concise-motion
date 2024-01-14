import { makeScene2D } from "@motion-canvas/2d";

import { waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  view.fill('black')
  view.add(<></>)
  yield* waitFor(1)
})