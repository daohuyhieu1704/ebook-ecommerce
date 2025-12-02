import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface BookData {
  id: string;
  title: string;
  price: number;
  image?: string;
  pdf_url?: string;
  description?: string;
  author_ID?: string;
  category_ID?: string;
  Author?: { name: string; [key: string]: any };
  Category?: { name: string; [key: string]: any };
  [key: string]: any;
}

export interface CartItem {
  id: string;
  session_ID: string;
  book_ID: string;
  checked: boolean;
  created_at: string;
  book: BookData;
  key?: string;
  STT?: number;
}

export interface CartSession {
  id: string;
  user_ID: string;
  total: number;
}

export interface CartState {
  items: CartItem[];
  session: CartSession | null;
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  session: null,
  totalQuantity: 0,
  totalAmount: 0,
};

const calculateTotals = (items: CartItem[]) => {
  let totalAmount = 0;
  items.forEach((item) => {
    if (item.checked) {
      totalAmount += item.book?.price || 0;
    }
  });
  return {
    totalQuantity: items.length,
    totalAmount,
  };
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartData: (
      state,
      action: PayloadAction<{ session: CartSession; items: CartItem[] }>
    ) => {
      const { session, items } = action.payload;

      const safeItems = Array.isArray(items) ? items : [];

      const totals = calculateTotals(safeItems);

      const finalTotalAmount =
        session && typeof session.total === "number"
          ? session.total
          : totals.totalAmount;

      return {
        ...state,
        session: session,
        items: safeItems,
        totalQuantity: safeItems.length,
        totalAmount: finalTotalAmount,
      };
    },
    addToCart: (state, action: PayloadAction<BookData>) => {
      const newBook = action.payload;

      const isPdf = newBook.pdf_url && newBook.pdf_url.trim() !== "";

      if (isPdf) {
        const exists = state.items.find((item) => item.book_ID === newBook.id);
        if (exists) {
          return;
        }
      }

      const newItem: CartItem = {
        id: `temp-${Date.now()}`,
        session_ID: state.session?.id || "",
        book_ID: newBook.id,
        checked: true,
        created_at: new Date().toISOString(),
        book: newBook,
      };

      state.items.push(newItem);

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const cartItemId = action.payload;
      state.items = state.items.filter((item) => item.id !== cartItemId);

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalAmount = totals.totalAmount;
    },

    clearCart: (state) => {
      state.items = [];
      state.session = null;
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { setCartData, addToCart, removeFromCart, clearCart } =
  CartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectSession = (state: RootState) => state.cart.session;
export const selectCartTotal = (state: RootState) => state.cart.totalAmount;
export const selectCartCount = (state: RootState) => state.cart.totalQuantity;
export const selectCartSessionId = (state: RootState) => state.cart.session?.id;

export default CartSlice.reducer;
