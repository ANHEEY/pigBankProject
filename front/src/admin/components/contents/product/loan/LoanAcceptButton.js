import  React from "react";
import  LoanApiService from "./LoanApiService";

const LoanAcceptButton = ({ lreqNum, onUpdate, isDisabled}) => {
    // 승인 버튼
    const goAccept = () => {
        // 이미 처리된 대출신청은 중복처리 되지 않게 방지
        if(isDisabled) {
            alert("이미 처리된 대출 신청입니다.");
            return;
        }
        LoanApiService.updateAccept(lreqNum )
        .then(res => {
        alert("승인처리되었습니다.");
        onUpdate(lreqNum); // 부모 컴포넌트에 있는 onUpdate 함수를 호출하면서 값전달
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