import { Circle, Line, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { PossibleVector2, SignalValue, Vector2, all, createRef, createSignal, delay, waitUntil } from "@motion-canvas/core";
import { cascade, fadeInFrom, fadeOut, fadeOutLine, fadeToPos, shapeDefaults } from "concise-motion-core";

export default makeScene2D(function* (view) {
  view.fill('black')

  const viewRef = createRef<Rect>()

  const person = createRef<Circle>()

  view.add(<>
    <Rect ref={viewRef}>
      <Circle {...shapeDefaults()} ref={person} />
    </Rect>
  </>)

  yield* fadeInFrom("bottom", person, [0, -100])
})