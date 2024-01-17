import {makeProject} from '@motion-canvas/core';

import pythagIntro from './scenes/pythag_intro?scene';
import comparePersonalities from './scenes/compare_personalities?scene';
import visionIntro from './scenes/vision_intro?scene';
import euclidianDistance from './scenes/euclidian_distance?scene';

export default makeProject({
  scenes: [visionIntro, comparePersonalities, pythagIntro, euclidianDistance],
});
