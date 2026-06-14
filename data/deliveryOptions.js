export const deliveryOptions = [
  { id: "1", deliveryDays: 7, priceCents: 0 },
  { id: "2", deliveryDays: 3, priceCents: 499 },
  { id: "3", deliveryDays: 1, priceCents: 999 },
];
export function getDliveryOptions(deliveryOptionID) {
  const delvery = deliveryOptions.find(
    (option) => option.id === deliveryOptionID,
  );
  if (delvery) return delvery;
  else console.error("getDliveryOptions is not return delivery ID");
}
