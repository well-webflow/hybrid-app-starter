export const websiteBreakpoints = [
  'lmobile',
  'tablet',
  'desktop',
  'large',
  'xlarge',
] as const;

export type Breakpoints = (typeof websiteBreakpoints)[number];

export type BreakpointObject = {
  [key in Breakpoints]: string;
};

export type SettingType =
  | 'boolean'
  | 'string'
  | 'number'
  | 'select'
  | 'waterfall'
  | 'waterfall-multiple';

export interface WaterfallCategory {
  name: string;
  id: string;
  icon?: IconDefinition;
  description?: string;
  summary?: string;
  groups?: WaterfallGroup[];
  items?: WaterfallSetting[];
  actions?: Action[];
}

export interface WaterfallGroup {
  name: string;
  id: string;
  icon?: IconDefinition;
  description?: string;
  actions?: Action[];
  items: WaterfallSetting[];
}

export interface WaterfallSetting {
  name: string;
  attr: string;
  type?: SettingType;
  swiperDefault: string;
  description: string;
  value: string;
  options?: string[];
  breakpoints?: BreakpointObject;
  icon?: IconDefinition;
  tested: boolean;
}

export type Action = {
  label: string;
  attr: string;
};
