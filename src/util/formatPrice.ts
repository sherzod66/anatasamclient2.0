export const formatPrice = (price: number) =>
  new Intl.NumberFormat().format(price ? price : 0);
