import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';

// Chart.js 등록
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title
);

// 프로모션별 더미 매출액 데이터
const promotionData = {
    labels: ['할인없음', '상시할인', '쿠폰할인', '멤버십 할인'], // 프로모션 이름
    datasets: [
        {
            label: '매출 비율',
            data: [50, 25, 15, 10], // 각 프로모션에 대한 매출 비율 (더미 데이터)
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)', // 빨간색
                'rgba(255, 159, 64, 0.6)', // 주황색
                'rgba(75, 192, 192, 0.6)', // 초록색
                'rgba(153, 102, 255, 0.6)', // 보라색
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

// 차트 옵션
const config = {
    type: 'pie',
    data: promotionData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '프로모션별 매출 비율',
            },
        },
    },
};

// 컴포넌트
const ByPromotion = ({ style }) => {
    return (
        <div style={style}>
            <Pie data={promotionData} options={config.options} />
        </div>
    );
};

export default ByPromotion;
