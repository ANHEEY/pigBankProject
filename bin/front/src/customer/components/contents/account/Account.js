// 입출금 통장조회
import React from "react";
import deposit from '../../../../customer/resources/img/deposit.png';

function Account () {
    return (
        <div className="container">
            <img src={deposit} alt = "face"/>     
            SELECT * FROM account_tbl where acType="입출금" AND id='';
    
        </div>
    )
}
export default Account;