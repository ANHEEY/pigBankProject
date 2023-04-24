// 대출계좌조회
import React from "react";
import loanaccount from '../../../../../customer/resources/img/loanaccount.png';

function Loan () {
    return (
        <div>
            <img src={loanaccount} alt="face"/>
            <br/>
            SELECT *<br/>
            FROM  l_account_tbl l, ACCOUNT_TBL a<br/>
            WHERE l.ACNUMBER = a.ACNUMBER <br/>
            AND id = 'hong1234'; <br/>
            <br/>
            <br/>
        </div>
    )
}
export default Loan;