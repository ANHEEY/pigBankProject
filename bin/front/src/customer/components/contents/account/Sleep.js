// 휴면계좌조회
import React from "react";
import ac_sleep from '../../../../customer/resources/img/deposit.png';

function Sleep () {
    return (
        <div>
             <img src={ac_sleep} alt="" />
             <br/>
             SELECT * <br/>
                FROM account_tbl<br/>
                WHERE acState IN ('휴면');<br/>

             <br/>
             <br/>
        </div>
    )
}
export default Sleep;