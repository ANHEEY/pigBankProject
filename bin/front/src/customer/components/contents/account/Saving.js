// 적금조회
import React from "react";
import ac_saving from '../../../../customer/resources/img/deposit.png';

function Saving () {
    return (
        <div>
            <img src={ac_saving} alt="" />
            <br/>
            SELECT *  <br/>
            FROM s_account_tbl s, ACCOUNT_TBL a  <br/>
            WHERE s.ACNUMBER = a.ACNUMBER  <br/>
            AND id='hong1234'; <br/>

            <br/>
            <br/>
        </div>
    )
}
export default Saving;