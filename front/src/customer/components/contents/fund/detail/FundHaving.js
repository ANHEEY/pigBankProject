import React, { useEffect, useState } from "react";
import FundAPIService from "../service/FundAPIService";
import { getAuthToken, getId } from "../../../helpers/axios_helper";
import axios from "axios";

export default function FundHaving({fundCdProps}) {
    const id = getId();
    // 보유내역 list
    const [having, setHaving] = useState([]);
    // 보유내역 목록 업데이트하기 위하여 key 값을 저장
    const [fundCd, setFundCd] = useState([]);

    // 금액 , 으로 반환
    function loCale(number) { return Number(number).toLocaleString(); }
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
        FundAPIService.fundHavingList(id)
            .then(res => {
                const fisinCdList = res.data.map(having => having.fisinCd);
                fundCdProps(fisinCdList);
                setHaving(res.data);
            })
            .catch(err => {
                console.log('fundHavingList 에러', err);
            })
    }, [having]);

    return (
        <table className="fund-listTbl">
            <thead>
                <tr>
                    <th>거래종목명</th>
                    <th>보유수량</th>
                    <th>수익률</th>
                    <th>원금</th>
                    <th>현재가</th>
                    <th>평가손익</th>
                    <th>평가금액</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {having.length === 0 ? (
                    <tr>
                        <td colSpan={7}>보유내역이 없습니다.</td>
                    </tr>
                ) :
                    having.map((having) => (
                        <tr key={having.fisinCd}>
                            <td className="fundNm">
                                {having.fpdName}
                            </td>
                            <td>
                                {having.fhavingCnt}
                            </td>
                            <td>
                                {Number(having.fprofit) >= 0 ? (
                                    <span className="plusPre">+ {format(having.fprofit)} % </span>
                                ) : (
                                    <span className="minusPre">- {format(having.fprofit)}</span>
                                )}
                            </td>
                            <td>
                                ₩{loCale(having.fprincipal)}
                            </td>
                            <td>
                                ₩{loCale(having.fnowPrice)}
                            </td>
                            <td>
                                {Number(having.fnowProfit) >= 0 ? (
                                    <span className="plusPre">₩ {loCale(having.fnowProfit)} </span>
                                ) : (
                                    <span className="minusPre">₩ {loCale(having.fnowProfit)}</span>
                                )}
                            </td>
                            <td>
                                <span>₩ {loCale(having.fnowTotal)}</span>
                            </td>
                            <td>
                                <button>매도</button>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    )
}