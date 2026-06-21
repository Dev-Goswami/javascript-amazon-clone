import { getProduct, loadProductFatch } from "../../data/products.js";
import { getOrder, Order } from "../../data/orders.js";
import { renderHeader } from "../../utils/header.js";

document.querySelector(".js-amazon-header").innerHTML = renderHeader();
const monthsMap = new Map([
  ["January", 0],
  ["February", 1],
  ["March", 2],
  ["April", 3],
  ["May", 4],
  ["June", 5],
  ["July", 6],
  ["August", 7],
  ["September", 8],
  ["October", 9],
  ["November", 10],
  ["December", 11],
]);

loadProductFatch().then(() => {
  renderTrackingProdcut();
});
function calculateProgressTime(orderTime, deliverydate) {
  let [dayA, mouthA, year] = orderTime.split(" ");
  let [dyaW, mouthD, dayD] = deliverydate.split(" ");

  const orderTImeJS = new Date(year, monthsMap.get(mouthA), dayA);
  const arrivingTimeJs = new Date("2026", monthsMap.get(mouthD), dayD);
  const todayJs = new Date();
  const totalTimeJs = arrivingTimeJs - orderTImeJS;
  const elimateTimeJs = todayJs - orderTImeJS;

  const totalTimeDay = totalTimeJs / (1000 * 24 * 60 * 60);
  const elimateTimeDay = elimateTimeJs / (1000 * 24 * 60 * 60);

  return (elimateTimeDay / totalTimeDay) * 100;
}

function renderTrackingProdcut() {
  const url = new URL(window.location.href);

  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");

  const order = getOrder(orderId);
  const orderProduct = order.getProduct(productId);
  const product = getProduct(productId);

  const trackingProductHtml = `
        <div class="delivery-date">
          Arriving on ${orderProduct.arrivingdate}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">Quantity: ${orderProduct.quantity}</div>

        <img
          class="product-image"
          src="${product.image}"
        />

        <div class="progress-labels-container">
          <div class="progress-label">Preparing</div>
          <div class="progress-label current-status">Shipped</div>
          <div class="progress-label">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>`;

  document.querySelector(".js-order-tracking-product-detail").innerHTML =trackingProductHtml;
    
  document.querySelector(".progress-bar").style.width =
    `${calculateProgressTime(order.orderTime, orderProduct.arrivingdate)}%`;
}
