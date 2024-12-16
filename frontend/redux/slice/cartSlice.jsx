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
                localStorage.setItem('cart', JSON.stringify(state.cart));
            }
        },
        addSeat: (state, action) => {
            const { _id, seat, gia } = action.payload;
        
            if (seat.length === 0) {
                // Xóa mục khỏi giỏ hàng
                state.cart = state.cart.filter(cartItem => cartItem._id !== _id);
            } else {
                // Kiểm tra mục đã tồn tại
                const existingItem = state.cart.find(cartItem => cartItem._id === _id);
                if (existingItem) {
                    existingItem.seat = seat;
                    existingItem.quantity = seat.length;
                    existingItem.gia = gia;
                } else {
                    // Thêm mới vào giỏ hàng
                    state.cart.push({ _id, seat, quantity: seat.length, gia });
                }
            }
        
            // Cập nhật localStorage nếu có thay đổi
            if (state.cart.length > 0) {
                localStorage.setItem('cart', JSON.stringify(state.cart));
            } else {
                localStorage.removeItem('cart'); // Xóa nếu giỏ hàng trống
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
export const { addFood, addSeat, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
