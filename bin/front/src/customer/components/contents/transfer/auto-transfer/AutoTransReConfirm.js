import React, {useState , useEffect } from "react";
import Container from 'react-bootstrap/Container';
import TransferService from "../transfer-service/TransferService";
import { useNavigate } from "react-router-dom";

function AutoTransReConfirm (props) {

    // AddAutoTrans.js 에서 넘긴 값 datas 에서 배열로 받아서 각각의 변수에 넣어줌
    const selectedAccount = props.auto[0];
    const selectedMyAccount= props.auto[1];
    const bankName = props.auto[2];
    const tAmount = props.auto[3];
    const myMemo = props.auto[4];
    const yourMemo = props.auto[5];
    const transferCycle = props.auto[6];
    const startDate = props.auto[7];
    const endDate = props.auto[8];
    const mybkName = props.auto[9];
    const name = props.auto[10];
    const myname = props.auto[11];
    
    const navigate = useNavigate();

    // 값을 비교하기위해 가져온 모든계좌정보 
    const [allAccount, setAllAccounts] = useState([]);

    useEffect(() => {
        console.log(selectedAccount)
        allAcountList();
        }, []);

    const allAcountList = () => {
        TransferService.allAccountList()
          .then(res => {
              setAllAccounts(res.data);
          })
      }

      // 계좌번호 3번째에다가 - 추가해주는 함수
    const acNum = (acNumber) => {
        const acNum = acNumber.toString().slice(0, 3) + "-" + acNumber.toString().slice(3);
        return acNum;
    };

    const reloadReConfirmList = (e) => { // 해당 버튼 클릭시 acnumber 변수에 json 타입으로 값을 담고 axios로 백엔드에 값 넘겨주기
        e.preventDefault();

        let defaultMyAccounts = allAccount.filter(all => all.acNumber === selectedMyAccount)
        let defaultmybkName = allAccount.filter(all => all.bankName === mybkName); // 5건
        
        let acnumber = {
            acNumber: Number(selectedAccount),
            adepositnum: Number(selectedMyAccount),
            adepositBank: mybkName,
            adepositAmount: Number(tAmount),
            myMemo: myMemo,
            yourMemo: yourMemo,
            atransferCycle: transferCycle,
            astartDate: startDate,
            aendDate: endDate
            };

    if(defaultMyAccounts.length !== 0){
        if(defaultmybkName.length !== 0) {
            TransferService.autoSave(acnumber)
            .then(res => { // axios를 통해 백엔드에서 실행이 완료되면 auto_trans_accept 페이지로 이동 get방식으로 값 넘기기
                alert("등록완료");
                navigate(`/customer/transfer/auto_trans_accept/${selectedAccount}/${selectedMyAccount}/${myname}/${myMemo}/${tAmount}/${transferCycle}/${startDate}/${endDate}`);
            })
            .catch(err => {
                console.log('error', err);
            });
        }
    }
        else {
            alert('다른 은행 이체 등록..')
            TransferService.autoSave(acnumber)
            .then(res => { // axios를 통해 백엔드에서 실행이 완료되면 auto_trans_accept 페이지로 이동 get방식으로 값 넘기기
                alert("등록완료");
                navigate(`/customer/transfer/auto_trans_accept/${selectedAccount}/${selectedMyAccount}/${myname}/${myMemo}/${tAmount}/${transferCycle}/${startDate}/${endDate}`);
            })
            .catch(err => {
                console.log('error', err);
            });
        }
            
        };   

    return(
    <Container>
        <div className="title_div">
            <div className="title_see">
                자동 이체 확인
            </div>
        </div>
        <div className="trnsChk">
        <table style={{width:'1000px'}}> 
            <tbody>
                    <tr>
                        <th>이체 주기</th>
                        <td style={{textAlign:'right'}}>{transferCycle}개월</td>
                    </tr>
                    <tr>
                        <th>예금주</th>
                        <td style={{textAlign:'right'}}>{name}</td>
                    </tr>
                    <tr>
                        <th>출금계좌</th>
                        <td style={{textAlign:'right'}}>[{bankName}]{acNum(selectedAccount)}</td>
                    </tr>
                    <tr>
                        <th>이체 시작/종료일</th>
                        <td style={{textAlign:'right'}}>{startDate} ~ {endDate}</td>
                    </tr>
                    
                    <tr>
                        <th>받는 분</th>
                        <td style={{textAlign:'right'}}>{myname}</td>
                    </tr>
                    <tr>
                        <th>받는계좌</th>
                        <td style={{textAlign:'right'}}>{acNum(selectedMyAccount)}</td>
                    </tr>
                    <tr>
                        <th>은행명</th>
                        <td style={{textAlign:'right'}}>{mybkName}</td>
                    </tr>
                    </tbody>
                    
                    
                    <tr>
                        <th>이체금액</th>
                        <td style={{textAlign:'right'}}>{Number(tAmount).toLocaleString('ko-kR')}원</td>
                    </tr>
                    <tr>
                        <th>내통장메모</th>
                        <td style={{textAlign:'right'}}>{myMemo}</td>
                    </tr>
                    <tr>
                        <th>받는통장메모</th>
                        <td style={{textAlign:'right'}}>{yourMemo}</td>
                        
                    </tr>
                    </table>
                </div>
                <div className="mb-2" align='center'>
                    <button className="btnbtn big trns" onClick={reloadReConfirmList}>
                    자동 이체    
                    </button>
                </div>
    </Container>
    )
}

export default AutoTransReConfirm