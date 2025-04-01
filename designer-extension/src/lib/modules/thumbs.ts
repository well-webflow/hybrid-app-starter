import { faFileImage } from '@fortawesome/free-solid-svg-icons';
import { WaterfallCategory } from '../../types/waterfall-types';

export default function thumbsCategory() {
  let config: WaterfallCategory = {
    name: 'Thumbs',
    id: 'thumbs',
    icon: faFileImage,
    summary: 'Add thumbnails that are linked to another Waterfall',
    description: 'Add thumbnails to the waterfall',
    items: [
      {
        name: 'Thumbs',
        attr: 'waterfall-thumbs',
        swiperDefault: 'false',
        description:
          'If true, this slider will act as Thumbnails for another slider',
        type: 'boolean',
        value: 'false',
        tested: false,
      },
      {
        name: 'Enabled',
        attr: 'waterfall-preload',
        swiperDefault: 'false',
        description: 'Set to true to enable the thumbnails',
        type: 'boolean',
        value: 'false',
        tested: false,
      },
      {
        name: 'Swiper',
        attr: 'thumbs-name',
        swiperDefault: '',
        type: 'waterfall',
        description:
          'The name of the Waterfall these thumbs are associated with',
        value: '',
        tested: true,
      },
      {
        name: 'Auto Scroll Offset',
        attr: 'auto-scroll-offset',
        swiperDefault: '0',
        description:
          'Allows to set on which thumbs active slide from edge it should automatically move scroll thumbs. For example, if set to 1 and last visible thumb will be activated (1 from edge) it will auto scroll thumbs',
        value: '',
        tested: false,
      },
      {
        name: 'Multiple Active Thumbs',
        attr: 'multiple-active-thumbs',
        swiperDefault: 'true',
        description: 'When enabled multiple thumbnail slides may get activated',
        value: '',
        tested: false,
      },
      {
        name: 'Slide Thumb Active Class',
        attr: 'slide-thumb-active-class',
        swiperDefault: 'swiper-slide-thumb-active',
        description:
          'Additional class that will be added to activated thumbs swiper slide',
        value: '',
        tested: false,
      },
      {
        name: 'Thumbs Container Class',
        attr: 'thumbs-container-class',
        swiperDefault: 'swiper-thumbs',
        description: 'Additional class that will be added to thumbs swiper',
        value: '',
        tested: false,
      },
    ],
  };
  return config;
}
