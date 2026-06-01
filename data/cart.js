export let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function saveIntoLocal() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function addToCart(productId, selectedValue) {
  let cartItem = cart.find((cartItem) => cartItem.id === productId);

  if (cartItem) cartItem.quantity += selectedValue;
  else {
    cart.push({
      id: productId,
      quantity: selectedValue,
      deliveryOptionId: "1",
      isEditing: false,
    });
  }
 
  
  saveIntoLocal();
  
}
export function updateDeliveryOption(productId, deliveryOptionId) {
  let cartItem = cart.find((item) => item.id === productId);
  cartItem.deliveryOptionId = deliveryOptionId;
  saveIntoLocal();
}
export function updateCartQuantity(productId, updatedQuantity) {
  let cartItem = cart.find((item) => item.id === productId);
  cartItem.quantity = updatedQuantity;
  console.log(`now change cart quantity value :${updatedQuantity}`);
  saveIntoLocal();
}
export function changeCartState(productId) {
  
  let cartItem = cart.find((item) => item.id === productId);

  cartItem.isEditing = !cartItem.isEditing;
  saveIntoLocal();
}

export function deleteCartQuantity(productId) {

  
  const filteredCart = cart.filter(
  item => item.id !== productId
);

cart.length = 0;

filteredCart.forEach(item => {
  cart.push(item);
});

saveIntoLocal();
  

}
