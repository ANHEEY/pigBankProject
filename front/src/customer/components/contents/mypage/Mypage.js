// 내정보
import React from "react";


function Mypage () {
    return (
        <div className="container">
           <h3>회원정보 수정 및 탈퇴</h3>
           SELECT id,name,email,address,hp,birthday <br/>
            FROM customer<br/>
            WHERE id='hong1234'<br/>
        </div>
    )
}
export default Mypage;