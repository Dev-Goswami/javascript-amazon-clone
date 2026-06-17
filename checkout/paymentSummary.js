import { cart, loadCart } from "../../data/cart.js";
import { getDliveryOptions } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { fixmoneyDesimal } from "../../utils/money.js";

export function UpdatePaymentSummry() {
  let total = 0;
  let totalPriceCents = 0;
  let totalDeliveryCostCents = 0;

  //total calculation from cart items
  cart.forEach((item) => {
    total += item.quantity;

    const product = getProduct(item.id);
    totalPriceCents += item.quantity * product.priceCents;

    const deliveryOption = getDliveryOptions(item.deliveryOptionId);

    totalDeliveryCostCents += deliveryOption.priceCents;
  });

  document.querySelectorAll(".total-items-in-cart").forEach((text) => {
    text.innerText = total;
  });

  let totalMoneyBeforeTax = totalPriceCents + totalDeliveryCostCents;
  let EstimatedTax = totalMoneyBeforeTax * 0.1;
  let totalMoneyAfterTax = totalMoneyBeforeTax + EstimatedTax;

  const paymentSummary = document.querySelector(".js-payment-summary");

  const updataTaxt = (paymentSummary, slector, value) => {
    const HTMltag = paymentSummary.querySelector(slector);
    if (HTMltag) {
      HTMltag.innerText = fixmoneyDesimal(value);
    } else {
      console.error(`not found ${slector} `);
    }
  };

  updataTaxt(paymentSummary, ".totalItemsPrice", totalPriceCents);
  updataTaxt(paymentSummary, ".totalShipingCost", totalDeliveryCostCents);
  updataTaxt(paymentSummary, ".totalMoneyBeforeTax", totalMoneyBeforeTax);
  updataTaxt(paymentSummary, ".EstimatedTax", EstimatedTax);
  updataTaxt(paymentSummary, ".totalMoneyAfterTax", totalMoneyAfterTax);

  //   after calculate then save it inot local
}
