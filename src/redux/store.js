import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './reducers/ui-slice';
import projectSlice from './reducers/project-slice';
import dropDownSlice from './reducers/dropDown-slice';

const store = configureStore({
    reducer : { ui: uiSlice.reducer,
                project: projectSlice.reducer,
                dropDown: dropDownSlice.reducer
            },
})

export default store;