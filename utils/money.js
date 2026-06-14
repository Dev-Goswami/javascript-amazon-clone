export function fixmoneyDesimal(priceCenst) {
  return (Math.round(priceCenst) / 100).toFixed(2);
}
