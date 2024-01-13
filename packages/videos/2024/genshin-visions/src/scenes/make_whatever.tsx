import { Circle, Latex, Rect, makeScene2D } from "@motion-canvas/2d";

import { all, createRef, createSignal, delay, waitFor } from "@motion-canvas/core";
import { fadeOut, fadeToPos, latexDefaults } from "concise-motion-core";

export default makeScene2D(function* (view) {
  view.fill('black')

  const latex1 = createRef<Latex>()
  const sliderParents = createRef<Rect>()
  const slider1 = createRef<Circle>()
  const slider2 = createRef<Circle>()
  const slider3 = createRef<Circle>()

  const sliderBob1 = createSignal(0)
  const sliderBob2 = createSignal(0)
  const sliderBob3 = createSignal(0)

  view.add(<>
    <Rect y={() => 0 - Math.sin(sliderBob1() * Math.PI) * 100}>
      <Latex ref={latex1} {...latexDefaults()} tex={"\\color{white} a^2 + b^2 = c^2"} />
    </Rect>
    <Rect ref={sliderParents} opacity={0}>
      <Circle ref={slider1} x={() => 0 + Math.sin(sliderBob1() * Math.PI) * 300} y={-100} width={32} height={32} fill={"white"} />
      <Circle ref={slider2} x={() => 0 + Math.sin(sliderBob2() * Math.PI) * 300} y={0} width={32} height={32} fill={"white"} />
      <Circle ref={slider3} x={() => 0 + Math.sin(sliderBob3() * Math.PI) * 300} y={100} width={32} height={32} fill={"white"} />
    </Rect>
  </>)

  yield* all(
    fadeToPos(latex1, [-500, 0]),
    delay(0.5, fadeToPos(sliderParents, [300, 0]))
  )

  yield* all(
    delay(0, sliderBob1(1, 2)),
    delay(0.1, sliderBob2(1, 2)),
    delay(0.2, sliderBob3(1, 2)),
  )

  yield* all(
    delay(0, fadeOut(latex1)),
    delay(0.5, fadeOut(sliderParents))
  )
})