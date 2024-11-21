import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Tạo async thunk để gửi email
export const Sendemail = createAsyncThunk(
    'email/sendemail',
    async (emaildata, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3000/email/sendmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emaildata),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data; 
        } catch (error) {
            console.error('Lỗi khi gửi email:', error);
            return rejectWithValue(error.message); 
        }
    }
);

const emailSlice = createSlice({
    name: 'email',
    initialState: {
        list: [], 
        loading: false, 
        error: null,  
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(Sendemail.pending, (state) => {
                state.loading = true;  
                state.error = null;  
            })
            .addCase(Sendemail.fulfilled, (state, action) => {
                state.loading = false;  
                state.list = action.payload;  
            })
            .addCase(Sendemail.rejected, (state, action) => {
                state.loading = false;  
                state.error = action.payload;  
            });
    },
});

export default emailSlice.reducer;
