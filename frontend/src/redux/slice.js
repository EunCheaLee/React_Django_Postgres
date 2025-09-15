import { createSlice } from "@reduxjs/toolkit";
import { fetchGetData } from "./api";

// 초기 상태: 각 데이터를 관리할 기본 상태를 설정합니다.
const initialState = {
    totalRevenue: null,
    totalProfit: null,
    transactionCount: null,
    customerCount: null,
    loading: false,
    error: null,
};

// Redux slice 정의
const dashBoardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;  // 로딩 상태 업데이트
        },
        setError: (state, action) => {
            state.error = action.payload;  // 에러 상태 업데이트
        },
    },
    extraReducers: (builder) => {
        builder
            // 비동기 요청 시작 시 (pending)
            .addCase(fetchGetData.pending, (state) => {
                state.loading = true;  // 로딩 중 상태로 설정
                state.error = null;    // 에러 초기화
            })
            // 비동기 요청 성공 시 (fulfilled)
            .addCase(fetchGetData.fulfilled, (state, action) => {
                state.loading = false; // 로딩 완료

                // action.payload에서 받아온 데이터를 state에 저장
                const { totalRevenue, totalProfit, transactionCount, customerCount } = action.payload;

                state.totalRevenue = totalRevenue;
                state.totalProfit = totalProfit;
                state.transactionCount = transactionCount;
                state.customerCount = customerCount;
            })
            // 비동기 요청 실패 시 (rejected)
            .addCase(fetchGetData.rejected, (state, action) => {
                state.loading = false;  // 로딩 완료
                state.error = action.payload;  // 에러 메시지
            });
    },
});

export const { setLoading, setError } = dashBoardSlice.actions;

// 리듀서 내보내기
export default dashBoardSlice.reducer;