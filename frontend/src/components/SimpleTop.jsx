import { useSelector, useDispatch } from "react-redux";
import {fetchGetData } from "../redux/api.js"
import {useEffect} from "react";

const wrapStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: '7px',
    width: '1300px',
    height: '100px',
}

const boxStyles = {
    backgroundColor: 'grey',
    border: '1px solid grey',
    width: '100%',
    height: '100%',
    borderRadius: '5px',
}

const textStyles = {
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
}

const formatMoney = (num) => {
  if (!num) return "로딩중...";
  if (num >= 100000000) { // 1억 이상
    const eok = Math.floor(num / 100000000);
    const man = Math.floor((num % 100000000) / 10000000);
    if (man === 0) {
      return `약 ${eok}억 원`;
    }
    return `약 ${eok}억 ${man}천만원`;
  } else if (num >= 10000) { // 1만 이상
    const man = Math.floor(num / 10000);
    return `약 ${man}만 원`;
  } else {
    return `약 ${num}원`;
  }
};

const formatCount = (num) => {
  if (!num) return "로딩중...";
  if (num >= 100000000) { // 1억 이상
    const eok = Math.floor(num / 100000000);
    const man = Math.floor((num % 100000000) / 10000000);
    if (man === 0) {
      return `약 ${eok}억 건`;
    }
    return `약 ${eok}억 ${man}천만 건`;
  } else if (num >= 10000) { // 1만 이상
    const man = Math.floor(num / 10000);
    return `약 ${man}만 건`;
  } else if (num >= 1000){
      const chun = Math.floor(num / 1000);
      const back = Math.floor((num%1000) / 100);
      return `약 ${chun}천 ${back}백 건`;
    }else {
    return `약 ${num}건`;
  }
};

const formatAccount = (num) => {
  if (!num) return "로딩중...";
  if (num >= 100000000) { // 1억 이상
    const eok = Math.floor(num / 100000000);
    const man = Math.floor((num % 100000000) / 10000000);
    if (man === 0) {
      return `약 ${eok}억 명`;
    }
    return `약 ${eok}억 ${man}천만 명`;
  } else if (num >= 10000) { // 1만 이상
    const man = Math.floor(num / 10000);
    return `약 ${man}만 명`;
  } else if (num >= 1000){
      const chun = Math.floor(num / 1000);
      const back = Math.floor((num%1000) / 100);
      return `약 ${chun}천 ${back}백 명`;
    }else {
    return `약 ${num}명`;
  }
};

const SimpleTop = () => {
    const { totalRevenue, totalProfit, transactionCount, customerCount } = useSelector(
        (state) =>{
            console.log(state)
            return state.dashboard
        }
    );

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(totalRevenue)
        dispatch(fetchGetData());
    },[dispatch]);

    return (
        <>
            <div style={wrapStyles}>
                <div style={boxStyles}>
                    <p style={textStyles}>총매출액</p>
                    <p>{totalRevenue ? formatMoney(totalRevenue) : "로딩중..."}</p>
                </div>
                <div style={boxStyles}>
                    <p style={textStyles}>매출이익</p>
                    <p>{totalProfit ? formatMoney(totalProfit) : "로딩중..."}</p>
                </div>
                <div style={boxStyles}>
                    <p style={textStyles}>거래건수</p>
                    <p>{transactionCount !== null ? formatCount(transactionCount) : "로딩중..."}</p>
                </div>
                <div style={boxStyles}>
                    <p style={textStyles}>고객수</p>
                    <p>{customerCount !== null ? formatAccount(customerCount) : "로딩중..."}</p>
                </div>
                <div style={boxStyles}>
                    <p style={textStyles}>목표매출 달성 현황</p>
                    <p></p>
                </div>
            </div>
        </>

    )
}


export default SimpleTop;