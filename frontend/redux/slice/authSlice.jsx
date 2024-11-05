import { createSlice } from '@reduxjs/toolkit';
// import Cookies from 'js-cookie';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authenticated: false,
        token: null,
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state.authenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
            localStorage.setItem('token', action.payload.token);
            // Cookies.set('token', action.payload.token, { expires: 1 });
        },
        logout: (state) => {
            state.authenticated = false;
            state.token = null;
            state.user = null;
            // Cookies.remove('token');
            localStorage.removeItem('token');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
