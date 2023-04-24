// 입출금 상품(일반계좌)
import React from "react";
import pdaccount from '../../../../../customer/resources/img/3-3.png';
import { Link } from "react-router-dom";

function PdAccount () {
    return (
        <div className="container">
             <img src={pdaccount} alt="" />
             <Link to = ''><h5>이곳을 클릭하면 상품 상세 페이지로 이동합니다 (추가해주세요)</h5></Link>
             <Link to = '/customer/product/account/application'><h5>이곳을 클릭하면 상품 가입 페이지로 이동합니다 </h5></Link>
        </div>
    )
}
export default PdAccount;