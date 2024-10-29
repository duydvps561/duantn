// redux/slice/qrSlice.js
import { createSlice } from '@reduxjs/toolkit';

const qrSlice = createSlice({
    name: 'qr',
    initialState: {
        url: '',
    },
    reducers: {
        setQrUrl: (state, action) => {
            state.url = action.payload;
            localStorage.setItem('urlPayment', action.payload);
        },
    },
});

export const { setQrUrl } = qrSlice.actions;
export default qrSlice.reducer;
