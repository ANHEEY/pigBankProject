// 적금 상품
import React from "react";
import saving from '../../../../../customer/resources/img/3-2.png';
import { Link } from "react-router-dom";

function PdSaving () {
    return (
       <div className="container">
            <img src={saving} alt="" />
            SELECT * FROM  savings_product; 
            <Link to = ''><h5>이곳을 클릭하면 상품 상세 페이지로 이동합니다 (추가해주세요)</h5></Link>
            <Link to = '/customer/product/saving/application'><h5>이곳을 클릭하면 상품 가입 페이지로 이동합니다 </h5></Link>
       </div>
    )
}
export default PdSaving;