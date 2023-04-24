// 전체조회
import React from "react";
import deposit from '../../../../customer/resources/img/deposit.png';

function All () {
    return (
        <div>
            <div className="container">
                <img src={deposit} alt = "face"/>     
                SELECT * <br/>
                FROM ACCOUNT_TBL a, CUSTOMER c , D_ACCOUNT_TBL d, S_ACCOUNT_TBL s <br/>
                WHERE a.id = c.id<br/>
                AND a.id = 'hong1234';<br/>
    
            </div>
        </div>
    )
}
export default All;