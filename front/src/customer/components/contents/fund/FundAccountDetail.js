import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import '../../../resources/css/fund/fund-list.css'
import FundAPIService from "./service/FundAPIService";
import { getAuthToken, getId } from "../../helpers/axios_helper";
import axios from "axios";

export default function FundAccountDetail() {
    // url에서 id값을 받아오는  useParams
    const { fnum } = useParams();
    const [detail, setDetail] = useState([]);
    useEffect(() => {
        if (getAuthToken() !== null) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
        } else {
            axios.defaults.headers.common['Authorization'] = ``;
        }
        FundAPIService.fundAccountDetail(fnum)
            .then(res => {
                setDetail(res.data);
            })
            .catch(err => {
                console.log('FundAccountDetail 에러', err);
            })
    }, [fnum])
    return (
        <div className="fundProduct-list fund-div">
            <div className="fund-title">
                펀드계좌 거래내역
            </div>
            <table>
                <thead>
                    <tr>
                        <th>펀드거래번호</th>
                        <th>거래종목명</th>
                        <th>거래날짜</th>
                        <th>매수상태</th>
                        <th>매수/매도가</th>
                        <th>수량</th>
                        <th>총거래금액</th>
                    </tr>
                </thead>
                <tbody>
                    {detail.length === 0 ? (
                        <tr>
                            <td colSpan={7}>거래내역이 없습니다.</td>
                        </tr>
                    ) :
                        detail.map((detail) => (
                            <tr key={detail.ftransNum}>
                                <td>{detail.ftransNum}</td>
                                <td>{detail.fpdName}</td>
                                <td>{detail.ftransDate}</td>
                                <td>{detail.fdetailState}</td>
                                <td>{detail.fbuyPrice} , {detail.fsellPrice}</td>
                                <td>{detail.fcount}</td>
                                <td>{detail.ftotal}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}
/*
펀드계좌별 상세내역 조회
a.fNum = 펀드계좌아이디
a.FACNUMBER = 계좌번호
h.FTRANSNUM = 펀드거래번호
d.FPDNAME = 거래종목명
d.FTRANSDATE = 거래날짜
d.FDETAILSTATE = 매수상태
d.FBUYPRICE = 매수가(구매당시현재가)
d.FSELLPRICE = 매도가(판매당시현재가)
d.FCOUNT = 거래갯수
d.FTOTAL = 총거래금액
*/