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
            return rejectWithValue(error.message);
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
                state.error = null; 
            })
            .addCase(postHoadon.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload); 
            })
            .addCase(postHoadon.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { addHoadon } = hoadonSlice.actions;
export default hoadonSlice.reducer;
