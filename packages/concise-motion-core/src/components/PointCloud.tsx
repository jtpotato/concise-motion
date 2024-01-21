import { Circle, Node, NodeProps, Rect, Txt, colorSignal, initial, signal } from "@motion-canvas/2d";
import { ColorSignal, PossibleColor, SignalValue, SimpleSignal, all, createRef, delay, range } from "@motion-canvas/core";
import { fadeToPos } from "concise-motion-core";
import { fadeOut } from "../animation/fadeOut";

export interface PointCloudProps extends NodeProps {
  /** Colour of point cloud */
  color?: SignalValue<PossibleColor>,
  /** Label of the point cloud */
  label?: SignalValue<string>,
  /** Radius of the point cloud */
  radius?: SignalValue<number>,
  /** Number of dots in the cloud */
  qty?: SignalValue<number>,
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
  @initial(300)
  @signal()
  public declare readonly radius: SimpleSignal<number, this>;
  @initial(16)
  @signal()
  public declare readonly qty: SimpleSignal<number, this>;

  private readonly container = createRef<Rect>();
  private readonly labelRef = createRef<Rect>();

  public constructor(props?: PointCloudProps) {
    super({
      ...props
    })

    const cloudPool = range(this.qty()).map(() => <Circle width={32} height={32} x={Math.random() * this.radius() * 2 - this.radius()} y={Math.random() * this.radius() * 2 - this.radius()} fill={this.color} opacity={0} />)

    this.add(<>
      <Rect ref={this.container}>
        {cloudPool}
        <Rect ref={this.labelRef} opacity={0}>
          {this.label ?
            <Rect fill={this.color} layout padding={16} paddingTop={24} radius={15}>
              <Txt text={this.label()} fill={"#ffffff"} x={0} y={0} fontFamily={"monospace"} fontSize={40} />
            </Rect>
            : null}
        </Rect>
      </Rect>
    </>)
  }

  public *show(delayTime: number = 0) {
    let spawnedDots = this.container().childrenAs<Circle>()
    yield* delay(delayTime, all(
      ...spawnedDots.map((dot, index) => fadeToPos(dot, [dot.x(), dot.y()], index / 12)),
      fadeToPos(this.labelRef, [this.labelRef().x(), this.labelRef().y()])
    ))
  }

  public *hide(delayTime: number = 0) {
    let spawnedDots = this.container().childrenAs<Circle>()
    yield* delay(delayTime, all(
      ...spawnedDots.map((dot, index) => delay(index / 12, fadeOut(dot))),
    ))
  }
}