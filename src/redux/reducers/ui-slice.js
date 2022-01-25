import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState:{
        bannerTitle: "Welcome to Deployment",
        isAuthenticated : false
    },
    reducers:{
        changeTitle(state,action){
            state.bannerTitle = action.payload;
        },
        setIsAuthenticated(state,action){
            state.isAuthenticated = action.payload;
        }
    }
})

export const uiAction = uiSlice.actions;

export default uiSlice;