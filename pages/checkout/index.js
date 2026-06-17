import {
  updateOrderSummary,
  orderSummaryClickEvent
} from "./orderSummary.js";

// import "./backendPrectic.js";
import '../../utils/bootstrap.js';

updateOrderSummary();

document
  .querySelector(".js-order-summary")
  .addEventListener("click", orderSummaryClickEvent);
