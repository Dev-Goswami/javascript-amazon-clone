import {
  updateOrderSummary,
  orderSummaryClickEvent
} from "./checkout/orderSummary.js";

// import "./backendPrectic.js";
import './bootstrap.js';

updateOrderSummary();

document
  .querySelector(".js-order-summary")
  .addEventListener("click", orderSummaryClickEvent);
