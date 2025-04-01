import { faMouse } from '@fortawesome/free-solid-svg-icons';
import { WaterfallCategory } from '../../types/waterfall-types';

export default function mousewheelCategory() {
  let config: WaterfallCategory = {
    name: 'Mousewheel',
    id: 'mouse-wheel',
    icon: faMouse,
    summary: 'Edit how the mouse scroll interacts with the swiper',
    description: 'Edit how the mouse scroll interacts with the swiper',
    items: [
      {
        name: 'Mouse Enabled',
        attr: 'mouse-enabled',
        swiperDefault: 'false',
        description: 'Set to true to enable mousewheel control',
        type: 'boolean',
        value: '',
        tested: false,
      },
      {
        name: 'Events Target',
        attr: 'mouse-events-target',
        swiperDefault: 'container',
        description:
          'String with CSS selector or HTML element of the container accepting mousewheel events. By default it is swiper',
        value: '',
        tested: false,
      },
      {
        name: 'Force to Axis',
        attr: 'mouse-force-to-axis',
        swiperDefault: 'false',
        description:
          'Set to true to force mousewheel swipes to axis. So in horizontal mode mousewheel will work only with horizontal mousewheel scrolling, and only with vertical scrolling in vertical mode.',
        value: '',
        type: 'boolean',
        tested: false,
      },
      {
        name: 'Invert',
        attr: 'mouse-invert',
        swiperDefault: 'false',
        description: 'Set to true to invert sliding direction',
        value: '',
        type: 'boolean',
        tested: false,
      },
      {
        name: 'No Mousewheel Class',
        attr: 'no-mousewheel-class',
        swiperDefault: 'swiper-no-mousewheel',
        description: 'Scrolling on elements with this class will be ignored',
        value: '',
        tested: false,
      },
      {
        name: 'Release on Edges',
        attr: 'mouse-release-on-edges',
        swiperDefault: 'false',
        description:
          'Set to true and swiper will release mousewheel event and allow page scrolling when swiper is on edge positions (in the beginning or in the end)',
        value: '',
        type: 'boolean',
        tested: false,
      },
      {
        name: 'Sensitivity',
        attr: 'mouse-sensitivity',
        swiperDefault: '1',
        description:
          'Multiplier of mousewheel data, allows to tweak mouse wheel sensitivity',
        value: '',
        tested: false,
      },
      {
        name: 'Threshold Delta',
        attr: 'mouse-threshold-delta',
        swiperDefault: 'null',
        description:
          'Minimum mousewheel scroll delta to trigger swiper slide change',
        value: '',
        tested: false,
      },
      {
        name: 'Threshold Time',
        attr: 'mouse-threshold-time',
        swiperDefault: 'null',
        description:
          'Minimum mousewheel scroll time delta (in ms) to trigger swiper slide change',
        value: '',
        tested: false,
      },
    ],
  };
  return config;
}
