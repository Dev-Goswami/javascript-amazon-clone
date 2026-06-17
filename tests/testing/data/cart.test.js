import { loadCart, addToCart, cart } from "../../../data/cart.js";

function creatMock(){
  let data = {};
  return {
      getItem: (key) => data[key] || null,
      setItem: (key, value) => {
        data[key] = value;
      }
  }
}

let mockStorage ={};
describe("test suite for add_to_cart function ", () => {
  //it run every before every it statements
  
  beforeEach(() => {
   
     
    mockStorage = creatMock(); //reset mockstorage every time how it empty
     loadCart(mockStorage);
      cart.length = 0;
     spyOn(mockStorage, "setItem");
  });

  it("add new item into cart and also check defult quantity is work", () => {
    const productId = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    addToCart(productId);
    
    expect(cart.length).toBe(1);
    expect(cart[0].id).toBe(productId);
    expect(cart[0].quantity).toBe(1);
  });

  it("add existing item into cart", () => {
    const productId = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    cart.push({
      id: productId,
      quantity: 2,
      deliveryOptionId: "1",
      isEditing: false,
    });

    addToCart(productId);
    expect(cart.length).toBe(1);
    expect(cart[0]).toEqual({
      id: productId,
      quantity: 2 + 1,
      deliveryOptionId: "1",
      isEditing: false,
    });
  });

  it("slected manualy qunatity value into cart", () => {
    const productId = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    addToCart(productId, 8);
    
    expect(cart.length).toBe(1);
    expect(mockStorage.setItem).toHaveBeenCalled();
    expect(cart[0]).toEqual({
      id: productId,
      quantity: 8,
      deliveryOptionId: "1",
      isEditing: false,
    });
  });
  it("add multiple item ", () => {
    const productId = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    addToCart(productId, 8);
    addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d",1);
    addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e",1);
    expect(cart.length).toBe(3);
   
  });
});
