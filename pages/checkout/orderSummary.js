import {cart,
  saveIntoLocal,
  updateDeliveryOption,
  updateCartQuantity,
  changeCartState,
  deleteCartQuantity,
  getCartItem} from '../../data/cart.js';

import { products,getProduct } from '../../data/products.js';
import { getDliveryOptions ,deliveryOptions } from '../../data/deliveryOptions.js';
import { fixmoneyDesimal} from '../../utils/money.js';
import { UpdatePaymentSummry } from './paymentSummary.js';
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export function updateOrderSummary() {
let carthtml = "";
  cart.forEach((item) => {
  // console.log(item);
  // console.log(cart);
  const product = getProduct(item.id);

  const delivery = getDliveryOptions(item.deliveryOptionId);
  
    const today = dayjs().add(delivery.deliveryDays, "days");
    const delivaryDate = today.format("dddd, MMMM D");

  carthtml += `<div class="cart-item-container">
                  <div class="delivery-date">
                    Delivery date: ${delivaryDate}
                  </div>

                  <div class="cart-item-details-grid">

                      <img
                        class="product-image"
                        src="${product.image}"
                      >

                    <div class="cart-item-details">

                      <div class="product-name">
                        ${product.name}
                      </div>

                      <div class="product-price">
                        ${fixmoneyDesimal(product.priceCents)}
                      </div>

                      <div class="product-quantity">
                        ${cartCurrentState(product.id)}

                        <span
                          class="delete-quantity-link link-primary"
                          data-product-id="${product.id}"
                        >
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

                </div>`;
                
  });

  document.querySelector(".js-order-summary").innerHTML = carthtml;
  UpdatePaymentSummry();

}

function cartCurrentState(itemId) {
  const cartItem = getCartItem(itemId);
  let html = "";
  if (!cartItem.isEditing) { 
    html = `<span>Quantity: 
                        <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                     
                 
                  
                   <span class="update-quantity-link link-primary" data-product-id="${cartItem.id}">
                    Update
                  </span>`;
  } else {
    html = `<div class="update-container">
              <div class="input-container">
                <div class="Quantity-text">Qty:</div>
                <input type="number" class="quantity-input"
                  value="${cartItem.quantity}">
              </div>
              <button class="save-btn" data-product-id="${cartItem.id}">
                Save
              </button>
            </div>`;
  }
  return html;
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


export function orderSummaryClickEvent(event){
 const changeDeliveryOption = event.target.closest(".js-delivery-option");

    const updateQuntity = event.target.closest(".update-quantity-link");

    const updateSaveBtn = event.target.closest(".save-btn");

    const deleteQuntity = event.target.closest(".delete-quantity-link");

    // DELIVERY OPTION
    if (changeDeliveryOption) {
      const { productId, deliveryOptionId } = changeDeliveryOption.dataset;

      updateDeliveryOption(productId, deliveryOptionId);

      updateOrderSummary();
      // UpdatePaymentSummry();
      return;
    }

    // UPDATE BUTTON
    if (updateQuntity) {
      const productId = updateQuntity.dataset.productId;

      changeCartState(productId);

      updateOrderSummary();
      // UpdatePaymentSummry();
      return;
    }

    // SAVE BUTTON
    if (updateSaveBtn) {
      const updateContainer = updateSaveBtn.closest(".update-container");

      const input = updateContainer.querySelector(".quantity-input");

      const productId = updateSaveBtn.dataset.productId;

      const inputValue = Number(input.value);

      

      // validation
      if (inputValue <= 0 || isNaN(inputValue)) {
        alert("Inter valid number Please");
        return;
      }
      if (inputValue > 18) {
        alert("Product is Outoff stock");
        return;
      }

      updateCartQuantity(productId, inputValue);

      changeCartState(productId);

      updateOrderSummary();
      // UpdatePaymentSummry();

      return;
    }
    if (deleteQuntity) {
      const productId = deleteQuntity.dataset.productId;
      deleteCartQuantity(productId);
      updateOrderSummary();
      // UpdatePaymentSummry();
      return;
    }
}

