import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 기본 베이스 URL을 환경에 맞춰 설정
const BASE = "http://127.0.0.1:8000/app/"; // 실제 API 서버 URL로 수정

const api = axios.create({
    baseURL: BASE,
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
});

// 응답 처리: 데이터만 반환하고 에러는 메시지로 통일
api.interceptors.response.use(
    (res) => res.data, // 정상 응답 처리
    (err) => {
        const msg =
            err.response?.data?.message ||
            err.response?.data?.detail ||
            err.message ||
            "요청 처리 중 오류가 발생했습니다.";
        return Promise.reject(new Error(msg));
    }
);

// 데이터를 받아오는 비동기 액션 (GET)
export const fetchGetData = createAsyncThunk(
    "dashboard/fetchGetData", // 액션 이름
    async (_, thunkAPI) => {
        try {
            const { signal } = thunkAPI;

            // 여러 API 요청을 동시에 보내기 위해 Promise.all 사용
            const response = await Promise.all([
                api.get("total-revenue", { signal }), // 총매출액
                api.get("total-profit", { signal }),  // 매출이익
                api.get("transaction-count", { signal }), // 거래건수
                api.get("customer-count", { signal }),   // 고객수
            ]);

            // 응답을 객체로 묶어 리턴 (각 API 요청의 .data를 사용)
            return {
                totalRevenue: response[0].total_revenue, // 총매출액
                totalProfit: response[1].total_profit,   // 매출이익
                transactionCount: response[2].transaction_count, // 거래건수
                customerCount: response[3].customer_count,  // 고객수
            };
        } catch (e) {
            // 에러 처리
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);