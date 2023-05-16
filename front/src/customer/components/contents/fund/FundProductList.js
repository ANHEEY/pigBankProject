import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import FundAPIService from "./service/FundAPIService";
import { getAuthToken, getId } from "../../helpers/axios_helper";
import '../../../resources/css/fund/fund-list.css'
import axios from "axios";
import {Box} from "@mui/material";
import Pagination from "@mui/material/Pagination";

function FundProductList() {
    const navigate = useNavigate();
    const [fund,setFund] = useState([]);
    const [itemsPerPage] = useState(30);
    const [currentPage, setCurrentPage] = useState(1);

    // api 호출하여 펀드상품 목록 가져오기  
    useEffect(()=>{
        if (getAuthToken() !== null) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
        } else {
            axios.defaults.headers.common['Authorization'] = ``;
        }
        FundAPIService.fundProductList()
            .then((response) => {
                console.log('장고서버 호출 성공 ');
                const parsedData = JSON.parse(response.data);
                setFund(parsedData);
            })
            .catch((err) => {
                console.log('장고서버 호출 실패 ',err);
            });
    },[])

    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const fundlist = fund.slice(indexOfFirstItem, indexOfLastItem);

    // 상세 페이지로 이동
    const goDetail = (isinCd) => {
        const fundItem = fund.find(item => item.isinCd === isinCd);
        const fundItems = {
            isinCd : isinCd,
            itmsNm: fundItem.itmsNm,
            clpr: fundItem.clpr,
            vs: fundItem.vs,
            fltRt: fundItem.fltRt,
            trqu: fundItem.trqu,
            trPrc: fundItem.trPrc,
            nPptTotAmt: fundItem.nPptTotAmt
        }
        navigate(`/customer/fund/detail/${isinCd}`, { state: { fundItems }});
    };
    // 금액 , 으로 반환
    function loCale(number) {return Number(number).toLocaleString();}
    // 숫자 절대값으로 변환
    function abs(number){return Math.abs(number);};
    // 백만단위로 변환
    function trunc(number){return Math.floor(number / 1000000);}
    // 십만단위로 변환
    function truncTen(number){return Math.floor(number / 100000);}
    // 0빠져 반환된 소수점 숫자 0추가하여 반환 ex) .28 -> 0.28
    function format(number){
        const parsedNumber = parseFloat(number);
        return isNaN(parsedNumber) ? NaN : parsedNumber.toFixed(2);
    }
    return (
        <div className="fund-div">
            <div className="fund-title">
                펀드 상품 목록
            </div>
            <div className="fund-contents fundProduct-list">
                <table className="fund-listTbl">
                    <thead>
                        <tr>
                            <th>종목명</th>
                            <th>현재가</th>
                            <th>전일비</th>
                            <th>등락률</th>
                            <th>거래량</th>
                            <th>거래대금(십만)</th>
                            <th>순자산(백만)</th>
                        </tr>
                    </thead>
                    <tbody>
                    {fundlist.map((list) => (
                        <tr key={list.isinCd} onClick={() => goDetail(list.isinCd)}>
                            <td className="fundNm">{list.itmsNm}</td>
                            <td>{loCale(list.clpr)}</td>
                            <td>
                                {Number(list.vs) > 0 ? (
                                    <span className="plusPre">▲{abs(list.vs)}</span>
                                ):(
                                    <span className="minusPre">▼{abs(list.vs)}</span>
                                )}
                            </td>
                            <td>
                                {Number(list.fltRt) > 0 ? (
                                    <span className="plusPre">{format(list.fltRt)}</span>
                                ):(
                                    <span className="minusPre">{format(list.fltRt)}</span>
                                )}
                            </td>
                            <td>{loCale(list.trqu)}</td>
                            <td>{loCale(truncTen(Number(list.trPrc)))}</td>
                            <td>{loCale(trunc(Number(list.nPptTotAmt)))}</td>
                        </tr>
                    ))}
                    </tbody>
                        <td colSpan={7} style={{textAlign:"center"}}>
                            <Box display="flex" justifyContent="center">
                                <Pagination 
                                count={Math.ceil(fund.length / itemsPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                                />
                            </Box>
                        </td>
                </table>
            </div>
        </div>
    )
}
export default FundProductList