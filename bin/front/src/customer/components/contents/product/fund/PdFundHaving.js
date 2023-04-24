// 펀드 상품 > 펀드 보유내역
import React from "react";
import pd_fudHaving from  '../../../../../customer/resources/img/3-56.png';

function PdFundHaving () {
    return (
        <div className="container">
             <img src={pd_fudHaving} alt="" /><br/>
             SELECT    fht.F_NOWPRICE ,fht.F_NOWPROFIT ,fht.F_PROFIT ,fht.F_NOWTOTAL ,fdt.F_PDNAME fdt.F_BUYPRICE ,fdt.F_TOTAL ,fdt.F_COUNT ,fdt.F_DETAILSTATE ,<br/>
             FROM    F_DETAIL_TBL fdt , F_HAVING_TBL fht, F_ACCOUNT_TBL fat, CUSTOMER c<br/> 
             WHERE    fdt.F_TRANSNUM = fht.F_TRANSNUM <br/>
             AND    fdt.F_NUM = fat.F_NUM <br/>
             AND     c.ID  = fat.ID <br/>
             AND     c.ID = ?;<br/>

        </div>
    )
}
export default PdFundHaving;