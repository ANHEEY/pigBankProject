import React, { useEffect, useState } from "react";
import '../../../resources/css/fund/fund-list.css'
import FundAPIService from "./service/FundAPIService";
import { getAuthToken, getId } from "../../helpers/axios_helper";
import axios from "axios";

function FundHavingList() {
    const id = getId();
    const [having, setHaving] = useState([]);
    useEffect(() => {
        if (getAuthToken() !== null) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
        } else {
            axios.defaults.headers.common['Authorization'] = ``;
        }
        FundAPIService.fundHavingList(id)
            .then(res => {
                setHaving(res.data);
            })
            .catch(err => {
                console.log('fundHavingList 에러', err);
            })
    }, [id])
    return (
        <div className="fundProduct-list fund-div">
            <div className="fund-title">
                펀드 보유내역 조회
            </div>
            <div className="fund-contents">
                <table>
                    <thead>
                        <tr>
                            <th>거래종목명</th>
                            <th>보유수량</th>
                            <th>평가금액</th>
                            <th>원금</th>
                            <th>현재가</th>
                            <th>수익률</th>
                            <th>평가손익</th>
                        </tr>
                    </thead>
                    <tbody>
                        {having.length === 0 ? (
                            <tr>
                                <td colSpan={7}>보유내역이 없습니다.</td>
                            </tr>
                        ) :
                            having.map((having) => (
                                <tr key={having.fhavingNum}>
                                    <td>{having.fpdName}</td>
                                    <td>{having.fhavingCnt}</td>
                                    <td>{having.fprofit}</td>
                                    <td>{having.fprincipal}</td>
                                    <td>{having.fnowPrice}</td>
                                    <td>{having.fnowProfit}</td>
                                    <td>{having.fnow}</td>
                                    <td>
                                        <button>매도</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default FundHavingList
/* 
FHAVINGNUM : 
FPDNAME :  거래종목명
FHAVINGCNT : 보유수량
FNOWTOTAL :  평가금액
FBUYPRICE : 매수가
FNOWPRICE  : 종목 현재가 
FPROFIT  :  수익률
FNOWPROFIT : 평가손익
fPrincipal :  원금
*/