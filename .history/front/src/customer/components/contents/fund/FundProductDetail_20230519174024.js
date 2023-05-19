import React, { useEffect, useState } from "react"; 
import '../../../resources/css/fund/fund-list.css' 
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { getAuthToken, getId } from "../../helpers/axios_helper"; 
import axios from "axios"; 
import FundAPIService from "./service/FundAPIService"; 
import FundBuyAccount from "./detail/FundBuyAccount"; 
import { Chart } from "react-google-charts"; 

export default function FundProductDetail() { 
    const navigate = useNavigate(); 
    const location = useLocation(); 
    const fundItems = location.state?.fundItems; // 기본값 설정 
    const [fundData, setFundData] = useState([]); 
    const [selectedAccount, setSelectedAccount] = useState(null); 
    const [selectedAmount, setSelectedAmount] = useState(null); 
    const [count, setCount] = useState(0); 
    const [ftotal, setFtotal] = useState(0); 

    // 금액 , 으로 반환 
    function loCale(number) { return Number(number).toLocaleString(); } 
    // 숫자 절대값으로 변환 
    function abs(number) { return Math.abs(number); }; 
    // 백만단위로 변환 
    function trunc(number) { return Math.floor(number / 1000000); } 
    // 십만단위로 변환 
    function truncTen(number) { return Math.floor(number / 100000); } 
    // 0빠져 반환된 소수점 숫자 0추가하여 반환 ex) .28 -> 0.28 
    function format(number) { 
        const parsedNumber = parseFloat(number); 
        return isNaN(parsedNumber) ? NaN : parsedNumber.toFixed(2); 
    } 

    useEffect(() => { 
        if (getAuthToken() !== null) { 
            axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`; 
        } else { 
            axios.defaults.headers.common['Authorization'] = ``; 
        } 
        FundAPIService.getFundDetail(fundItems.isinCd) 
            .then((response) => { 
                console.log('장고서버에서 데이터 받아오기 성공'); 
                const parsedData = JSON.parse(response.data); 
                setFundData(parsedData); 
            }) 
            .catch((err) => { 
                console.log('장고서버에서 데이터 받아오기 실패 ㅠ', err); 
            }); 
    }, []) 
    const handleSelectAccount = (account, amount) => { 
        setSelectedAccount(account); 
        setSelectedAmount(amount); 
    } 
    useEffect(() => { 
        const calculatedFtotal = count * fundItems.clpr; 
        setFtotal(calculatedFtotal); 
    }); 

    // 매수 
    const buyEtfFund = () => { 
        const buyItems = { 
            fnum: selectedAccount, 
            fpdName: fundItems.itmsNm, 
            fbuyPrice: fundItems.clpr, 
            fcount: count, 
            fnowPrice: fundItems.clpr, 
            fisinCd: fundItems.isinCd 
        } 
        if (selectedAmount < ftotal) { 
            alert("계좌잔액이 부족합니다.") 
            return false; 
        } 
        if (count <= 0) { 
            alert("상품은 1개 이상 구매 가능합니다.") 
            return false; 
        } 
        if (selectedAccount) { 
            console.log("선택된 계좌:", selectedAccount); 
            FundAPIService.fundProductBuy(buyItems) 
                .then(() => { 
                    alert('매수가 완료되었습니다.'); 
                    navigate('/customer/fund/having'); 
                }) 
                .catch(err => { 
                    console.log('fundProductBuy 에러', err) 
                }) 
        } else { 
            alert("계좌를 선택하세요."); 
        } 
    } 

    // 차트만들 데이터  
    const chartData = [ 
        ["기준일자", "종가", "최고가", "최저가"], 
        ...fundData.map((list) => [list.basDt, list.clpr, list.hipr, list.lopr]), 
    ].sort((a, b) => new Date(a[0]) - new Date(b[0])); 
 
    return ( 
        <div className="fundDiv"> 
            <div className="title_div"> 
                <p className="fund-title">펀드상품 상세페이지</p> 
            </div> 
            <div className="fundChart"> 
                <p className="item_code"> 
                    [{fundItems.isinCd}] 
                    <span className="fund_name">{fundItems.itmsNm}</span> 
                </p> 
                <Chart 
                    width={'90%'} 
                    height={'400px'} 
                    chartType="ComboChart" 
                    loader={<div>Loading Chart</div>} 
                    data={chartData} 
                    options={{ 
                        chartArea: { width: "80%", height: "80%" }, 
                        seriesType: "line", 
                        series: { 4: { type: "bars", targetAxisIndex: 1 }, }, 
                        vAxes: { 0: { title: "가격" }, 1: { title: "거래량", format: "short" }, }, 
                        hAxis: { title: "기준일자", }, colors: ["#109e50", "#f95818", "#1890f9"], 
                    }} 
                /> 
                <p className="lineChart"> </p> 
                <div className="buysell"> 
                    <table className="fundBuy"> 
                        <thead>
                            <tr> 
                                <td colSpan={2}>출금계좌</td> 
                                <td colSpan={2}> 
                                    <FundBuyAccount onSelectAccount={handleSelectAccount} /> 
                                </td> 
                            </tr> 
                            <tr> 
                                <td colSpan={2}>구매수량</td> 
                                <td colSpan={2}> 
                                    <input type="number" value={count} onChange={e => setCount(parseInt(e.target.value))} /> 
                                </td> 
                            </tr> 
                            <tr> 
                                <td colSpan={4}> 
                                    <button onClick={buyEtfFund}>매수</button> 
                                </td> 
                            </tr> 
                        </thead> 
                        <tbody>
                                <tr> 
                                    <th>현재가</th> 
                                    <td> 
                                        {loCale(fundItems.clpr)}원 
                                    </td> 
                                    <th>전일대비</th> 
                                    <td> 
                                        {Number(fundItems.vs) > 0 ? ( 
                                            <span className="plusPre">▲ {(fundItems.vs)} % </span> 
                                        ) : ( 
                                            <span className="minusPre">▼ {abs(fundItems.vs)} % </span> 
                                        )} 
                                    </td> 
                                </tr> 
                                <tr> 
                                    <th>등락률</th> 
                                    <td> 
                                        {Number(fundItems.fltRt) > 0 ? ( 
                                            <span className="plusPre">{format(fundItems.fltRt)}</span> 
                                        ) : ( 
                                            <span className="minusPre">{format(fundItems.fltRt)}</span> 
                                        )} 
                                    </td> 
                                    <th>거래량</th> 
                                    <td> 
                                        {loCale(fundItems.trqu)} 
                                    </td> 
                                </tr> 
                                <tr> 
                                    <th>거래대금</th> 
                                    <td> 
                                        {loCale(fundItems.trPrc)} 원 
                                    </td> 
                                    <th>순자산총액</th> 
                                    <td> 
                                        {loCale(fundItems.nPptTotAmt)} 원 
                                    </td> 
                                </tr> 
                        </tbody>
                    </table> 
                </div>
            </div> 
        </div> 
    ) 
} 
