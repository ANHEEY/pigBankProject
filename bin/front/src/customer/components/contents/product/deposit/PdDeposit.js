// 예금 상품
import React from "react";
import pd_deposit from '../../../../../customer/resources/img/3-1.png';
import { Link } from "react-router-dom";

function PdDeposit () {
    return (
        <div className="container">
             <img src={pd_deposit} alt="" /><br/>
             SELECT * FROM  deposit_product; -- 예금 상품 리스트
             <Link to = ''><h5>이곳을 클릭하면 상품 상세 페이지로 이동합니다 (추가해주세요)</h5></Link>
             <Link to = '/customer/product/deposit/application'><h5>이곳을 클릭하면 상품 가입 페이지로 이동합니다 </h5></Link>
        </div>
    )
}
export default PdDeposit;