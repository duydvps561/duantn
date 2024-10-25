import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFood = createAsyncThunk("cart/fetchFood", async () => {
    const res = await fetch('http://localhost:3000/food');
    const data = await res.json();
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return data;
});

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        cart: JSON.parse(localStorage.getItem('cart')) || [], // Đọc giỏ hàng từ localStorage
        isOpen: false,
        loading: false,
        error: null
    },
    reducers: {
        // Thêm món ăn vào giỏ hàng
        addFood: (state, action) => {
            const item = state.items.find(food => food._id === action.payload); // Sử dụng _id
            if (item) {
                const existingItem = state.cart.find(cartItem => cartItem._id === item._id && cartItem.type === 'food');
                if (existingItem) {
                    existingItem.quantity = (existingItem.quantity || 1) + 1; // Tăng số lượng
                } else {
                    state.cart.push({ ...item, quantity: 1, type: 'food' }); // Thêm món ăn
                }

                // Lưu giỏ hàng vào localStorage
                localStorage.setItem('cart', JSON.stringify(state.cart));
            }
        },
        addSeat: (state, action) => {
            const { _id, seat } = action.payload;
            const existingItem = state.cart.find(cartItem => cartItem._id === _id);

            if (!existingItem) {
                state.cart.push({ _id, seat, quantity: 1 });
            }

        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter(item => item._id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        clearCart: (state) => {
            state.cart = [];
            localStorage.removeItem('cart');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFood.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFood.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchFood.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Xuất action và reducer
export const { toggleCart, addFood, addSeat, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
