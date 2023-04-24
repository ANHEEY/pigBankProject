import React from "react"
import { Link } from "react-router-dom"

function FundProductList(){
    return(
        <div>
            <h1>펀드 상품 목록</h1>
            <ul>
                <li>펀드 리스트  크롤링 해서 가져오기</li>
                <li>리스트 클릭시 상세페이지로 이동</li>
                <li>
                    <Link to = '/customer/product/fund/detail'>클릭하면 상세페이지로 이동합니다.</Link>
                </li>
            </ul>

        </div>
    )
}
export default FundProductList