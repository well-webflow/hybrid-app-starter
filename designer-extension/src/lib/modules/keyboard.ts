import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { WaterfallCategory } from '../../types/waterfall-types';

export default function keyboardCategory() {
  let config: WaterfallCategory = {
    name: 'Keyboard',
    id: 'keyboard',
    icon: faKeyboard,
    summary: 'Allow the swiper to be navigated via the keyboard',
    description: 'Allow the swiper to be navigated via the keyboard',
    items: [
      {
        name: 'Enabled',
        attr: 'keyboard-enabled',
        swiperDefault: 'false',
        description: 'Set to true to enable keyboard control',
        value: '',
        tested: true,
      },
      {
        name: 'Only In Viewport',
        attr: 'keyboard-only-in-viewport',
        swiperDefault: 'true',
        description:
          'When enabled it will control sliders that are currently in viewport',
        value: '',
        tested: false,
      },
      {
        name: 'Page Up Down',
        attr: 'page-up-down',
        swiperDefault: 'true',
        description:
          'When enabled it will enable keyboard navigation by Page Up and Page Down keys',
        value: '',
        tested: false,
      },
    ],
  };
  return config;
}
