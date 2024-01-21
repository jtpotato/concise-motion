import { shapeDefaults } from "./shapeDefaults";
import { fadeToPos } from "./animation/fadeToPos";
import { triangle } from "./triangle";
import { cascade } from "./animation/cascade";
import { fadeOut, fadeOutLine } from "./animation/fadeOut";
import { trace } from "./animation/trace";
import { fadeInFrom } from "./animation/fadeInFrom";
import { PointCloud } from "./components/PointCloud";

/**
 * Returns the default values for LaTeX.
 * @returns ```{ scale: 4, opacity: 0 }```
 */
export function latexDefaults() {
  return {
    scale: 4,
    opacity: 0,
  };
}

export { shapeDefaults, fadeToPos, triangle, cascade, fadeOut, fadeOutLine, trace, fadeInFrom, PointCloud };
