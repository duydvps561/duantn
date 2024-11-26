import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Tạo async thunk để post vé
export const postTicket = createAsyncThunk(
    'ticket/add',
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

// Tạo async thunk để get danh sách vé
export const getVe = createAsyncThunk(
    'ticket/getVe',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3000/ve');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching tickets:', error);
            return rejectWithValue(error.message);
        }
    }
);

const ticketSlice = createSlice({
    name: 'ticket',
    initialState: {
        velist: [],
        hoadonnguoidung: [],
        vetheoHoadon: [],
        loading: false,
        error: null,
    },
    reducers: {
        setHoadonnguoidung: (state, action) => {
            state.hoadonnguoidung = action.payload;
        },
        setVetheoHoadon: (state, action) => {
            state.vetheoHoadon = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postTicket.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.velist.push(action.payload);
            })
            .addCase(postTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getVe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getVe.fulfilled, (state, action) => {
                state.loading = false;
                state.velist = action.payload;
            })
            .addCase(getVe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setHoadonnguoidung, setVetheoHoadon } = ticketSlice.actions;

export default ticketSlice.reducer;
