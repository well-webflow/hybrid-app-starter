import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { WaterfallCategory } from '../../types/waterfall-types';

export default function playbackCategory() {
  let config: WaterfallCategory = {
    name: 'Playback',
    id: 'playback',
    icon: faPlay,
    summary: 'Control speed, and automatically move between slides',
    description: 'Control speed, and automatically move between slides',
    groups: [
      {
        name: 'Autoplay',
        id: 'autoplay',
        items: [
          {
            name: 'AutoPlay',
            attr: 'autoplay-mode',
            swiperDefault: 'false',
            value: '',
            description: "If true, 'autoplay' is enabled.",
            type: 'boolean',
            tested: true,
          },
          {
            name: 'Smooth Autoplay',
            attr: 'smooth-autoplay',
            swiperDefault: '',
            value: '',
            description:
              'If true, the slides will move continuously instead of stopping on each slide.',
            tested: false,
          },
          {
            name: 'Autoplay Delay',
            attr: 'delay',
            swiperDefault: '',
            value: '',
            description:
              'Delay between transitions (in ms). If this parameter is not specified, auto play will be disabled. If you need to specify different delay for specific slides you can do it by usingdata-swiper-autoplay (in ms) attribute on slide.',
            tested: true,
          },
          {
            name: 'Disable Autoplay on Interaction',
            attr: 'disable-on-interaction',
            swiperDefault: 'false', // documentation says default is true, doesn't appear to be true
            value: 'true',
            description:
              'If true, autoplay be disabled after any user interactions',
            tested: true,
          },
          {
            name: 'Pause Autoplay on Hover',
            attr: 'pause-on-mouse-enter',
            swiperDefault: 'false',
            value: '',
            description:
              'If true, autoplay will be paused when the pointer enters the Swiper container.',
            tested: true,
          },
          {
            name: 'Reverse Autoplay Direction',
            attr: 'reverse-direction',
            swiperDefault: 'false',
            value: '',
            description:
              "If true, autoplays in the reverse direction. Works well with 'loop'.",
            tested: true,
          },
          {
            name: 'Stop Autoplay on Last Slide',
            attr: 'stop-on-last-slide',
            swiperDefault: 'false',
            value: '',
            description:
              'If true, autoplay will be stopped when it reaches last slide (has no effect in loop mode)',
            tested: true,
          },
          {
            name: 'Autoplay Wait for Transition',
            attr: 'wait-for-transition',
            swiperDefault: 'true',
            value: '',
            description:
              'If true, autoplay will wait for the wrapper transition to continue. Can be disabled in case of using Virtual Translate when your slider may not have transition',
            tested: false,
          },
        ],
      },
      {
        name: 'Loop',
        id: 'loop-settings',
        items: [
          {
            name: 'Loop Add Blank Slides',
            attr: 'loop-add-blank-slides',
            swiperDefault: 'true',
            value: '',
            description:
              'Automatically adds blank slides if you use Grid or slidesPerGroup and the total amount of slides is not even to slidesPerGroup or to grid.rows',
            tested: false,
          },
          {
            name: 'Loop Additional Slides',
            attr: 'loop-additional-slides',
            swiperDefault: '0',
            value: '',
            description:
              'Increase amount of looped slides which may help with loading. Must be less than slidesPerView.',
            tested: true,
          },
          {
            name: 'Loop Prevents Sliding',
            attr: 'loop-prevents-sliding',
            swiperDefault: 'true',
            value: '',
            description:
              'If enabled then slideNext/Prev will do nothing while slider is animating in loop mode',
            tested: false,
          },
        ],
      },
    ],
    items: [
      {
        name: 'Speed',
        attr: 'speed',
        swiperDefault: '300',
        value: '',
        description:
          'Duration of transition between slides (in ms). Small number go fast.',
        tested: true,
        type: 'number',
      },
      {
        name: 'Playback Mode',
        attr: 'playback-mode',
        swiperDefault: 'none',
        value: 'none',
        description: 'Choose between loop, rewind, and none',
        options: ['loop', 'rewind', 'none'],
        tested: false,
        type: 'select',
      },
    ],
  };
  return config;
}
