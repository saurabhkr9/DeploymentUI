import { createSlice } from '@reduxjs/toolkit';

const dropDownSlice = createSlice({
    name: 'dropdown',
    initialState:{
        roles: [],
        profiles:[],
    },
    reducers:{
        updateRoles(state,action){
            state.roles = action.payload;
        },
        updateProfiles(state,action){
            state.profiles = action.payload;
        },
    }
})

export const dropDownAction = dropDownSlice.actions;

export default dropDownSlice;