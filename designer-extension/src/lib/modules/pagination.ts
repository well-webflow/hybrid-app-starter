import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { WaterfallCategory } from '../../types/waterfall-types';

export default function paginationCategory() {
  let config: WaterfallCategory = {
    name: 'Pagination',
    id: 'pagination',
    icon: faEllipsis,
    summary: 'Add pagination bullets or progress bar to the slider',
    description: 'Add pagination bullets or progress bar to the slider',
    groups: [
      {
        name: 'Dynamic',
        id: 'pagination-dynamic',
        items: [
          {
            name: 'Dynamic Bullets',
            attr: 'dynamic-bullets',
            swiperDefault: 'false',
            value: '',
            description:
              'Good to enable if you use bullets pagination with a lot of slides. So it will keep only few bullets visible at the same time.',
            tested: false,
          },
          {
            name: 'Dynamic Main Bullets',
            attr: 'dynamic-main-bullets',
            swiperDefault: '1',
            value: '',
            description:
              'The number of main bullets visible when dynamicBullets enabled.',
            tested: false,
          },
        ],
      },
      {
        name: 'Class Names',
        id: 'pagination-class-names',
        items: [
          {
            name: 'Clickable Class',
            attr: 'pagination-clickable-class',
            swiperDefault: 'swiper-pagination-clickable',
            value: '',
            description:
              'CSS class name set to pagination when it is clickable',
            tested: false,
          },
          {
            name: 'Current Class',
            attr: 'pagination-current-class',
            swiperDefault: 'swiper-pagination-current',
            value: '',
            description:
              'CSS class name of the element with currently active index in "fraction" pagination',
            tested: false,
          },
          {
            name: 'Hidden Class',
            attr: 'pagination-hidden-class',
            swiperDefault: 'swiper-pagination-hidden',
            value: '',
            description:
              'CSS class name of pagination when it becomes inactive',
            tested: false,
          },
          {
            name: 'Horizontal Class',
            attr: 'pagination-horizontal-class',
            swiperDefault: 'swiper-pagination-horizontal',
            value: '',
            description:
              'CSS class name set to pagination in horizontal Swiper',
            tested: false,
          },
          {
            name: 'Lock Class',
            attr: 'pagination-lock-class',
            swiperDefault: 'swiper-pagination-lock',
            value: '',
            description:
              'CSS class name added to navigation button when it is disabled',
            tested: false,
          },
          {
            name: 'Modifier Class',
            attr: 'pagination-modifier-class',
            swiperDefault: 'swiper-pagination-',
            value: '',
            description:
              'The beginning of the modifier CSS class name that will be added to pagination depending on parameters',
            tested: false,
          },
          {
            name: 'Pagination Disabled Class',
            attr: 'pagination-disabled-class',
            swiperDefault: 'swiper-pagination-disabled',
            value: '',
            description:
              'CSS class name added on swiper container and pagination element when pagination is disabled by breakpoint',
            tested: false,
          },
          {
            name: 'Progressbar Fill Class',
            attr: 'progressbar-fill-class',
            swiperDefault: 'swiper-pagination-progressbar-fill',
            value: '',
            description:
              'CSS class name of pagination progressbar fill element',
            tested: false,
          },
          {
            name: 'Progressbar Opposite Class',
            attr: 'progressbar-opposite-class',
            swiperDefault: 'swiper-pagination-progressbar-opposite',
            value: '',
            description: 'CSS class name of pagination progressbar opposite',
            tested: false,
          },
          {
            name: 'Total Class',
            attr: 'pagination-total-classs',
            swiperDefault: 'swiper-pagination-total',
            value: '',
            description:
              'CSS class name of the element with total number of "snaps" in "fraction" pagination',
            tested: false,
          },
          {
            name: 'Vertical Class',
            attr: 'pagination-vertical-class',
            swiperDefault: 'swiper-pagination-vertical',
            value: '',
            description: 'CSS class name set to pagination in vertical Swiper',
            tested: false,
          },
        ],
      },
      {
        name: 'Advanced',
        id: 'pagination-advanced',
        items: [
          {
            name: 'Format Fraction Current',
            attr: 'format-fraction-current',
            swiperDefault: '',
            value: '',
            description: '(NYI)',
            tested: false,
          },
          {
            name: 'Format Fraction Total',
            attr: 'format-fraction-total',
            swiperDefault: '',
            value: '',
            description: '(NYI)',
            tested: false,
          },
          {
            name: 'Progressbar Opposite',
            attr: 'progressbar-opposite',
            swiperDefault: 'false',
            value: '',
            description:
              "Makes pagination progressbar opposite to Swiper's direction parameter, means vertical progressbar for horizontal swiper direction and horizontal progressbar for vertical swiper direction",
            tested: false,
          },
        ],
      },
    ],
    items: [
      {
        name: 'Type',
        attr: 'pagination-type',
        swiperDefault: 'bullets',
        value: 'bullets',
        description:
          "String with type of pagination. Can be 'bullets', 'numberBullets', 'fraction', 'progressbar' or 'custom'",
        options: [
          'bullets',
          'numberBullets',
          'fraction',
          'progressbar',
          'custom',
        ],
        type: 'select',
        tested: false,
      },
      {
        name: 'Clickable',
        attr: 'pagination-clickable',
        swiperDefault: 'false',
        value: '',
        description:
          'If true then clicking on pagination button will cause transition to appropriate slide. Only for bullets pagination type',
        type: 'boolean',
        tested: false,
      },
      {
        name: 'Enabled',
        attr: 'pagination-enabled',
        swiperDefault: '',
        value: '',
        type: 'boolean',
        description:
          'Boolean property to use with breakpoints to enable/disable pagination on certain breakpoints',
        tested: false,
      },
      {
        name: 'Hide on Click',
        attr: 'pagination-hide-on-click',
        swiperDefault: 'true',
        value: '',
        type: 'boolean',
        description:
          "Toggle (hide/show) pagination container visibility after click on Slider's container",
        tested: false,
      },
    ],
  };
  return config;
}
