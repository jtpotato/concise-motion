import { Circle, Line, makeScene2D, Txt } from "@motion-canvas/2d";
import { PossibleVector2, SignalValue, all, createRef, createSignal, delay, waitUntil } from "@motion-canvas/core";
import { fadeOut, fadeToPos, shapeDefaults } from "concise-motion-core";

export default makeScene2D(function* (view) {
  view.fill('black')

  const circle1 = createRef<Circle>()
  const circle2 = createRef<Circle>()
  const line1 = createRef<Line>()
  const distanceLabel = createRef<Txt>()

  const floatingProgress = createSignal(0)

  function calculateDistance(progress: number) {
    const ax = -500
    const ay = 300 + progress * -600

    const bx = 500
    const by = -300 + progress * 600

    const d = Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2)) / 100

    return d.toFixed(2)
  }

  view.add(<>
    <Circle {...shapeDefaults()} width={32} height={32} ref={circle1} x={-500} y={() => 300 + floatingProgress() * -600} opacity={1}>

    </Circle>
    <Circle {...shapeDefaults()} width={32} height={32} ref={circle2} x={500} y={() => -300 + floatingProgress() * 600} opacity={1}>
      <Txt ref={distanceLabel} text={() => "d = " + calculateDistance(floatingProgress())} fill={"#eedd00"} x={150} y={0} fontFamily={"monospace"} fontSize={40} />
    </Circle>
    <Line ref={line1} lineWidth={4} stroke={"#77aaff"} points={() => [[-500, 300 + floatingProgress() * -600], [500, -300 + floatingProgress() * 600]]} end={0} lineDash={[16]} zIndex={-5} />
  </>)

  yield* all(
    line1().end(1, 2),
  )

  yield* floatingProgress(1, 3)

  yield* fadeOut(line1)

  yield* all(
    fadeOut(distanceLabel),
    delay(0.5,
      all(
        fadeOut(circle1),
        fadeOut(circle2)
      ))
  )
})