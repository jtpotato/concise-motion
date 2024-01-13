import { Circle, Latex, Line, Rect, Shape, makeScene2D } from '@motion-canvas/2d';
import { Reference, all, createRef, delay, tween, waitFor, waitUntil } from '@motion-canvas/core';
import { fadeOut, fadeToPos, latexDefaults, shapeDefaults, trace, triangle } from "concise-motion-core"

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill('black');

  const viewParent = createRef<Rect>()
  const line1 = createRef<Line>();
  const latex1 = createRef<Latex>();

  view.add(
    <Rect ref={viewParent}>
      <Line {...triangle(2, 1)} ref={line1} stroke={"white"} />
      <Latex ref={latex1} {...latexDefaults()} tex={"\\color{white} a^2 + b^2 = c^2"} />
    </Rect>
  )

  yield* trace(line1)
  yield* all(
    line1().x(-200, 1),
    fadeToPos(latex1, [200, 0])
  )

  yield* waitUntil("i'll never know")

  yield* all(
    fadeOut(line1),
    delay(0.5, fadeOut(latex1))
  )
  yield* waitFor(0.1)
});
