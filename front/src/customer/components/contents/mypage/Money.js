// 자산관리
import React from "react";
import my_money from '../../../../customer/resources/img/money.png';

function Money () {
    return (
        <div className="container">
            <img src={my_money} alt="" /><br/>
            SELECT SUM(acBalance), acType<br/>
            FROM account_tbl a, l_account_tbl l, loan_req_tbl lr<br/>
            WHERE a.acNumber = l.acNumber<br/>
            AND l.l_reqNum = lr.l_reqNum<br/>
            AND a.id='hong1234'<br/>
            GROUP BY acType;--자산관리<br/>
        </div>
    )
}
export default Money;