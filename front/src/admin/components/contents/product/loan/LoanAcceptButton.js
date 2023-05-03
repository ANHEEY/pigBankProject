import  React from "react";
import  LoanApiService from "./LoanApiService";

const LoanAcceptButton = ({ lreqNum, onUpdate }) => {

    // 승인 버튼
    const goAccept = () => {
        LoanApiService.updateAccept(lreqNum )
        .then(res => {
        alert("승인처리되었습니다.");
        onUpdate(lreqNum); // 부모 컴포넌트에 있는 onUpdate 함수를 호추랗면서 값전달
        })
        .catch(err => {
            console.log(' updateAccept() 에러', err)
        })
    }

    return(
        <div>
            <button className="customerinfoBtn" onClick={goAccept}>승인</button>
        </div>
    )
}
export default LoanAcceptButton;