import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const postFoodOrder = createAsyncThunk(
    'food/postfoodOrder',
    async (foodorderData, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3000/foodorder/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(foodorderData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error posting foodorder:', error);
            return rejectWithValue(error.message);
        }
    }
);

const foodorderSlice = createSlice({
    name: 'foodorder',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {
        addfoodOrder: (state, action) => {
            state.list.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postFoodOrder.pending, (state) => {
                state.loading = true;
                state.error = null; 
            })
            .addCase(postFoodOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload); 
            })
            .addCase(postFoodOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { addfoodOrder } = foodorderSlice.actions;
export default foodorderSlice.reducer;
