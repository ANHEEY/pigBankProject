// 펀드 상품 > 펀드 거래내역
import React from "react";
import pd_fundDetail from  '../../../../../customer/resources/img/3-56.png';

function PdFundDetail () {
    return (
        <div className="container">
             <img src={pd_fundDetail} alt="" />
             SELECT   * <br/>
                FROM  F_DETAIL_TBL fdt ,<br/>
                    F_ACCOUNT_TBL fat,<br/>
                    CUSTOMER c<br/> 
                WHERE    fdt.F_NUM = fat.F_NUM <br/>
                AND     c.ID  = fat.ID<br/>
                AND     c.ID = ?<br/>
                AND    fdt.F_NUM = ?<br/>
        </div>
    )
}
export default PdFundDetail;