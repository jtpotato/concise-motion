import { Rect, makeScene2D } from "@motion-canvas/2d";
import { CodeBlock, edit } from '@motion-canvas/2d/lib/components/CodeBlock';
import { all, createRef, createRefMap, waitFor, waitUntil } from "@motion-canvas/core";
import { fadeToPos } from "concise-motion-core";
import { PointCloud } from "../components/PointCloud";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill('black');

  const codeRef = createRef<CodeBlock>()
  const pointClouds = createRefMap<PointCloud>()
  const viewParent = createRef<Rect>()

  yield view.add(
    <Rect ref={viewParent}>
      <CodeBlock
        ref={codeRef}
        language="js"
        code={``} />
      <PointCloud label="Pyro" ref={pointClouds.pyro} x={-500} y={300} color={"#bc0000"} radius={150} />
      <PointCloud label="Cryo" ref={pointClouds.cryo} x={-200} y={100} color={"#b9dfe4"} radius={150} />
      <PointCloud label="Hydro" ref={pointClouds.hydro} x={100} y={400} color={"#2b63f3"} radius={150} />
      <PointCloud label="Electro" ref={pointClouds.electro} x={-300} y={-200} color={"#bf00ff"} radius={150} />
      <PointCloud label="Geo" ref={pointClouds.geo} x={300} y={-400} color={"#E5BB54"} radius={150} />
      <PointCloud label="Anemo" ref={pointClouds.anemo} x={150} y={0} color={"#6EC1AD"} radius={150} />
      <PointCloud label="Dendro" ref={pointClouds.dendro} x={500} y={100} color={"#85BE54"} radius={150} />
    </Rect>

  )

  yield* codeRef().edit(1, false)`${edit('', 'const visions')}`

  yield* waitUntil("a function of personality")

  yield* codeRef().edit(1.5, false)`const visions${edit('', ' = f(personality)')}`

  yield* waitFor(1)

  yield* codeRef().edit(1, false)`${edit('const visions = f(personality)', '')}`

  yield* all(
    pointClouds.pyro().show(),
    pointClouds.cryo().show(0.2),
    pointClouds.hydro().show(0.4),
    pointClouds.electro().show(0.6),
    pointClouds.geo().show(0.8),
    pointClouds.anemo().show(1),
    pointClouds.dendro().show(1.2),
  )
  // hide all with delay
  yield* all(
    pointClouds.pyro().hide(),
    pointClouds.cryo().hide(0.2),
    pointClouds.hydro().hide(0.4),
    pointClouds.electro().hide(0.6),
    pointClouds.geo().hide(0.8),
    pointClouds.anemo().hide(1),
    pointClouds.dendro().hide(1.2),
  )
})