import { Circle, Line, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { PossibleVector2, SignalValue, Vector2, all, createRef, createSignal, delay, waitUntil } from "@motion-canvas/core";
import { cascade, fadeOut, fadeOutLine, fadeToPos, shapeDefaults } from "concise-motion-core";

export default makeScene2D(function* (view) {
  view.fill('black')

  const circle1 = createRef<Circle>()
  const circle2 = createRef<Circle>()
  const line1 = createRef<Line>()
  const distanceLabel = createRef<Txt>()

  const viewRef = createRef<Rect>()

  const circle1PosX = createSignal(-500)
  const circle1PosY = createSignal(300)
  const circle2PosX = createSignal(500)
  const circle2PosY = createSignal(-300)

  function calculateDistance(pos1: PossibleVector2, pos2: PossibleVector2) {
    const vpos1 = new Vector2(pos1)
    const vpos2 = new Vector2(pos2)
    const d = Math.sqrt(Math.pow(vpos1.x - vpos2.x, 2) + Math.pow(vpos1.y - vpos2.y, 2)) / 100
    return d.toFixed(2)
  }

  view.add(<>
    <Rect ref={viewRef}>
      <Circle {...shapeDefaults()} width={32} height={32} ref={circle1} x={() => circle1PosX()} y={() => circle1PosY()} opacity={1}>

      </Circle>
      <Circle {...shapeDefaults()} width={32} height={32} ref={circle2} x={() => circle2PosX()} y={() => circle2PosY()} opacity={1}>
        <Txt ref={distanceLabel} text={() => "d = " + calculateDistance([circle1PosX(), circle1PosY()], [circle2PosX(), circle2PosY()])} fill={"#eedd00"} x={150} y={0} fontFamily={"monospace"} fontSize={40} />
      </Circle>
      <Line ref={line1} points={() => [[circle1PosX(), circle1PosY()], [circle2PosX(), circle2PosY()]]} lineWidth={4} stroke={"#77aaff"} end={0} lineDash={[16]} zIndex={-5} />
    </Rect>
  </>)

  yield* viewRef().opacity(0, 0).to(1, 1)

  yield* all(
    line1().end(1, 1),
  )

  yield* all(
    circle1PosY(-300, 2),
    circle2PosY(300, 2)
  )

  yield* cascade(0.5,
    fadeOutLine(line1),
    fadeOut(distanceLabel),
    all(
      fadeOut(circle1),
      fadeOut(circle2)
    )
  )
})