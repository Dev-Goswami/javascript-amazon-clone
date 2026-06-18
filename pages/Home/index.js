import { products, loadProductFatch } from "../../data/products.js";
import { fixmoneyDesimal } from "../../utils/money.js";
import { addToCart, cart, totalCartItem } from "../../data/cart.js";
import "../../utils/bootstrap.js";
//show currrent cart's item quantity

// loadProducts(renderProduct);
loadProductFatch().then(() => {
  renderProduct();
});
function renderProduct() {
  document.querySelector(".total-items-in-cart").innerText = totalCartItem();

  let productHtml = "";
  products.forEach((product) => {
    productHtml += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${fixmoneyDesimal(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-select-product-quntity">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>
          
          <button class="add-to-cart-button button-primary js-add-to-card" data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>`;
  });

  // here we generate html for product
  document.querySelector(".js-products-grid").innerHTML = productHtml;

  document
    .querySelector(".js-products-grid")
    .addEventListener("click", homePageClickEvent);
}

function homePageClickEvent(event) {
  //if i click on add to cart button then this capture
  const addToCartBtn = event.target.closest(".js-add-to-card");

  if (addToCartBtn) {
    const productId = addToCartBtn.dataset.productId;
    let selectedValue = 1;
    const productContainer = addToCartBtn.closest(".product-container");
    const selectedQuntity = productContainer.querySelector(
      ".js-select-product-quntity",
    );
    if (selectedQuntity) selectedValue = Number(selectedQuntity.value);
    addToCart(productId, selectedValue); //add prodcut into cart  with quantity localy
    document.querySelector(".total-items-in-cart").innerText = totalCartItem();
  }
}
