import { configureStore } from '@reduxjs/toolkit';

import taskSlice from './reducers/task-slice';

const store = configureStore({
    reducer : {task: taskSlice.reducer}
})

export default store;