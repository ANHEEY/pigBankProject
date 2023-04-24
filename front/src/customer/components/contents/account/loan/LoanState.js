// 대출심사조회
import React from "react";
import loanaccount from '../../../../../customer/resources/img/loanaccount.png';

function LoanState () {
    return (
        <div className="container">
             <img src={loanaccount} alt="face"/>
             SELECT l_reqNum,<br/>
                    l_pdName,<br/>
                    l_amount,<br/>
                    l_state<br/>
               FROM loan_req_tbl<br/>
              WHERE id = 'hong1234';<br/>

        </div>
    )
}
export default LoanState;