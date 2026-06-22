let _storage = null;
export let cart = [];
export function loadCart(storageEngin) {
  _storage = storageEngin;
  cart = JSON.parse(_storage.getItem("cart")) || [];

  
}


export function saveIntoLocal() {
  assertInitialized();
  _storage.setItem("cart", JSON.stringify(cart));
}
export function clearCart() {
  loadCart(localStorage);
  cart.length = 0;
  saveIntoLocal();

}

function assertInitialized() {
  if (!_storage) {
    throw new Error(
      "[Cart] Not initialized. Call loadCart(storage) before using cart.",
    );
  }
}
export function addToCart(productId, selectedValue = 1) {
  assertInitialized();
  let cartItem = getCartItem(productId);

  if (cartItem) cartItem.quantity += selectedValue;
  else {
    cart.unshift({
      id: productId,
      quantity: selectedValue,
      deliveryOptionId: "1",
      isEditing: false,
    });
  }

  saveIntoLocal();
}
export function updateDeliveryOption(productId, deliveryOptionId) {
  assertInitialized();
  let cartItem = cart.find((item) => item.id === productId);
  cartItem.deliveryOptionId = deliveryOptionId;
  saveIntoLocal();
}
export function updateCartQuantity(productId, updatedQuantity) {
  assertInitialized();
  let cartItem = cart.find((item) => item.id === productId);
  cartItem.quantity = updatedQuantity;
  console.log(`now change cart quantity value :${updatedQuantity}`);
  saveIntoLocal();
}
export function changeCartState(productId) {
  assertInitialized();
  let cartItem = cart.find((item) => item.id === productId);

  cartItem.isEditing = !cartItem.isEditing;
  saveIntoLocal();
}

export function deleteCartQuantity(productId) {
  assertInitialized();
  const filteredCart = cart.filter((item) => item.id !== productId);

  cart.length = 0;

  filteredCart.forEach((item) => {
    cart.push(item);
  });

  saveIntoLocal();
}
export function totalCartItem() {
  assertInitialized();
  let total = 0;
  cart.forEach((item) => {
    total += item.quantity;
  });
  return total < 99 ? total : "99+";
}
export function getCartItem(itemID) {
  assertInitialized();
  return cart.find((item) => item.id === itemID);
}
