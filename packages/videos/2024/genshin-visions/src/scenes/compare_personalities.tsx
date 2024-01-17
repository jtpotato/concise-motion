import { Circle, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { createRef, waitFor } from "@motion-canvas/core";
import { cascade, fadeInFrom, fadeOut, shapeDefaults } from "concise-motion-core";

export default makeScene2D(function* (view) {
  view.fill('black')

  const viewRef = createRef<Rect>()

  const person = createRef<Circle>()
  const labelRef = createRef<Txt>()

  view.add(<>
    <Rect ref={viewRef}>
      <Circle {...shapeDefaults()} ref={person}>

      </Circle>
      <Txt ref={labelRef} text="???" fill="white" fontSize={60} x={0} y={0} fontFamily={"monospace"} opacity={0} />
    </Rect>
  </>)

  yield* cascade(0.2,
    fadeInFrom("bottom", person, [0, -100]),
    fadeInFrom("bottom", labelRef, [0, 100])
  )

  labelRef().text("Pyro?")
  yield* person().fill('#bc0000', 0.5)
  yield* waitFor(0.5)
  labelRef().text("Cryo?")
  yield* person().fill('#b9dfe4', 0.5)
  yield* cascade(0.2,
    fadeOut(person),
    fadeOut(labelRef)
  )
})