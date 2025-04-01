import { faFont } from '@fortawesome/free-solid-svg-icons';
import { WaterfallCategory } from '../../types/waterfall-types';

export default function classnamesCategory() {
  let config: WaterfallCategory = {
    name: 'Class Names (Advanced)',
    id: 'class-names',
    icon: faFont,
    summary:
      'Change the class names used by swiperjs. Not recommended to edit.',
    items: [
      {
        name: 'Container Modifier Class',
        attr: 'container-modifier-class',
        swiperDefault: 'swiper-',
        value: '',
        description:
          'The beginning of the modifier CSS class that can be added to swiper container depending on different parameters',
        tested: false,
      },
      {
        name: 'Events Prefix',
        attr: 'events-prefix',
        swiperDefault: 'swiper',
        value: '',
        description:
          'Event name prefix for all DOM events emitted by Swiper Element (web component)',
        tested: false,
      },
      {
        name: 'Slide Active Class',
        attr: 'slide-active-class',
        swiperDefault: 'swiper-slide-active',
        value: '',
        description:
          "CSS class name of currently active slide. By changing classes you will also need to change Swiper's CSS to reflect changed classes",
        tested: false,
      },
      {
        name: 'Slide Blank Class',
        attr: 'slide-blank-class',
        swiperDefault: 'swiper-slide-blank',
        value: '',
        description:
          'CSS class name of the blank slide added by the loop mode (when loopAddBlankSlides is enabled)',
        tested: false,
      },
      {
        name: 'Slide Class',
        attr: 'slide-class',
        swiperDefault: 'swiper-slide',
        value: '',
        description:
          "CSS class name of slide. By changing classes you will also need to change Swiper's CSS to reflect changed classes",
        tested: false,
      },
      {
        name: 'Slide Fully Visible',
        attr: 'slide-fully-visible',
        swiperDefault: 'swiper-slide-fully-visible',
        value: '',
        description:
          'CSS class name of fully (when whole slide is in the viewport) visible slide',
        tested: false,
      },
      {
        name: 'Slide Next Class',
        attr: 'slide-next-class',
        swiperDefault: 'swiper-slide-next',
        value: '',
        description:
          "CSS class name of slide which is right after currently active slide. By changing classes you will also need to change Swiper's CSS to reflect changed classes",
        tested: false,
      },
      {
        name: 'Slide Prev Class',
        attr: 'slide-prev-class',
        swiperDefault: 'swiper-slide-prev',
        value: '',
        description:
          "CSS class name of slide which is right before currently active slide. By changing classes you will also need to change Swiper's CSS to reflect changed classes.",
        tested: false,
      },
      {
        name: 'Slide Visible Class',
        attr: 'slide-visible-class',
        swiperDefault: 'swiper-slide-visible',
        value: '',
        description:
          "CSS class name of currently/partially visible slide. By changing classes you will also need to change Swiper's CSS to reflect changed classes.",
        tested: false,
      },
      {
        name: 'Wrapper Class',
        attr: 'wrapper-class',
        swiperDefault: 'swiper-wrapper',
        value: '',
        description:
          "CSS class name of slides' wrapper. By changing classes you will also need to change Swiper's CSS to reflect changed classes",
        tested: false,
      },
    ],
  };
  return config;
}
