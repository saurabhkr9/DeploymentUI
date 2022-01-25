import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
    name: 'project',
    initialState:{
        itsmTools:[],
        Clients:[],
        NotificationChannels:[],
        ProjectModules:[],
        toolMaster:[],
        Users:[],
        Menus:[],
        Profiles:[],
        Roles:[],
    },
    reducers:{
        updateITSMTools(state,action){
            state.itsmTools = action.payload;
        },
        updateClients(state,action){
            state.Clients = action.payload;
        },
        updateNotificationChannel(state,action){
            state.NotificationChannels = action.payload;
        },
        updateProjectModules(state,action){
            state.ProjectModules = action.payload;
        },
        updateToolMaster(state,action){
            state.toolMaster = action.payload;
        },
        updateUsers(state,action){
            state.Users = action.payload;
        },
        updateMenus(state,action){
            state.Menus = action.payload;
        },
        updateProfiles(state,action){
            state.Profiles = action.payload;
        },
        updateRoles(state,action){
            state.Roles = action.payload;
        },



        addNewTool(state,action){
            state.itsmTools.push(action.payload);
        },
        addNewClient(state,action){
            state.Clients.push(action.payload);
        },
        addNewNotificationChannel(state,action){
            state.NotificationChannels.push(action.payload);
        },
        addNewProjectModule(state,action){
            state.ProjectModules.push(action.payload);
        },
        addNewToolMaster(state,action){
            state.toolMaster.push(action.payload);
        },
        addNewUser(state,action){
            state.Users.push(action.payload);
        },
        addNewMenu(state,action){
            state.Menus.push(action.payload);
        },
        addNewProfile(state,action){
            state.Profiles.push(action.payload);
        },
        addNewRole(state,action){
            state.Roles.push(action.payload);
        }
    }
})



export const projectAction = projectSlice.actions;

export default projectSlice;