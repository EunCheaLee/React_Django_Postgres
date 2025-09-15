import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

// Chart.js 등록
ChartJS.register(ArcElement, Tooltip, Legend);

// 더미 데이터 (채널별 매출액 계산 결과)
const salesByChannel = {
    1: 339200, // 예: 채널코드 1의 총 매출액 (Quantity × UnitPrice 합산)
    2: 181200,
    // 필요한 채널코드와 매출액 추가
};

// 차트에 맞게 데이터 변환
const data = {
    labels: Object.keys(salesByChannel).map(key => `채널 ${key}`),
    datasets: [
        {
            label: '채널별 매출액',
            data: Object.values(salesByChannel),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
            ],
            borderWidth: 1,
        },
    ],
};

// 차트 설정
const config = {
    type: 'doughnut',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '채널별 매출액 도넛 차트',
            },
        },
    },
};

const ByChannel = ({ style }) => {
    return (
        <div style={style}>
            <Doughnut data={data} options={config.options} />
        </div>
    );
};

export default ByChannel;
