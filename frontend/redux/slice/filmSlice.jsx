import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo giá trị mặc định
const initialState = {
    tenphim: '',
    ngaychieu: '',
    giochieu: '',
    phongchieu: '',
};

const movieSlice = createSlice({
    name: 'filmInfo',
    initialState,
    reducers: {
        updateTenPhim: (state, action) => {
            state.tenphim = action.payload;
            localStorage.setItem('filmInfo', JSON.stringify(state)); // Lưu vào localStorage
        },
        updateNgayChieu: (state, action) => {
            state.ngaychieu = action.payload;
            localStorage.setItem('filmInfo', JSON.stringify(state)); // Lưu vào localStorage
        },
        updateGioChieu: (state, action) => {
            state.giochieu = action.payload;
            localStorage.setItem('filmInfo', JSON.stringify(state)); // Lưu vào localStorage
        },
        updatePhongChieu: (state, action) => {
            state.phongchieu = action.payload;
            localStorage.setItem('filmInfo', JSON.stringify(state)); // Lưu vào localStorage
        },
        clearMovieInfo: (state) => {
            state.tenphim = '';
            state.ngaychieu = '';
            state.giochieu = '';
            state.phongchieu = '';
            localStorage.removeItem('filmInfo'); // Xóa thông tin trong localStorage
        },
    },
});

// Xuất khẩu các action từ movieSlice
export const { 
    updateTenPhim, 
    updateNgayChieu, 
    updateGioChieu, 
    updatePhongChieu, 
    clearMovieInfo,
} = movieSlice.actions;

// Xuất khẩu reducer
export default movieSlice.reducer;
