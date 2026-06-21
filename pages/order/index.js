import { orders } from "../../data/orders.js";
import { getProduct, loadProductFatch } from "../../data/products.js";
import { fixmoneyDesimal } from "../../utils/money.js";
import "../../utils/bootstrap.js";
import { renderHeader } from "../../utils/header.js";
document.querySelector('.js-amazon-header').innerHTML = renderHeader();
loadProductFatch().then(() => {
   
  renderOrder();
});

function renderOrder() {
  let ordersHtml = "";

  orders.forEach((order) => {
    ordersHtml += `
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${order.orderTime}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${fixmoneyDesimal(order.totalPriceCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
          ${orderProducts(order.products,order.id)}
          </div>
        </div>`;
  });
 
  document.querySelector(".js-orders-grid").innerHTML = ordersHtml;
}

function orderProducts(products,orderId) {
  let productsHtml = "";
  products.forEach((element) => {
    const product = getProduct(element.productId);

    productsHtml += `
                <div class="product-image-container">
                <img src=${product.image}>
                </div>

                <div class="product-details">
                <div class="product-name">
                ${product.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${element.arrivingdate}
                </div>
                <div class="product-quantity">
                    Quantity: ${element.quantity}
                </div>
                <button class="buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
                </div>

                <div class="product-actions">
                <a href="tracking.html?orderId=${orderId}&productId=${element.productId}">
                    <button class="track-package-button button-secondary">
                    Track package
                    </button>
                </a>
                </div>`;
  });
  return productsHtml;
}
