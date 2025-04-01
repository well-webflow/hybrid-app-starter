import { faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import { WaterfallCategory } from '../../types/waterfall-types';

export default function scrollbarCategory() {
  let config: WaterfallCategory = {
    name: 'Scrollbar',
    id: 'scrollbar',
    icon: faBarsProgress,
    summary: 'Add a scrollbar to the slider',
    description: 'Add a scrollbar to the slider',
    groups: [
      {
        name: 'Class Names',
        id: 'scroll-classes',
        items: [
          {
            name: 'Horizontal Class',
            attr: 'scrollbar-horizontal-class',
            swiperDefault: 'swiper-scrollbar-horizontal',
            value: '',
            type: 'string',
            description: 'CSS class name set to scrollbar in horizontal Swiper',
            tested: false,
          },
          {
            name: 'Lock Class',
            attr: 'scrollbar-lock-class',
            swiperDefault: 'swiper-scrollbar-lock',
            value: '',
            type: 'string',
            description:
              'Scrollbar element additional CSS class when it is disabled',
            tested: false,
          },
          {
            name: 'Scrollbar Disabled Class',
            attr: 'scrollbar-disabled-class',
            swiperDefault: 'swiper-scrollbar-disabled',
            value: '',
            description:
              'CSS class name added on swiper container and scrollbar element when scrollbar is disabled by breakpoint',
            tested: false,
          },
          {
            name: 'Vertical Class',
            attr: 'scrollbar-vertical-class',
            swiperDefault: 'swiper-scrollbar-vertical',
            value: '',
            description: 'CSS class name set to scrollbar in vertical Swiper',
            tested: false,
          },
        ],
      },
    ],
    items: [
      {
        name: 'Drag Size',
        attr: 'scrollbar-drag-size',
        swiperDefault: 'auto',
        value: '',
        description: 'Size of scrollbar draggable element in px',
        tested: true,
      },
      {
        name: 'Draggable',
        attr: 'scrollbar-draggable',
        swiperDefault: 'false',
        value: '',
        type: 'boolean',
        description:
          'Set to true to enable make scrollbar draggable that allows you to control slider position',
        tested: true,
      },
      {
        name: 'Enabled',
        attr: 'scrollbar-enabled',
        swiperDefault: '',
        value: '',
        type: 'boolean',
        description:
          'Boolean property to use with breakpoints to enable/disable scrollbar on certain breakpoints',
        tested: false,
      },
      {
        name: 'Hide',
        attr: 'scrollbar-hide',
        swiperDefault: 'true',
        value: '',
        type: 'boolean',
        description:
          '(Not Working) Set to true to hide scrollbar automatically after user interaction',
        tested: false,
      },
      {
        name: 'Snap on Release',
        attr: 'snap-on-release',
        swiperDefault: 'false', // the documentation says default is false but is actually true lmao
        value: '',
        type: 'boolean',
        description:
          'Set to true to snap slider position to slides when you release scrollbar',
        tested: false,
      },
    ],
  };
  return config;
}
