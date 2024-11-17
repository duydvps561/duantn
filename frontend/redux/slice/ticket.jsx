import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const postTicket = createAsyncThunk(
    've/add',
    async (ticketdata, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3000/ve/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ticketdata),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error posting ticket:', error);
            return rejectWithValue(error.message);
        }
    }
);

const ticketSlice = createSlice({
    name: 've',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(postTicket.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(postTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default ticketSlice.reducer;
