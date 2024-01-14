import { Circle, Node, NodeProps, Rect, Txt, colorSignal, initial, signal } from "@motion-canvas/2d";
import { ColorSignal, PossibleColor, SignalValue, SimpleSignal, all, createRef, delay, range } from "@motion-canvas/core";
import { fadeToPos } from "concise-motion-core";

export interface PointCloudProps extends NodeProps {
  color?: SignalValue<PossibleColor>,
  label?: SignalValue<string>,
}


/**
 * A Point Cloud component with an optional `label`.
 * Has a fancy `show()` animation.
 */
export class PointCloud extends Node {
  @initial("#ff0000")
  @colorSignal()
  public declare readonly color: ColorSignal<this>;

  @signal()
  public declare readonly label: SimpleSignal<string, this>;

  private readonly container = createRef<Rect>();
  private readonly labelRef = createRef<Rect>();

  public constructor(props?: PointCloudProps) {
    super({
      ...props
    })

    const cloudPool = range(16).map(() => <Circle width={32} height={32} x={Math.random() * 300 - 150} y={Math.random() * 300 - 150} fill={this.color} opacity={0} />)

    this.add(<>
      <Rect ref={this.container}>
        {cloudPool}
        <Rect ref={this.labelRef} opacity={0}>
          {this.label ?
            <Rect fill={this.color} layout padding={16} paddingTop={24} radius={15}>
              <Txt text={props.label} fill={"#ffffff"} x={0} y={0} fontFamily={"monospace"} fontSize={40} />
            </Rect>
            : null}
        </Rect>
      </Rect>
    </>)
  }

  public *show(delayTime: number = 0) {
    let spawnedDots = this.container().childrenAs<Circle>()
    yield* delay(delayTime, all(
      ...spawnedDots.map((dot, index) => fadeToPos(dot, [dot.x(), dot.y()], index / 16)),
      fadeToPos(this.labelRef, [this.labelRef().x(), this.labelRef().y()])
    ))
  }
}