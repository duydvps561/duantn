import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thực hiện fetch dữ liệu món ăn từ API
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
        cart: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart')) || [] : [],
        isOpen: false,
        loading: false,
        error: null,
    },
    reducers: {
        // Thêm món ăn vào giỏ hàng
        addFood: (state, action) => {
            const item = state.items.find(food => food._id === action.payload);
            if (item) {
                const existingItem = state.cart.find(cartItem => cartItem._id === item._id && cartItem.loai === 'Đồ ăn');
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    state.cart.push({ ...item, quantity: 1, loai: 'Đồ ăn' });
                }
                // Lưu vào localStorage
                localStorage.setItem('cart', JSON.stringify(state.cart));
            }
        },
        // Thêm ghế vào cart
        addSeat: (state, action) => {
            const { _id, seat } = action.payload;

            // Nếu seat là mảng rỗng, nghĩa là bỏ chọn ghế, thì xóa khỏi cart
            if (seat.length === 0) {
                state.cart = state.cart.filter(cartItem => cartItem._id !== _id);
            } else {
                const existingItem = state.cart.find(cartItem => cartItem._id === _id);
                if (existingItem) {
                    existingItem.seat = seat;
                    existingItem.quantity = seat.length; // Cập nhật số lượng ghế
                } else {
                    state.cart.push({ _id, seat, quantity: seat.length, gia: 100000 }); // Thêm mới với số lượng ghế
                }
            }
            // Lưu vào localStorage
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter(item => item._id !== action.payload);
            // Lưu vào localStorage
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        clearCart: (state) => {
            state.cart = [];
            // Xóa thông tin trong localStorage
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
export const { addFood, addSeat, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
