import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement, // PointElement 추가
} from 'chart.js';

// Chart.js 등록
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement // PointElement 추가
);

// 더미 데이터: 2018~2022년도 매출액과 이익
const DATA_COUNT = 7;
const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

const labels = ['2018', '2019', '2020', '2021', '2022', '2023', '2024']; // 예시 연도

const data = {
    labels: labels,
    datasets: [
        {
            label: '매출액',
            data: Array.from({ length: DATA_COUNT }, () => Math.floor(Math.random() * 1000000)), // 매출액
            backgroundColor: 'rgba(66, 165, 245, 0.5)', // 막대그래프 색상
            borderColor: 'rgba(66, 165, 245, 1)', // 막대그래프 테두리 색상
            borderWidth: 1,
            order: 1, // 막대그래프는 order 1로 설정
            yAxisID: 'y',
        },
        {
            label: '이익',
            data: Array.from({ length: DATA_COUNT }, () => Math.floor(Math.random() * 200000)), // 이익
            borderColor: 'rgba(255, 87, 34, 1)', // 선 그래프 색상
            fill: false,
            type: 'line', // 선 그래프
            tension: 0.1, // 선 그래프 부드럽게
            order: 0, // 선 그래프는 order 0으로 설정, 막대그래프 위에 표시
            yAxisID: 'y1',
        }
    ],
};

const config = {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '2018-2022년도 매출액 및 이익',
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                stacked: false, // 스택을 사용하지 않음 (선 그래프가 겹치지 않도록)
                ticks: {
                    stepSize: 100000, // 매출액 단계 크기
                },
            },
            y1: {
                beginAtZero: true,
                position: 'right',
                stacked: false, // 스택을 사용하지 않음 (선 그래프가 겹치지 않도록)
                ticks: {
                    stepSize: 50000, // 이익 단계 크기
                },
            },
        },
    },
};

const ByYear_SaleProfit = ({ style }) => {
    const chartRef = useRef(null); // 차트 참조

    useEffect(() => {
        // 차트가 변경될 때마다 차트를 제거하고 새로 생성하도록 처리
        if (chartRef.current) {
            const chartInstance = chartRef.current.chartInstance;
            if (chartInstance) {
                chartInstance.destroy(); // 차트가 이미 그려져 있으면 destroy
            }
        }
    }, []);

    return (
        <div style={style}>
            <Bar ref={chartRef} data={data} options={config.options} />
        </div>
    );
};

export default ByYear_SaleProfit;
