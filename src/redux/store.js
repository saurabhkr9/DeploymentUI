import { configureStore } from '@reduxjs/toolkit';

import taskSlice from './reducers/task-slice';
import uiSlice from './reducers/ui-slice';

const store = configureStore({
    reducer : {task: taskSlice.reducer,
        ui: uiSlice.reducer,}
})

export default store;