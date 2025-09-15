import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//
// // 기본 베이스 URL을 환경에 맞춰 설정
// const BASE = (import.meta?.env?.VITE_API_BASE ?? "/app/emp/").replace(/([^/])$/, "$1/");
//
// const api = axios.create({
//     baseURL: BASE,
//     timeout: 15000,
//     headers: { "Content-Type": "application/json" },
// });
//
// // 응답 처리: 데이터만 반환하고 에러는 메시지로 통일
// api.interceptors.response.use(
//     (res) => res.data,
//     (err) => {
//         const msg =
//             err.response?.data?.message ||
//             err.response?.data?.detail ||
//             err.message ||
//             "요청 처리 중 오류가 발생했습니다.";
//         return Promise.reject(new Error(msg));
//     }
// );
//
// // 각 엔드포인트 호출을 위한 유틸 함수
// const detailPath = (name) => `${encodeURIComponent(name)}/`;
//
// /* =========================
//  * Thunks - 비동기 데이터 요청
//  * ========================= */
//
// // 데이터를 받아오는 비동기 액션 (GET)
// export const fetchGetData = createAsyncThunk(
//     "dashboard/fetchGetData",  // 액션 이름
//     async (_, thunkAPI) => {
//         try {
//             // API 호출
//             const { signal } = thunkAPI;
//             const response = await api.get("/dashboard/data", { signal });  // 예시 URL: /dashboard/data
//             return response;  // 응답 데이터를 반환 (슬라이스에서 사용됨)
//         } catch (e) {
//             return thunkAPI.rejectWithValue(e.message);  // 에러 발생 시 메시지 반환
//         }
//     }
// );
// api.js에서 fetchGetData는 이미 설정되어 있기 때문에 그대로 사용
export const fetchGetData = createAsyncThunk(
    "dashboard/fetchGetData",
    async (_, thunkAPI) => {
        try {
            const { signal } = thunkAPI;
            const response = await Promise.all([
                api.get("/total-revenue", { signal }), // 총매출액
                api.get("/total-profit", { signal }),  // 매출이익
                api.get("/transaction-count", { signal }), // 거래건수
                api.get("/customer-count", { signal }),   // 고객수
            ]);

            return {
                totalRevenue: response[0].total_revenue,
                totalProfit: response[1].total_profit,
                transactionCount: response[2].transaction_count,
                customerCount: response[3].customer_count,
            };
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
