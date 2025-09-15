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

// 제품 데이터
const productData = [
    { productCode: 1, categoryCode: 1, price: 15000 },
    { productCode: 2, categoryCode: 1, price: 6500 },
    { productCode: 3, categoryCode: 1, price: 7800 },
    { productCode: 4, categoryCode: 2, price: 20000 },
    { productCode: 5, categoryCode: 3, price: 7200 },
    { productCode: 6, categoryCode: 4, price: 28000 },
    { productCode: 7, categoryCode: 2, price: 22000 },
    { productCode: 8, categoryCode: 1, price: 2000 },
    { productCode: 9, categoryCode: 3, price: 25000 },
    { productCode: 10, categoryCode: 1, price: 15000 },
    { productCode: 11, categoryCode: 1, price: 21500 },
    { productCode: 12, categoryCode: 2, price: 32000 },
    { productCode: 13, categoryCode: 3, price: 25000 },
    { productCode: 14, categoryCode: 4, price: 25000 },
    { productCode: 15, categoryCode: 5, price: 7800 },
    { productCode: 16, categoryCode: 6, price: 15000 },
    { productCode: 17, categoryCode: 7, price: 34000 },
    { productCode: 18, categoryCode: 8, price: 9000 },
    { productCode: 19, categoryCode: 1, price: 42000 },
    { productCode: 20, categoryCode: 1, price: 23000 },
    { productCode: 21, categoryCode: 2, price: 15000 },
    { productCode: 22, categoryCode: 3, price: 21000 },
    { productCode: 23, categoryCode: 4, price: 33000 },
    { productCode: 24, categoryCode: 5, price: 10000 },
    { productCode: 25, categoryCode: 6, price: 25000 },
    { productCode: 26, categoryCode: 7, price: 32000 },
    { productCode: 27, categoryCode: 8, price: 17000 },
];

// 주문 고객 데이터 (2018-2022년)
const orderData = [
    { productCode: 1, quantity: 10, year: 2018 },
    { productCode: 2, quantity: 5, year: 2019 },
    { productCode: 3, quantity: 15, year: 2020 },
    { productCode: 4, quantity: 3, year: 2021 },
    { productCode: 5, quantity: 8, year: 2022 },
    { productCode: 6, quantity: 7, year: 2018 },
    { productCode: 7, quantity: 4, year: 2020 },
    { productCode: 8, quantity: 20, year: 2021 },
    { productCode: 9, quantity: 2, year: 2022 },
    { productCode: 10, quantity: 6, year: 2019 },
    { productCode: 11, quantity: 4, year: 2018 },
    { productCode: 12, quantity: 5, year: 2020 },
    { productCode: 13, quantity: 3, year: 2021 },
    { productCode: 14, quantity: 8, year: 2022 },
    { productCode: 15, quantity: 6, year: 2018 },
    { productCode: 16, quantity: 7, year: 2019 },
    { productCode: 17, quantity: 10, year: 2020 },
    { productCode: 18, quantity: 5, year: 2021 },
    { productCode: 19, quantity: 4, year: 2022 },
    { productCode: 20, quantity: 9, year: 2018 },
    { productCode: 21, quantity: 5, year: 2020 },
    { productCode: 22, quantity: 10, year: 2021 },
    { productCode: 23, quantity: 4, year: 2022 },
    { productCode: 24, quantity: 6, year: 2019 },
    { productCode: 25, quantity: 7, year: 2020 },
    { productCode: 26, quantity: 3, year: 2021 },
    { productCode: 27, quantity: 4, year: 2022 },
];

// 제품 분류 이름
const categoryNames = {
    1: '휴대폰액세서리',
    2: '태블릿PC액세서리',
    3: '자동차용품',
    4: '카메라/캠코더용품',
    5: '안마용품',
    6: '계절가전',
    7: '노트북액세서리',
    8: 'PC액세서리',
};

// 매출 계산: 연도별, 분류별 매출
const salesByYearAndCategory = orderData.reduce((acc, { productCode, quantity, year }) => {
    const product = productData.find(item => item.productCode === productCode);
    const category = categoryNames[product.categoryCode];
    const revenue = product.price * quantity;

    if (!acc[year]) {
        acc[year] = {};
    }

    if (!acc[year][category]) {
        acc[year][category] = 0;
    }

    acc[year][category] += revenue;
    return acc;
}, {});

// 차트 데이터 준비
const years = [2018, 2019, 2020, 2021, 2022]; // 연도
const categories = Object.values(categoryNames); // 분류

const data = {
    labels: years,
    datasets: categories.map((category, index) => ({
        label: category,
        data: years.map(year => salesByYearAndCategory[year]?.[category] || 0),
        backgroundColor: `hsl(${(index * 360) / categories.length}, 70%, 60%)`, // 각 분류마다 고유한 색상
        stack: 'stack1', // Stacked Bar Chart를 위한 그룹
    })),
};

// 차트 옵션 (가로 바 차트로 변경)
const config = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                usePointStyle: true, // 원형으로 표시하도록 설정
                pointStyle: 'circle', // 원형 스타일 지정
            },
        },
        title: {
            display: true,
            text: '연도별 분류 매출 (가로형)',
        },
    },
    scales: {
        x: {
            beginAtZero: true,
            stacked: true, // X축을 Stacked
            title: {
                display: true,
                text: '매출액',
            },
        },
        y: {
            stacked: true, // Y축을 Stacked
            title: {
                display: true,
                text: '연도',
            },
        },
    },
    indexAxis: 'y', // X축과 Y축을 바꾸어 가로형 바 차트로 변경
};

const ByYear_categorySales = ({ style }) => {
    return (
        <div style={style}>
            <Bar data={data} options={config} />
        </div>
    );
};

export default ByYear_categorySales;
