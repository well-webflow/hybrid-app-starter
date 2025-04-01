import { faRoadSpikes } from '@fortawesome/free-solid-svg-icons';
import { WaterfallCategory } from '../../types/waterfall-types';

export default function freemodeCategory() {
  let config: WaterfallCategory = {
    name: 'Free Mode',
    id: 'free-mode',
    icon: faRoadSpikes,
    summary: 'Allow users to swipe the slider freely with swipes',
    description: 'Allow users to swipe the slider freely with swipes',
    items: [
      {
        name: 'Enabled',
        attr: 'free-mode-enabled',
        swiperDefault: 'false',
        value: '',
        description:
          "If 'true', users have full control over the slider with swipes",
        tested: true,
      },
      {
        name: 'Minimum Velocity',
        attr: 'free-mode-minimum-velocity',
        swiperDefault: '0.02',
        value: '',
        description:
          'Minimum touchmove-velocity required to trigger free mode momentum',
        tested: true,
      },
      {
        name: 'Momentum',
        attr: 'free-mode-momentum',
        swiperDefault: 'true',
        value: '',
        description:
          'If enabled, then slide will keep moving for a while after you release it',
        tested: true,
      },
      {
        name: 'Momentum Ratio',
        attr: 'free-mode-momentum-ratio',
        swiperDefault: '1',
        value: '',
        description:
          'Higher value produces larger momentum distance after you release slider',
        tested: true,
      },
      {
        name: 'Momentum Bounce',
        attr: 'free-mode-momentum-bounce',
        swiperDefault: 'true',
        value: '',
        description:
          'Set to false if you want to disable momentum bounce when reaching first/last slides in free mode',
        tested: true,
      },
      {
        name: 'Momentum Bounce Ratio',
        attr: 'free-mode-momentum-bounce-ratio',
        swiperDefault: '1',
        value: '',
        description: 'Higher value produces larger momentum bounce effect',
        tested: true,
      },
      {
        name: 'Momentum Velocity Ratio',
        attr: 'free-mode-momentum-velocity-ratio',
        swiperDefault: '1',
        value: '',
        description:
          'Higher value produces larger momentum velocity after you release slider',
        tested: true,
      },
      {
        name: 'Sticky',
        attr: 'free-mode-sticky',
        swiperDefault: 'false',
        value: '',
        description:
          'Set to enabled to enable snap to slides positions in free mode',
        tested: true,
      },
    ],
  };
  return config;
}
