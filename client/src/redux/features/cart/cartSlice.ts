import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number;
}

export interface CartState {
  cart: Product[];
}

const loadState = (): CartState => {
  const storedState = localStorage.getItem("cartState");
  return storedState ? JSON.parse(storedState) : { cart: [] };
};

const initialState: CartState = loadState();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = item.quantity ? item.quantity + 1 : 2;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cartState", JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem("cartState", JSON.stringify(state));
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        item.quantity = item.quantity ? item.quantity + 1 : 2;
        localStorage.setItem("cartState", JSON.stringify(state));
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        item.quantity = item.quantity ? item.quantity - 1 : 0;
        localStorage.setItem("cartState", JSON.stringify(state));
      }
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem("cartState", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
