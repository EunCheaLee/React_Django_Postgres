import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Chart.js 등록
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// 지역별 매출 데이터 예시
const rawData = [
    { 지역: '서울', Quantity: 8, UnitPrice: 21500 },
    { 지역: '대구', Quantity: 4, UnitPrice: 35900 },
    { 지역: '창원', Quantity: 1, UnitPrice: 28000 },
    { 지역: '광주', Quantity: 8, UnitPrice: 21500 },
    { 지역: '부산', Quantity: 6, UnitPrice: 12900 },
    { 지역: '서울', Quantity: 1, UnitPrice: 12900 },
    { 지역: '대전', Quantity: 8, UnitPrice: 32000 },
    { 지역: '인천', Quantity: 4, UnitPrice: 12900 },
    { 지역: '수원', Quantity: 3, UnitPrice: 21500 },
    { 지역: '울산', Quantity: 2, UnitPrice: 21000 },
    { 지역: '대구', Quantity: 5, UnitPrice: 20000 },
    { 지역: '제주', Quantity: 7, UnitPrice: 25000 },
    { 지역: '고양', Quantity: 1, UnitPrice: 15000 },
    { 지역: '광명', Quantity: 2, UnitPrice: 12900 },
    { 지역: '동두천', Quantity: 3, UnitPrice: 15000 },
    { 지역: '청주', Quantity: 2, UnitPrice: 32000 },
    { 지역: '서울', Quantity: 2, UnitPrice: 32000 },
];

// 지역을 권역으로 묶는 로직
const regionGroup = {
    수도권: ['서울', '인천', '경기'],
    충청권: ['대전', '세종', '충청남도', '충청북도'],
    영남권: ['부산', '대구', '울산', '경상남도', '경상북도'],
    호남권: ['광주', '전라남도', '전라북도'],
    경상권: ['경상남도', '경상북도'], // 영남권에 포함된 지역도 이 그룹으로 묶음
    제주권: ['제주'],
};

// 지역별 매출 합산 후 권역별로 그룹화
const regionSales = rawData.reduce((acc, { 지역, Quantity, UnitPrice }) => {
    const sales = Quantity * UnitPrice;

    // 권역 결정
    let regionCategory = '';
    for (let region in regionGroup) {
        if (regionGroup[region].includes(지역)) {
            regionCategory = region;
            break;
        }
    }

    if (regionCategory) {
        if (acc[regionCategory]) {
            acc[regionCategory] += sales; // 매출 합산
        } else {
            acc[regionCategory] = sales; // 첫 매출 입력
        }
    }

    return acc;
}, {});

// 차트 데이터 준비
const labels = Object.keys(regionSales); // 권역
const salesData = Object.values(regionSales); // 각 권역의 매출 데이터

const data = {
    labels: labels,
    datasets: [
        {
            label: '매출액',
            data: salesData, // 권역별 매출 데이터
            backgroundColor: '#42A5F5', // 막대 색상
            borderColor: '#1E88E5',
            borderWidth: 1,
        },
    ],
};

// 차트 옵션
const config = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: '권역별 매출',
        },
    },
    scales: {
        y: {
            beginAtZero: true, // Y축 시작점 0으로 설정
            ticks: {
                stepSize: 100000, // 단계 크기 설정
                callback: function (value) {
                    // 천 단위 구분을 추가하는 콜백 함수
                    return value.toLocaleString(); // 매출액에 천 단위 구분
                },
            },
        },
    },
};

// 권역별 매출 컴포넌트
const ByRegion = ({ style }) => {
    return (
        <div style={style}>
            <Bar data={data} options={config} />
        </div>
    );
};

export default ByRegion;
