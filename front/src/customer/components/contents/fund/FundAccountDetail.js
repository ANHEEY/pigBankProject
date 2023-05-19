import React, { useEffect, useState } from "react";
import { useParams ,useNavigate} from 'react-router-dom';
import '../../../resources/css/fund/fund-list.css'
import FundAPIService from "./service/FundAPIService";
import { getAuthToken, getId } from "../../helpers/axios_helper";
import axios from "axios";

export default function FundAccountDetail() {
    // url에서 id값을 받아오는  useParams 
    const { fnum } = useParams(); 
    const navigate = useNavigate();

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
    }, []) 
    function loCale(number) {return Number(number).toLocaleString();} 
    const goBack=() =>{
        navigate(-1)
    }
    return ( 
        <div className="fundProduct-list fund-div"> 
            <div className="title_div"> 
                <p className="fund-title"> 
                    펀드계좌 거래내역 
                </p>
            </div> 
            <table className="fund-listTbl"> 
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
                                <td className="fundNm">{detail.ftransNum}</td> 
                                <td className="fundNm">{detail.fpdName}</td> 
                                <td className="priceSpan"> 
                                    {new Date(detail.ftransDate).getFullYear()}년 &nbsp; 

                                    {new Date(detail.ftransDate).getMonth() + 1}월 &nbsp; 
                                    {new Date(detail.ftransDate).getDate()}일 
                                </td> 
                                <td> 
                                    {(detail.fdetailState) ==='매수' ?( 
                                        <span className="plusPre">매수</span> 
                                    ):( 
                                        <span className="minusPre">매도</span> 
                                    )} 
                                </td> 
                                <td> 
                                    {(detail.fdetailState) ==='매수' ?( 
                                        <span className="plusPre">₩ {loCale(detail.fbuyPrice)}</span> 
                                    ):( 
                                        <span className="minusPre">₩ {loCale(detail.fsellPrice)}</span> 
                                    )} 
                                </td> 
                                <td className="priceSpan">{detail.fcount}</td> 
                                <td className="priceSpan">{loCale(detail.ftotal)}원</td> 
                            </tr> 
                        ))} 
                </tbody>
            </table> 
            <div className="-div">
                <button onClick={goBack}>뒤로가기</button>
            </div>
        </div> 
    ) 
} 