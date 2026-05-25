export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function saveIntoLocal() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function addToCart(productId, selectedValue) {
  const cartItem = cart.find((CP) => CP.id === productId);

  if (cartItem) cartItem.quantity += selectedValue;
  else {
    cart.push({
      id: productId,
      quantity: selectedValue,
      deliveryOptionId: "1"
    });
  }
  saveIntoLocal();
  // console.log(cart);
}
