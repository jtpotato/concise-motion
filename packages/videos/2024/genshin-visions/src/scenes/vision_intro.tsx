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
      <PointCloud label="Pyro" ref={pointClouds.pyro} x={-500} y={300} color={"#ff0000"} />
      <PointCloud label="Cryo" ref={pointClouds.cryo} x={-200} y={100} color={"rgb(88, 188, 241)"} />
      <PointCloud label="Hydro" ref={pointClouds.hydro} x={100} y={400} color={"#2b63f3"} />
      <PointCloud label="Electro" ref={pointClouds.electro} x={-300} y={-200} />
      <PointCloud label="Geo" ref={pointClouds.geo} x={300} y={-400} />
      <PointCloud label="Anemo" ref={pointClouds.anemo} x={150} y={0} />
      <PointCloud label="Dendro" ref={pointClouds.dendro} x={500} y={10} />
    </Rect>

  )

  yield* codeRef().edit(1, false)`${edit('', 'const visions')}`

  yield* waitUntil("a function of personality")

  yield* codeRef().edit(1.5, false)`const visions${edit('', ' = f(personality)')}`

  yield* waitFor(1)

  yield* codeRef().edit(1, false)`${edit('const visions = f(personality)', '')}`

  yield* all(
    pointClouds.pyro().show(),
    pointClouds.cryo().show(0.5),
    pointClouds.hydro().show(1),
    pointClouds.electro().show(1.5),
    pointClouds.geo().show(2),
    pointClouds.anemo().show(2.5),
    pointClouds.dendro().show(3),
  )
})