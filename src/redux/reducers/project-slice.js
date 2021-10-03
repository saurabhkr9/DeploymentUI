import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
    name: 'project',
    initialState:{
        totalProjects: 0,
        projects:[]
    },
    reducers:{
        updateProject(state,action){
            state.totalProjects  = action.payload.totalProjects;
            state.projects = action.payload.projects
        },
        addProject(state, action){
            const newProject = action.payload;
            const existingProject = state.items.find(item => item.id === newProject.id);
            state.totalProjects++;
            if(!existingProject){
                state.projects.push({
                    id: newProject.id,
                    title:newProject.title,
                    startDate:newProject.startDate,
                    endDate:newProject.endDate,
                    owner:newProject.owner,
                })
            }
        },
        removeProject(state, action){
            const idToRemove = action.payload;
            const existingProject = state.projects.find(item => item.id === idToRemove);
            if(existingProject) {
                state.projects = state.projects.filter(item => item.id !== idToRemove);
                state.totalProjects--;
            }
        }
    }
})



export const projectAction = projectSlice.actions;

export default projectSlice;