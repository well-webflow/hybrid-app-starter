export async function throwErrorIfWaterfallNotSelected(el: AnyElement | null) {
  if (el?.customAttributes) {
    const isWaterfall = await el.getCustomAttribute('waterfall');
    if (!isWaterfall) {
      throw new Error('Cannot perform action. A Waterfall is not selected.');
    }
  }
}

export async function throwErrorIfSettingNotFound() {}
