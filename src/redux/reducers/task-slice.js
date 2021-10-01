import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'task',
    initialState:{
        totalTask: 0,
        tasks:[]
    },
    reducers:{
        updateTask(state,action){
            state.totalTask  = action.payload.totaltasks;
            state.tasks = action.payload.tasks
        },
        addTask(state, action){
            const newTask = action.payload;
            const existingTask = state.items.find(item => item.id === newTask.id);
            state.totalTask++;
            if(!existingTask){
                state.tasks.push({
                    id: newTask.id,
                    name:newTask.name,
                    startDate:newTask.startDate,
                    endDate:newTask.endDate,
                    description:newTask.description,
                    owner:newTask.owner,
                    status:newTask.status,
                })
            }
        },
        removeTask(state, action){
            const idToRemove = action.payload;
            const existingTask = state.tasks.find(item => item.id === idToRemove);
            if(existingTask) {
                state.tasks = state.tasks.filter(item => item.id !== idToRemove);
                state.totalTask--;
            }
        }
    }
})



export const taskAction = taskSlice.actions;

export default taskSlice;