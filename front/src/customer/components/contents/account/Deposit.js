// 예금조회
import React from "react";
import deposit from '../../../../customer/resources/img/deposit.png';

function Deposit () {
    return (
        <div>
            <img src={deposit} alt = "face"/>  <br/>
            SELECT a.id, da.acNumber, da.d_pdName, da.d_amount, da.d_expAmount, da.d_joinDate, da.d_endDate, da.d_deAccount<br/>
            FROM d_account_tbl da, deposit_product d, account_tbl a<br/>
            WHERE da.d_pdName = d.d_pdName<br/>
            AND da.acNumber = a.acNumber<br/>
            AND a.id='hong1234'; -- 예금계좌 리스트<br/>
        </div>
    )
}
export default Deposit;