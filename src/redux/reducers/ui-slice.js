import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState:{
        bannerTitle: "Welcome to Deployment",
    },
    reducers:{
        changeTitle(state,action){
            state.bannerTitle = action.payload;
        },
    }
})

export const uiAction = uiSlice.actions;

export default uiSlice;