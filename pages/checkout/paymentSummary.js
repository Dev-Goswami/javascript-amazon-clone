import { cart, totalCartItem } from "../../data/cart.js";
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

  let totalMoneyBeforeTax = totalPriceCents + totalDeliveryCostCents;
  let EstimatedTax = totalMoneyBeforeTax * 0.1;
  let totalMoneyAfterTax = totalMoneyBeforeTax + EstimatedTax;

  const paymmentSummaryHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${total}):</div>
            <div class="payment-summary-money totalItemsPrice">$${fixmoneyDesimal(totalPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${fixmoneyDesimal(totalDeliveryCostCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${fixmoneyDesimal(totalMoneyBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money EstimatedTax">$${fixmoneyDesimal(EstimatedTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${fixmoneyDesimal(totalMoneyAfterTax)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order-button">
            Place your order
          </button>`;

  const paymentSummary = (document.querySelector(
    ".js-payment-summary",
  ).innerHTML = paymmentSummaryHTML);
  document.querySelector(".total-items-in-cart").innerText = total;

  document
    .querySelector(".js-place-order-button")
    .addEventListener("click", async () => {
      window.location.href = "orders.html";
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST", // Changed to uppercase "POST" for standard convention
          headers: {
            "Content-Type": "application/json",
          },
          // Changed "Cart" to "cart" to match the expected API parameter
          body: JSON.stringify({ cart: cart }),
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const order = await response.json();
      } catch (error) {
        console.error("Unexpected Error:", error);
      }
    });
  // document
  //   .querySelector(".js-place-order-button")
  //   .addEventListener("click", async () => {
  //     try {
  //       const response = await fetch("https://supersimplebackend.dev/orders", {
  //         method: "Post",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ Cart: cart }),
  //       });
  //       const order = await response.json();
  //     } catch {
  //       console.error(
  //         "Unaecsepted Error when sending https://supersimplebackend.dev/orders",
  //       );
  //     }
  //   });
}
