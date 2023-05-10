import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import FundAPIService from "./service/FundAPIService";
import '../../../resources/css/fund/fund-list.css'

function FundProductList() {
    const { } = useParams();
    const navigate = useNavigate();

    const [list, setList] = useState([]);
    useEffect(() => {

    }, []);

    return (
        <div className="fund-div">
            <div className="fund-title">
                펀드 상품 목록
            </div>
            <div className="fund-contents fundProduct-list ">
                <ul>
                    <li>펀드 리스트  크롤링 해서 가져오기</li>
                    <li>리스트 클릭시 상세페이지로 이동</li>
                    <li>
                        <Link to='/customer/product/fund/detail'>
                            <button>클릭하면 상세페이지로 이동합니다.</button>
                        </Link>
                    </li>
                </ul>
                <table className="">
                    <thead>
                        <tr>
                            <th>종목명</th>
                            <th>현재가</th>
                            <th>전일비</th>
                            <th>등락률</th>
                            <th>NAV</th>
                            <th>3개월수익률</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map(list =>
                            <tr key={list.nameF}>
                                <td>{list.nameF}</td>
                                <td>{list.curP}</td>
                                <td>{list.changeP}</td>
                                <td>{list.changeR}</td>
                                <td>{list.volume}</td>
                                <td>{list.threeR}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FundProductList