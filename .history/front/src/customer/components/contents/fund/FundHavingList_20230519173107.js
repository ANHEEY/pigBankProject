import React, { useEffect, useState } from "react"; 
import '../../../resources/css/fund/fund-list.css' 
import FundAPIService from "./service/FundAPIService"; 
import { getAuthToken, getId } from "../../helpers/axios_helper"; 
import axios from "axios"; 
import FundHaving from "./detail/FundHaving"; 
import { useNavigate } from "react-router-dom"; 

export default function FundHavingList() { 
    const id = getId(); 
    const navigate = useNavigate(); 
    // 업데이트 된 data 
    const [update, setUpdate] = useState([]); 
    // 출력할 data 
    const [having, setHaving] = useState([]); 
    // 보유내역 목록 업데이트하기 위하여  자식컴포넌트에서 받아온 펀드 key 값을 저장 
    const [fundCd, setFundCd] = useState([]); 
    const fundCdProps = (fundCd) => { setFundCd(fundCd); } 
    // 업데이트 할 데이터  
    const data = { params: { "fundCd": fundCd }, } 
    const [isLoading, setIsLoading] = useState(true); 
    const [count, setCount] = useState(0); 

    useEffect(() => { 
        if (getAuthToken() !== null) { 
            axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`; 
        } else { 
            axios.defaults.headers.common['Authorization'] = ``; 
        } 
        console.log(data); 
        // 장고서버에서 데이터 가져오기  
        FundAPIService.getHavingDetail(data) 
            .then(res => { 
                console.log("펀드 데이터 가져오기 ", res.data); 
                setUpdate(res.data); 
                // 가져온 데이터 컨트롤러로 전송하여 db업데이트  
                const updateData = res.data.map(item => ({ 
                    id: id, 
                    isinCd: item.isinCd, 
                    clpr: item.clpr, 
                    basDt: item.basDt, 
                })); 
                console.log("업데이트 테이터:", updateData) 
                // 데이터가 정상적으로 설정된 경우에만 업데이트 실행 
                if (updateData.length > 0) { 
                    FundAPIService.updateHavingFund(updateData) 
                        .then(() => { 
                            console.log('데이터 업데이트 완료'); 
                            // 지연 실행을 위해 setTimeout 사용 
                            setTimeout(() => { 
                                FundAPIService.fundUpdateHavingList(id) 
                                    .then(res => { 
                                        console.log('업데이트리스트를 가져옵니다.'); 
                                        setHaving(res.data); 
                                        setIsLoading(false); 
                                    }) 
                                    .catch(err => { 
                                        console.log('업데이르 목록 가져오기 실패 ! ', err) 
                                    }) 
                            }, 300); 
                        }) 
                        .catch(err => { 
                            console.log('데이터 수정 실패', err); 
                        }); 
                } 
                setIsLoading(false); 
            }) 
            .catch(err => { 
                console.log('디장고에서 보유내역정보를 받지 못함.', err); 
                setIsLoading(true); 
            }); 
    }, [fundCd], [update], [having]); 

    // 매도 
    const sellEtfFund = (isinCd) => { 
        if (count === 0){
            alert("매도 수량을 입력하세요.")
            return false;
        }
        const sellItem = having.find(item => item.fisinCd === isinCd); 
        console.log("sellItem:", sellItem); 
        const sellItems = { 
            fnowPrice: sellItem.fnowPrice, 
            fhavingCnt: sellItem.fhavingCnt, 
            fnowTotal: sellItem.fnowTotal, 
            fisinCd: sellItem.fisinCd, 
            fpdName: sellItem.fpdName, 
            fcount: count, 
        } 
        console.log(sellItems) 
        FundAPIService.fundProductSell(sellItems) 
            .then(() => { 
                console.log('매도 성공'); 
                alert("매도를 완료했습니다."); 
                navigate('/customer/fund/info'); 
            }) 
            .catch(err => { 
                console.log('매도 실패', err); 
            }) 
    } 
    // 수익률 계산 함수 
    function calculateProfitRate(principal, nowTotal) { 
        const profit = nowTotal - principal; 
        const profitRate = (profit / principal) * 100; 
        return profitRate.toFixed(2); 
    } 

    // 총 평가금액 및 수익률 계산 
    const totalEvaluation = having.reduce((acc, item) => { 
        const nowTotal = item.fnowTotal; 
        const principal = item.fprincipal; 
        acc.total += nowTotal; 
        acc.profit += nowTotal - principal; 
        return acc; 
    }, { total: 0, profit: 0 });

    const averageProfitRate = (totalEvaluation.profit / totalEvaluation.total) * 100 || 0; 
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

    return ( 
        <div className="fundProduct-list fund-div"> 
            <div className="title_div"> 
                <p className="fund-title"> 
                    펀드 보유내역 조회 
                </p> 
            </div> 
            {isLoading ? ( 
                <FundHaving fundCdProps={fundCdProps} /> 
            ) : ( 
                <div> 
                    {update.length === 0 ? ( 
                        <></> 
                    ) : ( 
                        <table className="fund-listTbl"> 
                            <thead> 
                                <tr> 
                                    <th>거래종목명</th> 
                                    <th>보유수량</th> 
                                    <th>현재가</th> 
                                    <th>원금</th> 
                                    <th>수익률</th> 
                                    <th>평가금액</th> 
                                    <th>평가손익</th> 
                                    <th colSpan={2}>매도</th> 
                                </tr> 
                            </thead> 
                            <tbody> 
                                {having.length === 0 ? ( 
                                    <tr> 
                                        <td colSpan={9}>보유내역이 없습니다</td> 
                                    </tr> 
                                ) : 
                                    having.map((having) => ( 
                                        <tr key={having.fisinCd}> 
                                            <td className="fundNm"> 
                                                {having.fpdName} 
                                            </td> 
                                            <td> 
                                                <span className="priceSpan"> 
                                                    {having.fhavingCnt} 
                                                </span> 
                                            </td> 
                                            <td> 
                                                <span className="priceSpan"> 
                                                    ₩{loCale(having.fnowPrice)} 
                                                </span> 
                                            </td> 
                                            <td> 
                                                <span className="priceSpan"> 
                                                    ₩{loCale(having.fprincipal)} 
                                                </span> 
                                            </td> 
                                            <td> 
                                                {Number(having.fprofit) >= 0 ? ( 
                                                    <span className="plusPre"> {format(having.fprofit)} % </span> 
                                                ) : ( 
                                                    <span className="minusPre"> {format(having.fprofit)} % </span> 
                                                )} 
                                            </td> 
                                            <td> 
                                                <span className="priceSpan">₩ {loCale(having.fnowTotal)}</span> 
                                            </td> 
                                            <td> 
                                                {Number(having.fnowProfit) >= 0 ? ( 
                                                    <span className="plusPre"> ▲ ₩ {loCale(abs(having.fnowProfit))} </span> 
                                                ) : ( 
                                                    <span className="minusPre"> ▼ ₩ {loCale(abs(having.fnowProfit))}</span> 
                                                )} 
                                            </td> 
                                            <td> 
                                                <div id="sellCount"> 
                                                    <input type="number" value={count} onChange={(e) => setCount(parseInt(e.target.value))} 
                                                        max={having.fhavingCnt} className="inputNum" /> 
                                                </div> 
                                            </td> 
                                            <td> 
                                                <div id="sellCount"> 
                                                    <button onClick={() => sellEtfFund(having.fisinCd)} >매도</button> 
                                                </div> 
                                            </td> 
                                        </tr> 
                                    ))} 
                            </tbody> 
                            <tfoot> 
                                <tr> 
                                    <td colSpan={4}> 
                                        <div className="havingTotal"> 
                                            [ 총 평가금액 ]<br/> 
                                            {Number(totalEvaluation.total) >= 0 ? ( 
                                                <span className="plusPre"> 
                                                    {loCale(totalEvaluation.total)} 원 
                                                </span> 
                                            ) : ( 
                                                <span className="minusPre"> 
                                                    {loCale(totalEvaluation.total)} 원 
                                                </span> 
                                            )} 
                                        </div> 
                                    </td> 
                                    <td colSpan={4}> 
                                        <div className="havingTotal"> 
                                            [ 총 수익률 ]<br/> 
                                            {Number(averageProfitRate) >= 0 ? ( 
                                                <p className="plusPre"> 
                                                    {format(averageProfitRate)} % 
                                                </p> 
                                            ) : ( 
                                                <p className="minusPre"> 
                                                    {format(averageProfitRate)} % 
                                                </p> 
                                            )} 
                                        </div> 
                                    </td> 
                                </tr> 
                            </tfoot> 
                        </table> 
                    )} 
                </div> 
            )} 
        </div> 
    ) 
} 

 
 