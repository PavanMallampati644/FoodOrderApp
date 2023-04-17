import { createSlice, configureStore } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    clearCart(state) {
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.items = [];
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      state.totalQuantity = state.totalQuantity + newItem.quantity;
      state.totalPrice = state.totalPrice + newItem.price * newItem.quantity;

      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          name: newItem.name,
          quantity: newItem.quantity,
          description: newItem.description,
        });
      } else {
        existingItem.quantity = existingItem.quantity + newItem.quantity;
      }
    },
    removeItemfromCart(state, action) {
      const id = action.payload;
      state.totalQuantity--;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalPrice = state.totalPrice - existingItem.price;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }
    },
  },
});

const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});

export const cartActions = cartSlice.actions;
export default store;
