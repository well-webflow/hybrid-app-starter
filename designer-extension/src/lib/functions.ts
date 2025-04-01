export async function convertToPaginationBulletActive() {
  const el = await webflow.getSelectedElement();
  if (el?.customAttributes) {
    el.setCustomAttribute('waterfall-el', 'pagination-bullet-active');
    webflow.notify({
      type: 'Success',
      message: 'Element successfully converted to Pagination Bullet (Active).',
    });
  }
}

export async function convertToScrollbar() {
  const el = await webflow.getSelectedElement();
  if (el?.customAttributes) {
    el.setCustomAttribute('waterfall-el', 'scrollbar');
    webflow.notify({
      type: 'Success',
      message: 'Element successfully converted to Scrollbar.',
    });
  }
}

export async function convertToWaterfallEl(
  attr: string,
  name: string
): Promise<void> {
  const el = await webflow.getSelectedElement();
  if (el?.customAttributes) {
    el.setCustomAttribute('waterfall-el', attr);
    webflow.notify({
      type: 'Success',
      message: `Element successfully converted to ${name}`,
    });
  }
}
