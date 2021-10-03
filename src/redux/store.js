import { configureStore } from '@reduxjs/toolkit';

import taskSlice from './reducers/task-slice';
import uiSlice from './reducers/ui-slice';
import projectSlice from './reducers/project-slice';

const store = configureStore({
    reducer : {task: taskSlice.reducer,
        ui: uiSlice.reducer,
        project: projectSlice.reducer,}
})

export default store;