import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { WaterfallCategory } from '../../types/waterfall-types';

export default function a11yConfig() {
  let config: WaterfallCategory = {
    name: 'Accessibility (a11y)',
    id: 'accessibility',
    description: 'Set a11y messages, roles, and tags',
    summary: 'Set a11y messages, roles, and tags',
    icon: faPerson,
    items: [
      {
        name: 'Container Message',
        attr: 'a11y-container-message',
        swiperDefault: '',
        description: 'Message for screen readers for outer swiper container',
        value: '',
        tested: false,
      },
      {
        name: 'Container Role',
        attr: 'a11y-container-role',
        swiperDefault: '',
        description:
          'Value of the "role" attribute to be set on the swiper container',
        value: '',
        tested: false,
      },
      {
        name: 'Container Role Description Message',
        attr: 'a11y-container-role-description-message',
        swiperDefault: '',
        description:
          'Message for screen readers describing the role of outer swiper container',
        value: '',
        tested: false,
      },
      {
        name: 'Enabled',
        attr: 'a11y-enabled',
        swiperDefault: '',
        description: 'Enables A11y',
        value: '',
        type: 'boolean',
        tested: false,
      },
      {
        name: 'First Slide Message',
        attr: 'a11y-first-slide-message',
        swiperDefault: 'This is the first slide',
        description:
          'Message for screen readers for previous button when swiper is on first slide',
        value: '',
        tested: false,
      },
      {
        name: 'Id',
        attr: 'a11y-id',
        swiperDefault: '',
        description:
          'Value of id attribute to be set on swiper-wrapper. If null will be generated automatically',
        value: '',
        tested: false,
      },
      {
        name: 'Item Role Description Message',
        attr: 'a11y-item-role-description-message',
        swiperDefault: '',
        description:
          'Message for screen readers describing the role of slide element',
        value: '',
        tested: false,
      },
      {
        name: 'Last Slide Message',
        attr: 'a11y-last-slide-message',
        swiperDefault: 'This is the last slide',
        description:
          'Message for screen readers for next button when swiper is on last slide',
        value: '',
        tested: false,
      },
      {
        name: 'Next Message',
        attr: 'a11y-next-message',
        swiperDefault: 'Next Slide',
        value: '',
        description: 'Message for screen readers for next button',
        tested: false,
      },
      {
        name: 'Notification Class',
        attr: 'a11y-notification-class',
        swiperDefault: 'swiper-notification',
        description: 'CSS class name of A11y notification',
        value: '',
        tested: false,
      },
      {
        name: 'Pagination Bullet Message',
        attr: '',
        swiperDefault: 'Go to slide {{index}}',
        description: 'Message for screen readers for single pagination bullet',
        value: '',
        tested: false,
      },
      {
        name: 'Prev Slide Message',
        attr: 'a11y-prev-slide-message',
        swiperDefault: 'Previous Slide',
        description: 'Message for screen readers for previous button',
        value: '',
        tested: false,
      },
      {
        name: 'Scroll on Focus',
        attr: 'a11y-scroll-on-focus',
        swiperDefault: 'true',
        description: 'Enables scrolling to the slide that has been focused',
        value: '',
        type: 'boolean',
        tested: false,
      },
      {
        name: 'Slide Label Message',
        attr: 'a11y-slide-label-message',
        swiperDefault: '{{index}} / {{slidesLength}}',
        description:
          'Message for screen readers describing the label of slide element',
        value: '',
        tested: false,
      },
      {
        name: 'Slide Role',
        attr: 'a11y-slide-role',
        swiperDefault: 'group',
        description: 'Value of swiper slide role attribute',
        value: '',
        tested: false,
      },
    ],
  };
  return config;
}
