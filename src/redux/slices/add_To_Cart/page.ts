import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: string | number;
  title: string;
  price: number;
  image: string;
  category?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  userEmail: string | null;
  userCarts: Record<string, CartItem[]>;
  pendingCartItem: CartItem | null;
  buyNowItem: CartItem | null;
  shippingInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  } | null;
};

const initialState: CartState = {
  items: [],
  userEmail: null,
  userCarts: {},
  pendingCartItem: null,
  buyNowItem: null,
  shippingInfo: null,
};

const addToCartSlice = createSlice({
  name: "addToCart",
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string | null>) => {
      const newEmail = action.payload;
      const previousEmail = state.userEmail;

      if (newEmail) {
        if (
          previousEmail &&
          previousEmail !== newEmail &&
          state.items.length > 0
        ) {
          state.userCarts[previousEmail] = [...state.items];
        }

        state.userEmail = newEmail;

        const savedCart = state.userCarts[newEmail];
        if (savedCart && savedCart.length > 0) {
          state.items = [...savedCart];
        } else {
          state.items = [];
        }

        if (state.pendingCartItem) {
          const existingItem = state.items.find(
            (item) => item.id === state.pendingCartItem!.id,
          );
          if (existingItem) {
            existingItem.quantity += state.pendingCartItem.quantity;
          } else {
            state.items.push({ ...state.pendingCartItem });
          }

          state.userCarts[newEmail] = [...state.items];
          state.pendingCartItem = null;
        } else if (state.items.length > 0) {
          state.userCarts[newEmail] = [...state.items];
        }
      } else {
        if (previousEmail && state.items.length > 0) {
          state.userCarts[previousEmail] = [...state.items];
        }

        state.items = [];
        state.userEmail = null;
      }
    },

    setPendingCartItem: (state, action: PayloadAction<CartItem | null>) => {
      state.pendingCartItem = action.payload;
    },

    setBuyNowItem: (state, action: PayloadAction<CartItem | null>) => {
      state.buyNowItem = action.payload;
    },

    setShippingInfo: (
      state,
      action: PayloadAction<CartState["shippingInfo"]>,
    ) => {
      state.shippingInfo = action.payload;
    },

    addCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload });
      }

      if (state.userEmail) {
        state.userCarts[state.userEmail] = [...state.items];
      }
    },

    removeFromCart: (state, action: PayloadAction<{ id: string | number }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);

      if (state.userEmail) {
        state.userCarts[state.userEmail] = [...state.items];
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string | number; quantity: number }>,
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item && action.payload.quantity >= 1) {
        item.quantity = action.payload.quantity;
      }

      if (state.userEmail) {
        state.userCarts[state.userEmail] = [...state.items];
      }
    },

    clearCart: (state) => {
      if (state.userEmail) {
        state.items = [];
        state.userCarts[state.userEmail] = [];
      } else {
        state.items = [];
      }

      state.buyNowItem = null;
      state.shippingInfo = null;
    },
  },
});

export const {
  addCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setUserEmail,
  setPendingCartItem,
  setBuyNowItem,
  setShippingInfo,
} = addToCartSlice.actions;

export default addToCartSlice.reducer;
