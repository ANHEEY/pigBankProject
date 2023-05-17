import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import FundAPIService from "../service/FundAPIService";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function FundChart(props) {
    // 이전페이지에서 받아온 fund상품의 현재 가격 정보 사용=> 매수할때 이용할 데이터
    const location = useLocation();
    const fundItems = location.state?.fundItems || {}; // 기본값 설정
    const [fundData, setFundData] = useState([]);

    useEffect(() => {
        FundAPIService.getFundDetail(props.data)
            .then((response) => {
                console.log('장고서버에서 데이터 받아오기 성공');
                const parsedData = JSON.parse(response.data);
                setFundData(parsedData);
            })
            .catch((err) => {
                console.log('장고서버에서 데이터 받아오기 실패 ㅠ', err);
            });
    }, [])
    const chartData = fundData.map((list) => ({
        basDt: list.basDt,
        trqu: list.trqu,
        trPrc: list.trPrc,
        clpr: list.clpr,
    }));
    return (
        <div>
            <LineChart width={600} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="basDt" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="trqu" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="trPrc" stroke="#82ca9d" />
                <Line type="monotone" dataKey="clpr" stroke="#ff0000" />
            </LineChart>
            {fundData.map((list) => (
                <ul key={list.basDt}>
                    <li>{list.basDt}</li>
                    <li>{list.trqu}</li>
                    <li>{list.trPrc}</li>
                    <li>{list.clpr}</li>
                </ul>
            ))}
        </div>
    )
}
