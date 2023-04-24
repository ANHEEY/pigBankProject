// 펀드 상품 > 펀드리스트
import React from "react";
import pd_fundList from  '../../../../../customer/resources/img/3-fundList.png';

function PdFundList () {
    return (
        <div className="container">
             <img src={pd_fundList} alt="" />
             SELECT * FROM F_DETAIL_TBL;

        </div>
    )
}
export default PdFundList;