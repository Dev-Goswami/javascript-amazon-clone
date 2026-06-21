import { cart, loadCart, clearCart } from "./cart.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { getProduct } from "./products.js";
import { getDliveryOptions } from "./deliveryOptions.js";
import "../utils/bootstrap.js";
import { updateOrderSummary } from "../pages/checkout/orderSummary.js";
import { renderHeader } from "../utils/header.js";
// let orders = JSON.parse(localStorage.getItem("orders")) || [];

//order class
 export class Order {
  constructor({ id, orderTime, totalPriceCents, products }) {
    this.id = id;
    this.orderTime = orderTime;
    this.totalPriceCents = totalPriceCents;
    this.products = products;
  }
  // Serialize: instance → plain object
  toJSON() {
    return {
      id: this.id,
      orderTime: this.orderTime,
      totalPriceCents: this.totalPriceCents,
      products: this.products,
    };
  }

  // Deserialize: plain object → instance  ⭐
  static fromJSON(data) {
    return new Order(data);
  }

  getProduct(productId) {
    const rProduct = this.products.find(
      (product) => product.productId === productId,
    );
    if (rProduct) return rProduct;
    console.log("Product is not findout inside order");
  }
}

export let orders = JSON.parse(localStorage.getItem("orders") || "[]").map(
  Order.fromJSON,
);

function saveIntoLocal() {
  localStorage.setItem("orders", JSON.stringify(orders.map((o) => o.toJSON())));
}

function arrivingOn(deliveryOptionId) {
  const delivery = getDliveryOptions(deliveryOptionId);
  const arrivingDate = dayjs().add(delivery.deliveryDays, "days");

  return arrivingDate.format("dddd MMMM D");
}

export function creatOrder() {
  let products = cart.map((item) => {
    return {
      productId: item.id,
      quantity: item.quantity,
      arrivingdate: arrivingOn(item.deliveryOptionId),
    };
  });

  let totalPriceCents = 0;
  cart.forEach((item) => {
    let prodcut = getProduct(item.id);
    totalPriceCents += prodcut.priceCents * item.quantity;
  });

  const order = new Order({
    id: crypto.randomUUID(),
    orderTime: dayjs().format("D MMMM YYYY"),
    totalPriceCents,
    products,
  });

  orders.unshift(order);
  saveIntoLocal();

  clearCart();
  renderHeader();
  updateOrderSummary();
}

export function getOrder(orderId) {
  const ROrder = orders.find((order) => order.id === orderId);
  if (ROrder) {
    return ROrder;
  }
  console.error("Order Object is not findout ");
}



