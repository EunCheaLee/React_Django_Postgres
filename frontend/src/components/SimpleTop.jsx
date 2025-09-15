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
    // backgroundColor: 'grey',
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
                    <p>{totalRevenue ? totalRevenue : "로딩중..."}</p>
                </div>
                <div style={boxStyles}>
                    <p style={textStyles}>매출이익</p>
                    <p>{totalProfit ? totalProfit : "로딩중..."}</p>
                </div>
                <div style={boxStyles}>
                    <p style={textStyles}>거래건수</p>
                    <p>{transactionCount !== null ? transactionCount : "로딩중..."}</p>
                </div>
                <div style={boxStyles}>
                    <p style={textStyles}>고객수</p>
                    <p>{customerCount !== null ? customerCount : "로딩중..."}</p>
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