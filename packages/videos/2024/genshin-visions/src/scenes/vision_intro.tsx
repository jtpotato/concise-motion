import { Rect, makeScene2D } from "@motion-canvas/2d";
import { CodeBlock, edit } from '@motion-canvas/2d/lib/components/CodeBlock';
import { createRef, waitFor, waitUntil } from "@motion-canvas/core";
import { fadeToPos } from "concise-motion-core";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill('black');

  const codeRef = createRef<CodeBlock>()
  const viewParent = createRef<Rect>()

  yield view.add(
    <Rect ref={viewParent}>
      <CodeBlock
        ref={codeRef}
        language="js"
        code={``} />
    </Rect>

  )

  yield* codeRef().edit(1, false)`${edit('', 'const visions')}`

  yield* waitUntil("a function of personality")

  yield* codeRef().edit(1.5, false)`const visions${edit('', ' = f(personality)')}`

  yield* waitFor(1)

  yield* codeRef().edit(1, false)`${edit('const visions = f(personality)', '')}`
})