import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slice';  // dashboardSlice 가져오기

// store 설정
const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,  // dashboard reducer 설정
    },
});

export default store;
