import { fixmoneyDesimal } from "./money.js";
import { cart, saveIntoLocal, updateDeliveryOption } from "../data/cart.js";
import { products, getProduct } from "../data/products.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export function UpdatePaymentSummry() {
  let total = 0;

  let totalPriceCents = 0;

  let totalDeliveryCostCents = 0;
  cart.forEach((item) => {
    total += item.quantity;

    const product = products.find((P) => P.id === item.id);

    if (product) {
      totalPriceCents += item.quantity * product.priceCents;
    }
    const deliveryOptionId = item.deliveryOptionId;
    const deliveryOption = deliveryOptions.find(
      (option) => option.id === deliveryOptionId,
    );
    totalDeliveryCostCents += deliveryOption.priceCents;
  });

  document.querySelectorAll(".total-items-in-cart").forEach((text) => {
    text.innerText = total;
  });

  let totalMoneyBeforeTax = totalPriceCents + totalDeliveryCostCents;
  let EstimatedTax = totalMoneyBeforeTax * 0.1;
  let totalMoneyAfterTax = totalMoneyBeforeTax + EstimatedTax;

  const updataTaxt = (slector, value) => {
    const HTMltag = document.querySelector(slector);
    if (HTMltag) {
      HTMltag.innerText = fixmoneyDesimal(value);
    } else {
      console.error(`not found ${slector} `);
    }
  };

  updataTaxt(".totalItemsPrice", totalPriceCents);
  updataTaxt(".totalShipingCost", totalDeliveryCostCents);
  updataTaxt(".totalMoneyBeforeTax", totalMoneyBeforeTax);
  updataTaxt(".EstimatedTax", EstimatedTax);
  updataTaxt(".totalMoneyAfterTax", totalMoneyAfterTax);

  //   after calculate then save it inot local
}
function updateOrderSummary() {
  let carthtml = "";
  cart.forEach((item) => {
    const prodcut = getProduct(item.id);

    const delivery = deliveryOptions.find(
      (o) => o.id === item.deliveryOptionId,
    );
    const today = dayjs().add(delivery.deliveryDays, "days");
    const delivaryDate = today.format("dddd, MMMM D");

    carthtml += `<div class="cart-item-container">
            <div class="delivery-date">
              Delivery date:  ${delivaryDate}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${prodcut.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${prodcut.name}
                </div>
                <div class="product-price">
                  ${fixmoneyDesimal(prodcut.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                ${deliveryOption(item)}
              </div>
            </div>
          </div>
        </div>`;
  });

  
   document.querySelector(".js-order-summary").innerHTML = carthtml;
 
}

function deliveryOption(cartItem) {
  let options = "";
  deliveryOptions.forEach((option) => {
    const today = dayjs().add(option.deliveryDays, "days");
    const delivaryDate = today.format("dddd, MMMM D");
    const deliveryCost =
      option.priceCents === 0
        ? "FREE"
        : `$ ${fixmoneyDesimal(option.priceCents)}`;
    const isChecked = cartItem.deliveryOptionId === option.id;

    options += `<div class="delivery-option js-delivery-option"
                    data-product-id="${cartItem.id}"
                    data-delivery-option-id="${option.id}">
                  <input type="radio" class="delivery-option-input"
                  ${isChecked ? "checked" : ""}
                    name="delivery-option-${cartItem.id}"
                    >
                  <div>
                    <div class="delivery-option-date">
                     "${delivaryDate}"
                    </div>
                    <div class="delivery-option-price">
                      ${deliveryCost} -Shopping
                    </div>
                  </div>
                </div>`;
  });
  return options;
}

updateOrderSummary();
document.querySelector(".js-order-summary").addEventListener("click", (event) => {
    const element = event.target.closest(".js-delivery-option");
    
    if (!element) return;
    const { productId, deliveryOptionId } = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
    updateOrderSummary();
  });