import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Tạo async thunk để post hóa đơn
export const postHoadon = createAsyncThunk(
    'hoadon/postHoadon',
    async (hoadon, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3000/hoadon/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(hoadon),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error posting invoice:', error);
            return rejectWithValue(error.message); // Trả về lỗi nếu có
        }
    }
);

const hoadonSlice = createSlice({
    name: 'hoadon',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {
        addHoadon: (state, action) => {
            state.list.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postHoadon.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset lỗi khi bắt đầu request
            })
            .addCase(postHoadon.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload); // Thêm dữ liệu hóa đơn vào list
            })
            .addCase(postHoadon.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Gán lỗi vào state.error
            });
    },
});

export const { addHoadon } = hoadonSlice.actions;
export default hoadonSlice.reducer;
