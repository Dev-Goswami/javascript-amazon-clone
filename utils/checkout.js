import { updateOrderSummary ,orderSummaryClickEvent} from "./checkout/orderSummary.js";



updateOrderSummary();
document
  .querySelector(".js-order-summary")
  .addEventListener("click",orderSummaryClickEvent);
  

  