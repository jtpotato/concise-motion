import { Node, NodeProps, Rect, initial, signal } from "@motion-canvas/2d";
import { PossibleVector2, SignalValue, SimpleSignal, createRef, createSignal } from "@motion-canvas/core";
import { fadeToPos } from "../animation/fadeToPos";
import { cascade } from "../animation/cascade";
import { fadeOut } from "../animation/fadeOut";

export interface SpawnerProps extends NodeProps {
  /** Spawn radius */
  radius?: SignalValue<number>
}


/**
 * A Spawner component
 * Has a fancy `show()` and `hide()` animation.
 */

function spiralGenerator(index: number, radius: number) {
  const distance = radius + index * 20;
  const angle = (index)
  const x = Math.cos(angle + Math.PI / 2) * distance * 1.5;
  const y = Math.sin(angle + Math.PI / 2) * distance;

  return [x, y];
}

export class Spawner extends Node {
  @initial(300)
  @signal()
  public declare readonly radius: SimpleSignal<number, this>;

  private readonly displayUpToIndex = createSignal(-1);

  public constructor(props?: SpawnerProps) {
    super({
      ...props
    })
  }

  public *displayNext() {
    const current = this.displayUpToIndex() + 1;
    const children = this.children()[current]
    if (!children) return;

    const randomCoords = spiralGenerator(current, this.radius() / 2)
    yield* fadeToPos(children, randomCoords as [number, number])

    this.displayUpToIndex(current);
  }

  public *collapseChildren() {
    yield* cascade(0.1, ...this.children().map((child) => fadeOut(child)))
  }
}