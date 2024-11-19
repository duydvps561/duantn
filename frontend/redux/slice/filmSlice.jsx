import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo giá trị mặc định
const initialState = {
    cachieuID : '',
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
            localStorage.setItem('filmInfo', JSON.stringify(state));
        },
        updateNgayChieu: (state, action) => {
            state.ngaychieu = action.payload;
            localStorage.setItem('filmInfo', JSON.stringify(state)); 
        },
        updateGioChieu: (state, action) => {
            state.giochieu = action.payload;
            localStorage.setItem('filmInfo', JSON.stringify(state)); 
        },
        updatePhongChieu: (state, action) => {
            state.phongchieu = action.payload;
            localStorage.setItem('filmInfo', JSON.stringify(state)); 
        },
        updateCaChieuID: (state, action) => {
            state.cachieuID = action.payload;
            localStorage.setItem('filmInfo', JSON.stringify(state)); 
        },
        clearMovieInfo: (state) => {
            state.tenphim = '';
            state.ngaychieu = '';
            state.giochieu = '';
            state.phongchieu = '';
            localStorage.removeItem('filmInfo');
        },
    },
});

// Xuất khẩu các action từ movieSlice
export const { 
    updateTenPhim, 
    updateNgayChieu, 
    updateGioChieu, 
    updatePhongChieu,
    updateCaChieuID,
    clearMovieInfo,
} = movieSlice.actions;

// Xuất khẩu reducer
export default movieSlice.reducer;
