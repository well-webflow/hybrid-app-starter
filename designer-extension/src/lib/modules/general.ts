import { faBug, faCog, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { WaterfallCategory } from '../../types/waterfall-types';

export default function generalConfig() {
  let config: WaterfallCategory = {
    name: 'General',
    id: 'general',
    icon: faCog,
    description: 'Basic settings for all sliders',
    summary: 'Basic settings for all sliders',
    groups: [
      {
        name: 'Enable/Disable (Advanced)',
        id: 'enable-advanced',
        items: [
          {
            name: 'Enabled',
            attr: 'enabled',
            swiperDefault: 'true',
            value: '',
            description:
              "Whether Swiper initially enabled. When Swiper is disabled, it will hide all navigation elements and won't respond to any events and interactions",
            tested: false,
          },
          {
            name: 'Init',
            attr: 'init',
            swiperDefault: 'true',
            value: '',
            description:
              'Whether Swiper should be initialised automatically when you create an instance. If disabled, then you need to init it manually by calling swiper.init()',
            tested: false,
          },
        ],
      },
    ],
    items: [
      {
        name: 'Waterfall Name',
        attr: 'waterfall',
        swiperDefault: '-',
        value: 'New Waterfall',
        description: 'The name of the waterfall',
        tested: true,
        icon: faNoteSticky,
        type: 'string',
      },
      {
        name: 'Debug',
        attr: 'debug-mode',
        swiperDefault: 'false',
        value: 'false',
        description: 'Prints out debug statements to the browser console',
        tested: true,
        icon: faBug,
        type: 'boolean',
      },
      {
        name: 'Debug (Advanced)',
        attr: 'advanced-debug-mode',
        swiperDefault: 'false',
        value: 'false',
        description: 'Prints out more debug statements to the browser console',
        tested: true,
        icon: faBug,
        type: 'boolean',
      },
    ],
  };

  return config;
}
