import { updateOrderSummary, orderSummaryClickEvent } from "./orderSummary.js";
import { loadProductFatch } from "../../data/products.js";
// import "./backendPrectic.js";
import "../../utils/bootstrap.js";

loadProductFatch().then(() => {
  updateOrderSummary();

  document
    .querySelector(".js-order-summary")
    .addEventListener("click", orderSummaryClickEvent);
});

// new Promise((resolve)=>{
//   loadProducts(()=>{
//     resolve();
//   });
// })
// .then(()=>{
//    updateOrderSummary();

//     document
//       .querySelector(".js-order-summary")
//       .addEventListener("click", orderSummaryClickEvent);
// });

// loadProducts(()=>{

//     updateOrderSummary();

//     document
//       .querySelector(".js-order-summary")
//       .addEventListener("click", orderSummaryClickEvent);
// });
