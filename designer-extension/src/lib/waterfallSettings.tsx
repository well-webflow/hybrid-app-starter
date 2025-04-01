import generalConfig from "./modules/general";
import layoutConfig from "./modules/layout";
import playbackCategory from "./modules/playback";
import navigationCategory from "./modules/navigation";
import paginationCategory from "./modules/pagination";
import freemodeCategory from "./modules/freeMode";
import touchClickCategory from "./modules/touchClick";
import effectCategory from "./modules/effect";
import thumbsCategory from "./modules/thumbs";
import keyboardCategory from "./modules/keyboard";
import mousewheelCategory from "./modules/mousewheel";
import memoryCategory from "./modules/memory";
import controllerCategory from "./modules/controller";
import a11yConfig from "./modules/a11y";
import classnamesCategory from "./modules/classNames";
import advancedCategory from "./modules/advanced";
import { WaterfallCategory } from "../types/waterfall-types";

export const defaultWaterfallSettings: WaterfallCategory[] = [
  generalConfig(),
  layoutConfig(),
  playbackCategory(),
  navigationCategory(),
  paginationCategory(),
  freemodeCategory(),
  touchClickCategory(),
  // MANIPULATION (NOT IMPLEMENTED)
  // PARALLAX (NOT IMPLEMENTED)
  effectCategory(),
  thumbsCategory(),
  // ZOOM (NOT IMPLEMENTED)
  keyboardCategory(),
  mousewheelCategory(),
  // VIRTUAL (NOT IMPLEMENTED)
  memoryCategory(),
  // HISTORY NAVIGATION (NOT IMPLEMENTED)
  controllerCategory(),
  a11yConfig(),
  classnamesCategory(),
  advancedCategory(),
];
