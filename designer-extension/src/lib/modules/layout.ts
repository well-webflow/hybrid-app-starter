import {
  faArrowsLeftRight,
  faArrowsLeftRightToLine,
  faHashtag,
  faTable,
} from '@fortawesome/free-solid-svg-icons';
import { WaterfallCategory } from '../../types/waterfall-types';

export default function layoutConfig() {
  let config: WaterfallCategory = {
    name: 'Layout',
    id: 'layout',
    icon: faTable,
    summary: 'Direction, space between, # of slides, grouping and more',
    description:
      'Layout options, including direction, # of slides shown, spacing, and slide grouping',
    groups: [
      {
        name: 'Slides Per Group',
        id: 'slides-per-group',
        items: [
          {
            name: 'Slides Per Group',
            attr: 'slides-per-group',
            swiperDefault: '1',
            value: '',
            breakpoints: {
              lmobile: '',
              tablet: '',
              desktop: '',
              large: '',
              xlarge: '',
            },
            description:
              'Set numbers of slides to define and enable group sliding (sliding more than 1 slide at a time). Useful to use with slidesPerView > 1',
            tested: true,
            type: 'number',
          },
          {
            name: 'Slides Per Group Auto',
            attr: 'slides-per-group-auto',
            swiperDefault: 'false',
            value: '',
            description:
              "This param intended to be used only with slidesPerView: 'auto' and slidesPerGroup: 1. If 'true', it will skip all slides in view on .slideNext() & .slidePrev() methods calls, on Navigation \"buttons\" clicks and in autoplay.",
            tested: false,
          },
          {
            name: 'Slides Per Group Skip',
            attr: 'slides-per-group-skip',
            swiperDefault: '0',
            value: '',
            description: '',
            tested: false,
          },
        ],
      },
      {
        name: 'Center',
        id: 'center',
        items: [
          {
            name: 'Centered Slides',
            attr: 'centered-slides',
            swiperDefault: 'false',
            value: 'false',
            breakpoints: {
              lmobile: '',
              tablet: '',
              desktop: '',
              large: '',
              xlarge: '',
            },
            description:
              'If true, then active slide will be centered, not always on the left side.',
            tested: true,
            type: 'boolean',
          },
          {
            name: 'Centered Slides Bounds',
            attr: 'centered-slides-bounds',
            swiperDefault: 'false',
            value: '',
            description:
              'If true, then active slide will be centered without adding gaps at the beginning and end of slider. Required centeredSlides: true. Not intended to be used with loop or pagination.',
            tested: false,
            type: 'boolean',
          },
          {
            name: 'Center Insufficient Slides',
            attr: 'center-insufficient-slides',
            swiperDefault: 'false',
            value: '',
            description:
              'If true, centers slides if the total amount of slides is less than slidesPerView. Not intended to be used loop mode and grid.rows',
            tested: true,
            type: 'boolean',
          },
        ],
      },
      {
        name: 'Grid',
        id: 'grid',
        description:
          "Display slides in a grid. In order for this to work, slider should have a fixed height. Warnings: If used with loop mode, make sure the # of slides is specified or enable loopAddBlankSlides. slidesPerView: 'auto' is currently not compatible with multirow mode, when grid.rows > 1",
        items: [
          {
            name: 'Fill',
            attr: 'grid-fill',
            swiperDefault: 'column',
            value: '',
            description:
              "Can be 'column' or 'row'. Defines how slides should fill rows, by column or by row",
            tested: true,
          },
          {
            name: 'Rows',
            attr: 'grid-rows',
            swiperDefault: '1',
            value: '',
            description: 'Number of slides per column, for multirow layout.',
            tested: true,
          },
        ],
      },
      {
        name: 'Offset',
        id: 'offset',
        items: [
          {
            name: 'Slides Offset After',
            attr: 'slides-offset-after',
            swiperDefault: '0',
            value: '',
            description:
              'Add (in px) additional slide offset in the end of the container (after all slides)',
            tested: true,
          },
          {
            name: 'Slides Offset Before',
            attr: 'slides-offset-before',
            swiperDefault: '0',
            value: '',
            description:
              'Add (in px) additional slide offset in the beginning of the container (before all slides)',
            tested: true,
          },
        ],
      },
      {
        name: 'Advanced Sizing',
        id: 'advanced-sizing',
        items: [
          {
            name: 'Auto Height',
            attr: 'auto-height',
            swiperDefault: 'false',
            value: '',
            description:
              'Set to true and slider wrapper will adapt its height to the height of the currently active slide',
            tested: true,
            type: 'boolean',
          },
          {
            name: 'Height',
            attr: 'height',
            swiperDefault: 'null',
            value: '',
            description:
              "(I swear this doesn't work) Swiper height (in px). Parameter allows to force Swiper height. Useful only if you initialize Swiper when it is hidden and in SSR and Test environments for correct Swiper initialization",
            tested: true,
          },
          {
            name: 'Width',
            attr: 'width',
            swiperDefault: '',
            value: '',
            description:
              'WARNING: Setting this parameter will make Swiper not responsive. Swiper width (in px). Parameter allows to force Swiper width. Useful only if you initialize Swiper when it is hidden and in SSR and Test environments for correct Swiper initialization.',
            tested: false,
          },
          {
            name: 'Update on Window Resize',
            attr: 'update-on-window-resize',
            swiperDefault: 'true',
            value: '',
            description:
              'Swiper will recalculate slides position on window resize (orientationchange)',
            tested: true,
          },
        ],
      },
    ],
    items: [
      {
        name: 'Direction',
        attr: 'direction',
        swiperDefault: 'horizontal',
        value: '',
        description: "Can be 'horizontal' or 'vertical' (for vertical slider).",
        tested: true,
        options: ['horizontal', 'vertical'],
        icon: faArrowsLeftRight,
        type: 'select',
      },
      {
        name: 'Slides Per View',
        attr: 'slides-per-view',
        swiperDefault: '1',
        value: '1',
        icon: faHashtag,
        breakpoints: {
          lmobile: '',
          tablet: '',
          desktop: '',
          large: '',
          xlarge: '',
        },
        description:
          "Number of slides per view (slides visible at the same time on slider's container).",
        tested: true,
        type: 'string',
      },
      {
        name: 'Space Between',
        attr: 'space-between',
        swiperDefault: '0',
        value: '0',
        breakpoints: {
          lmobile: '',
          tablet: '',
          desktop: '',
          large: '',
          xlarge: '',
        },
        description:
          'Distance between slides in px. NOTE: If you add margin to elements inside the Waterfall, navigation might not work properly.',
        tested: true,
        icon: faArrowsLeftRightToLine,
        type: 'string',
      },
      {
        name: 'Initial Slide #',
        attr: 'initial-slide',
        swiperDefault: '0',
        value: '',
        description:
          'Index number of initial slide. (0 is the first slide, 1 is the 2nd and so on)',
        tested: true,
        type: 'number',
      },
    ],
  };
  return config;
}
