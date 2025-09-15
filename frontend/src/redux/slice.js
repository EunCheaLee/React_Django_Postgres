import { createSlice } from "@reduxjs/toolkit";
import { fetchGetData } from "./api";

// 초기 상태: 각 데이터를 관리할 기본 상태를 설정합니다.
const initialState = {
    totalRevenue: null,
    totalProfit: null,
    transactionCount: null,
    customerCount: null,
    // 년도별 매출액 및 이익을 담을 객체
    saleProfitInfo: {
        id: "",  // 고유 id
        year: "",  // 연도
    },

    // 프로모션별 매출 비율을 담을 배열
    promotionInfo: [
        {
            id: "",  // 프로모션의 고유 id
            name: "",  // 프로모션 이름
            sales: "",  // 해당 프로모션의 매출액
        },
    ],

    // 채널별 매출을 담을 배열
    channelInfo: [
        {
            id: "",  // 채널의 고유 id
            sales: "",  // 해당 채널의 매출액
        },
    ],

    // 권역별 매출을 담을 배열 (수도권, 영남권 등)
    regionInfo: [
        {
            id: "",  // 권역의 고유 id
            name: "",  // 권역 이름 (예: 수도권, 영남권 등)
            sales: "",  // 해당 권역의 매출액
        },
    ],

    // 연도별 분류 매출을 담을 배열 (카테고리별 매출 합계)
    yearCategoryInfo: [
        {
            id: "",  // 카테고리별 고유 id
            sales: "",  // 해당 카테고리의 매출 합계
            year: "",  // 연도
        },
    ],

    // 로딩 상태: 데이터를 로딩 중인지 확인하는 변수
    loading: false,

    // 에러 상태: 데이터 요청 시 에러가 발생하면 그 에러 메시지를 저장
    error: null,
};

// Redux slice 정의
const dashBoardSlice = createSlice({
    name: "dashboard",  // slice의 이름
    initialState,  // 위에서 정의한 초기 상태
    reducers: {
        // 매출액 및 이익 정보를 업데이트하는 액션
        setSaleProfitInfo: (state, action) => {
            state.saleProfitInfo = action.payload;  // action의 payload를 상태에 저장
        },

        // 프로모션별 매출 비율 정보를 업데이트하는 액션
        setPromotionInfo: (state, action) => {
            state.promotionInfo = action.payload;  // action의 payload를 상태에 저장
        },

        // 채널별 매출 정보를 업데이트하는 액션
        setChannelInfo: (state, action) => {
            state.channelInfo = action.payload;  // action의 payload를 상태에 저장
        },

        // 권역별 매출 정보를 업데이트하는 액션
        setRegionInfo: (state, action) => {
            state.regionInfo = action.payload;  // action의 payload를 상태에 저장
        },

        // 연도별 분류 매출 정보를 업데이트하는 액션
        setYearCategoryInfo: (state, action) => {
            state.yearCategoryInfo = action.payload;  // action의 payload를 상태에 저장
        },

        // 로딩 상태를 업데이트하는 액션 (true/false로 상태 설정)
        setLoading: (state, action) => {
            state.loading = action.payload;  // 로딩 상태 업데이트
        },

        // 에러 상태를 업데이트하는 액션
        setError: (state, action) => {
            state.error = action.payload;  // 에러 메시지를 상태에 저장
        },
    },
    extraReducers: (builder) => {
        builder
            // 비동기 요청 시작 시 (pending)
            .addCase(fetchGetData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // 비동기 요청 성공 시 (fulfilled)
            .addCase(fetchGetData.fulfilled, (state, action) => {
                state.loading = false;
                state.totalRevenue = action.payload.totalRevenue;
                state.totalProfit = action.payload.totalProfit;
                state.transactionCount = action.payload.transactionCount;
                state.customerCount = action.payload.customerCount;
            })
            // 비동기 요청 실패 시 (rejected)
            .addCase(fetchGetData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
    // extraReducers: (builder) => {
    //     builder
    //         // 비동기 요청 시작 시 (pending)
    //         .addCase(fetchGetData.pending, (state) => {
    //             state.loading = true;  // 로딩 중 상태로 설정
    //             state.error = null;    // 에러 초기화
    //         })
    //
    //         // 비동기 요청 성공 시 (fulfilled)
    //         .addCase(fetchGetData.fulfilled, (state, action) => {
    //             state.loading = false;  // 로딩 완료
    //             // action의 payload에 담긴 데이터를 상태에 저장
    //             state.saleProfitInfo = action.payload.saleProfitInfo;
    //             state.promotionInfo = action.payload.promotionInfo;
    //             state.channelInfo = action.payload.channelInfo;
    //             state.regionInfo = action.payload.regionInfo;
    //             state.yearCategoryInfo = action.payload.yearCategoryInfo;
    //         })
    //
    //         // 비동기 요청 실패 시 (rejected)
    //         .addCase(fetchGetData.rejected, (state, action) => {
    //             state.loading = false;  // 로딩 완료
    //             state.error = action.payload;  // 에러 메시지를 상태에 저장
    //         });
    // },
});

// 액션 생성자 (dispatch할 때 사용)
export const {
    setSaleProfitInfo,  // 매출액 및 이익 정보 업데이트
    setPromotionInfo,    // 프로모션별 매출 비율 정보 업데이트
    setChannelInfo,      // 채널별 매출 정보 업데이트
    setRegionInfo,       // 권역별 매출 정보 업데이트
    setYearCategoryInfo, // 연도별 분류 매출 정보 업데이트
    setLoading,          // 로딩 상태 업데이트
    setError,            // 에러 상태 업데이트
} = dashBoardSlice.actions;

// 리듀서 내보내기
export default dashBoardSlice.reducer;
