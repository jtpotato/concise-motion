import {makeProject} from '@motion-canvas/core';

import pythagIntro from './scenes/pythag_intro?scene';
import visionIntro from './scenes/vision_intro?scene';

export default makeProject({
  scenes: [visionIntro, pythagIntro],
});
