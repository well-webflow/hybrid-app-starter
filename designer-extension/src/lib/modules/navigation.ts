import { faArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';
import { WaterfallCategory } from '../../types/waterfall-types';

export default function navigationCategory() {
  let config: WaterfallCategory = {
    name: 'Navigation',
    id: 'nav',
    icon: faArrowsLeftRight,
    summary: 'Add navigation buttons to the slider',
    description: 'Add navigation buttons to the slider',
    groups: [
      {
        name: 'Classes',
        id: 'nav-classes',
        items: [
          {
            name: 'Disabled Class',
            attr: 'nav-disabled-class',
            swiperDefault: 'swiper-button-disabled',
            value: '',
            description:
              'CSS class name added to navigation button when it becomes disabled',
            tested: false,
          },
          {
            name: 'Hidden Class',
            attr: 'nav-hidden-class',
            swiperDefault: 'swiper-button-hidden',
            value: '',
            description:
              'CSS class name added to navigation button when it becomes hidden',
            tested: false,
          },
          {
            name: 'Lock Class',
            attr: 'nav-lock-class',
            swiperDefault: 'swiper-button-lock',
            value: '',
            description:
              'CSS class name added to navigation button when it is disabled',
            tested: false,
          },
          {
            name: 'Navigation Disabled Class',
            attr: 'nav-disabled-class',
            swiperDefault: 'swiper-navigation-disabled',
            value: '',
            description:
              'CSS class name added on swiper container when navigation is disabled by breakpoint',
            tested: false,
          },
        ],
      },
    ],
    items: [
      {
        name: 'Enabled',
        attr: 'nav-enabled',
        swiperDefault: '',
        value: '',
        description:
          'Boolean property to use with breakpoints to enable/disable navigation on certain breakpoints',
        tested: false,
      },
      {
        name: 'Hide on Click',
        attr: 'nav-hide-on-click',
        swiperDefault: 'false',
        value: '',
        description:
          "Toggle navigation buttons visibility after click on Slider's container",
        tested: false,
      },
      {
        name: 'Allow Slide Next',
        attr: 'allow-slide-next',
        swiperDefault: 'true',
        value: '',
        description:
          'Set to false to disable swiping to next slide direction (to right or bottom)',
        tested: false,
      },
      {
        name: 'Allow Slide Prev',
        attr: 'allow-slide-prev',
        swiperDefault: 'true',
        value: '',
        description:
          'Set to false to disable swiping to previous slide direction (to left or top)',
        tested: false,
      },
    ],
    actions: [
      {
        label: 'Prev Button',
        attr: 'prev',
      },
      {
        label: 'Next Button',
        attr: 'next',
      },
    ],
  };
  return config;
}
