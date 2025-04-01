import {
  faArrowsTurnRight,
  faBan,
  faHandPointer,
  faICursor,
  faPersonRunning,
} from '@fortawesome/free-solid-svg-icons';
import { WaterfallCategory } from '../../types/waterfall-types';

export default function touchClickCategory() {
  let config: WaterfallCategory = {
    name: 'Touch & Click',
    id: 'touch',
    icon: faICursor,
    summary: 'Click and touchscreen options for mobile iOS/Android',
    description: 'Mobile iOS/Android or touchscreen settings',
    groups: [
      {
        name: 'Click',
        id: '',
        items: [
          {
            name: 'Grab Cursor',
            attr: 'grab-cursor',
            swiperDefault: 'false',
            value: '',
            description:
              'If \'true\', the user will see the "grab" cursor when hovering on the slider.',
            icon: faHandPointer,
            tested: true,
          },
          {
            name: 'Slide to Clicked Slide',
            attr: 'slide-to-clicked-slide',
            swiperDefault: 'false',
            value: '',
            description:
              'Set to true and click on any slide will produce transition to this slide',
            tested: true,
          },
          {
            name: 'Simulate Touch',
            attr: 'simulate-touch',
            swiperDefault: 'true',
            value: '',
            description:
              'If true, Swiper will accept mouse events like touch events (click and drag to change slides)',
            tested: true,
          },
          {
            name: 'Prevent Clicks',
            attr: 'prevent-clicks',
            swiperDefault: 'true',
            value: '',
            description:
              'Set to true to prevent accidental unwanted clicks on links during swiping',
            tested: true,
          },
        ],
      },
      {
        name: 'Swipe',
        id: 'swipes',
        items: [
          {
            name: 'Follow Finger',
            attr: 'follow-finger',
            swiperDefault: 'true',
            value: '',
            description:
              "If 'false', then slider will be animated only when you release it, it will not move while you hold your finger on it",
            tested: true,
          },
          {
            name: 'Resistance',
            attr: 'resistance',
            swiperDefault: 'true',
            value: '',
            description:
              "If 'true' the slider will snap back with small or incomplete swipes",
            tested: true,
          },
          {
            name: 'Short Swipes',
            attr: 'short-swipes',
            swiperDefault: 'true',
            value: '',
            description:
              '(Not working) Set to false if you want to disable short swipes',
            tested: false,
          },
          {
            name: 'Long Swipes',
            attr: 'long-swipes',
            swiperDefault: 'true',
            value: '',
            description:
              'Set to false if you want to disable long swipes (ex. swiping multiple slides at a time)',
            icon: faPersonRunning,
            tested: true,
          },
          {
            name: 'Long Swipes ms',
            attr: 'long-swipes-ms',
            swiperDefault: '300',
            value: '',
            description:
              'Minimal duration (in ms) to trigger swipe to next/previous slide during long swipes',
            tested: true,
          },
          {
            name: 'Long Swipes Ratio',
            attr: 'long-swipes-ratio',
            swiperDefault: '0.5',
            value: '',
            description:
              'Ratio to trigger swipe to next/previous slide during long swipes',
            tested: true,
          },
          {
            name: 'Swipe Handler',
            attr: 'swipe-handler',
            swiperDefault: '',
            value: '',
            description:
              'String with CSS selector or HTML element of the container with pagination that will work as only available handler for swiping',
            tested: false,
          },
        ],
      },
      {
        name: 'Edge Swipes',
        id: 'edge-swipes',
        items: [
          {
            name: 'Edge Swipe Detection',
            attr: 'edge-swipe-detection',
            swiperDefault: 'false',
            value: '',
            description:
              "If set to 'true' the slider will capture touch events and prevent system swipe-back navigation on iOS/Android.",
            tested: true,
          },
          {
            name: 'Edge Swipe Threshold',
            attr: 'edge-swipe-threshold',
            swiperDefault: '20',
            value: '',
            description:
              'Area (in px) from left edge of the screen to release touch events for swipe-back navigation on iOS/Android. (This has a minor, if any, effect)',
            tested: true,
          },
          {
            name: 'Touch Release on Edges',
            attr: 'touch-release-on-edges',
            swiperDefault: 'false',
            value: 'true',
            description:
              'Release touch events on slider when it reaches the beginning or end to allow for page scrolling outside of the swiper container. This feature works only with "touch" events (and not pointer events). Also threshold parameter must be set to 0.',
            tested: true,
          },
        ],
      },
      {
        name: 'No Swiping',
        id: 'no-swiping',
        items: [
          {
            name: 'No Swiping',
            attr: 'no-swiping',
            swiperDefault: 'true',
            value: '',
            description:
              'Enable/disable swiping on elements matched to class specified in noSwipingClass or noSwipingSelector',
            tested: true,
          },
          {
            name: 'No Swiping Class',
            attr: 'no-swiping-class',
            swiperDefault: 'swiper-no-swiping',
            value: '',
            description: "Specify noSwiping's element css class",
            tested: true,
          },
          {
            name: 'No Swiping Selector',
            attr: 'no-swiping-selector',
            swiperDefault: '',
            value: '',
            description:
              "Can be used instead of noSwipingClass to specify elements to disable swiping on. For example 'input' will disable swiping on all inputs",
            tested: true,
          },
        ],
      },
      {
        name: 'Advanced',
        id: 'advanced-touch',
        items: [
          {
            name: 'Threshold',
            attr: 'threshold',
            swiperDefault: '5',
            value: '',
            description:
              '(Not Working?) Threshold value in px. If "touch distance" will be lower than this value then swiper will not move',
            tested: true,
          },
          {
            name: 'Touch Angle',
            attr: 'touch-angle',
            swiperDefault: '45',
            value: '',
            description:
              '(Untested) Allowable angle (in degrees) to trigger touch move',
            tested: true,
          },
          {
            name: 'Touch Events Target',
            attr: 'touch-events-target',
            swiperDefault: 'wrapper',
            value: '',
            description:
              "Target element to listen touch events on. Can be 'container' (to listen for touch events on swiper) or 'wrapper'(to listen for touch events on swiper-wrapper)",
            tested: true,
          },
          {
            name: 'Touch Ratio',
            attr: 'touch-ratio',
            swiperDefault: '1',
            value: '',
            description:
              "Touch ratio (don't blame me, this is the real documentation note)",
            tested: false,
          },
          {
            name: 'Touch Move Stop Propagation',
            attr: 'touch-move-stop-propagation',
            swiperDefault: 'false',
            value: '',
            description:
              'If enabled, then propagation of "touchmove" will be stopped',
            tested: false,
          },
          {
            name: 'Touch Start Force Prevent Default',
            attr: 'touch-start-force-prevent-default',
            swiperDefault: 'false',
            value: '',
            description:
              'Force to always prevent default for touchstart (pointerdown) event',
            tested: false,
          },
          {
            name: 'Touch Start Prevent Default',
            attr: 'touch-start-prevent-default',
            swiperDefault: 'true',
            value: '',
            description: "If disabled, pointerdown event won't be prevented",
            tested: false,
          },
          {
            name: 'Prevent Clicks Propagation',
            attr: 'prevent-clicks-propagation',
            swiperDefault: 'true',
            value: '',
            description:
              'Set to true to stop clicks event propagation on links during swiping',
            tested: true,
          },
          {
            name: 'Resistance Ratio',
            attr: 'resistance-ratio',
            swiperDefault: '0.85',
            value: '',
            description: 'This option allows you to control resistance ratio.',
            tested: false,
          },
        ],
      },
    ],
    items: [
      {
        name: 'Allow Touch Move',
        attr: 'allow-touch-move',
        swiperDefault: 'true',
        value: '',
        description:
          'If false, then the only way to switch the slide is use buttons or functions like slidePrev or slideNext',
        icon: faBan,
        tested: false,
      },
      {
        name: 'One Way Movement',
        attr: 'data-one-way-movement',
        swiperDefault: 'false',
        value: '',
        description:
          "If 'true', will swipe slides only forward (one-way) regardless of swipe direction",
        icon: faArrowsTurnRight,
        tested: true,
      },
      {
        name: 'Prevent Interaction on Transition',
        attr: 'prevent-interaction-on-transition',
        swiperDefault: 'false',
        value: '',
        description:
          "If 'true' swiping and navigation/pagination buttons will be disabled during transition",
        tested: true,
      },
      {
        name: 'Nested',
        attr: 'nested',
        swiperDefault: 'false',
        value: '',
        description:
          'Set to true on Swiper for correct touch events interception. Use only on swipers that use same direction as the parent one',
        tested: false,
      },
    ],
  };
  return config;
}
