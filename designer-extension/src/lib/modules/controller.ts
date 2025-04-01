import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { WaterfallCategory } from '../../types/waterfall-types';

export default function controllerCategory() {
  let config: WaterfallCategory = {
    name: 'Controller',
    id: 'controller',
    icon: faGamepad,
    summary: 'Make another Waterfall controlled by this one',
    items: [
      {
        name: 'By',
        attr: 'controller-by',
        swiperDefault: 'slide',
        description:
          "Defines a way how to control another slider: slide by slide (with respect to other slider's grid) or depending on all slides/container (depending on total slider percentage).",
        options: ['slide', 'container'],
        value: '',
        tested: false,
      },
      {
        name: 'Control',
        attr: 'controller-control',
        swiperDefault: '',
        description:
          'Pass here another Swiper instance or array with Swiper instances that should be controlled by this Swiper. Also accepts string with CSS selector of Swiper element, or HTMLElement of Swiper element',
        value: '',
        type: 'waterfall',
        tested: false,
      },
      {
        name: 'Inverse',
        attr: 'controller-inverse',
        swiperDefault: '',
        description: 'Set to true and controlling will be in inverse direction',
        value: '',
        type: 'boolean',
        tested: false,
      },
    ],
  };
  return config;
}
