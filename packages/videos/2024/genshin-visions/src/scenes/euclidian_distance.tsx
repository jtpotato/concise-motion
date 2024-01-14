import { makeScene2D } from "@motion-canvas/2d";
import { CodeBlock, edit } from "@motion-canvas/2d/lib/components/CodeBlock";
import { createRef, waitFor } from "@motion-canvas/core";

// euclidian distance function
// function euclidianDistance(array1: number[], array2: number[]) {
//   if (array1.length != array2.length) throw "Arrays are not the same length.";

//   const differences = [];
//   for (let i = 0; i < array1.length; i++) {
//     differences.push((array2[i] - array1[i]) ** 2);
//   }

//   return Math.sqrt(differences.reduce((partialSum, a) => partialSum + a, 0));
// }

export default makeScene2D(function* (view) {
  view.fill('black')
  const codeRef = createRef<CodeBlock>()

  yield view.add(<>
    <CodeBlock ref={codeRef} code={`
      const differences = [];
      for (let i = 0; i < array1.length; i++) {
        differences.push((array2[i] - array1[i]) ** 2);
      }
    
      return Math.sqrt(differences.reduce((partialSum, a) => partialSum + a, 0));
    `} language="ts" scale={0.8} />
  </>)

  yield* codeRef().edit(1.5)`
  ${edit('', 'function euclidianDistance(array1: number[], array2: number[]) {')}
    const differences = [];
    for (let i = 0; i < array1.length; i++) {
      differences.push((array2[i] - array1[i]) ** 2);
    }

    return Math.sqrt(differences.reduce((partialSum, a) => partialSum + a, 0));
  ${edit('', '}')}
  `

  yield* codeRef().edit(1)`
  ${edit(`  function euclidianDistance(array1: number[], array2: number[]) {
    const differences = [];
    for (let i = 0; i < array1.length; i++) {
      differences.push((array2[i] - array1[i]) ** 2);
    }

    return Math.sqrt(differences.reduce((partialSum, a) => partialSum + a, 0));
  }`, '')}
  `
})