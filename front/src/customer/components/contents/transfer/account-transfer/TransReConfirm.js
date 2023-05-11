import React, {useState , useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import TransferService from "../transfer-service/TransferService";
import { useNavigate } from "react-router-dom";

function TransReConfirm (props) {


    // AutoTransReConfirm.js 와 거의 일치
    const acPwd = props.data[1];
    const selectedAccount = props.data[0];
    const yourMemo = props.data[5];
    const myMemo = props.data[4];
    const tAmount = props.data[3];
    const selectedMyAccount= props.data[2];
    const [currentTime, setCurrentTime] = useState(null);
    const mybkName = props.data[6];
    const name = props.data[7];
    const bankName = props.data[8];
    const myname = props.data[9];
    const navigate = useNavigate();

    // 값을 비교하기위해 가져온 모든계좌정보 
    const [allAccount, setAllAccounts] = useState([]);

    
        useEffect(() => {
            const now = new Date();
            const year = now.getFullYear(); // 년 정보 가져오기
            const month = now.getMonth() + 1; // 월 정보 가져오기 (0부터 시작하므로 +1 필요)
            const date = now.getDate(); // 일 정보 가져오기
            setCurrentTime(`${year}-${month}-${date}`);
            allAcountList();
            }, []);

    // 전체계좌조회
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
    
    const reloadReConfirmList = (e) => {
        e.preventDefault();

        let defaultMyAccounts = allAccount.filter(all => all.acNumber === selectedMyAccount)
        let defaultmybkName = allAccount.filter(all => all.bankName === mybkName); // 5건
        

        let acnumber = {
            acNumber: Number(selectedAccount),
            tdepositnum: Number(selectedMyAccount),
            tamount: Number(tAmount),
            myMemo: myMemo,
            acPwd: acPwd,
            yourMemo: yourMemo,
            tdepositBank: mybkName,
          };

     


        if(defaultMyAccounts.length !== 0){
            if(defaultmybkName.length !== 0) {
                console.log("on",acnumber);
                TransferService.save(acnumber)
                .then(res => {
                    alert("이체완료");
                    navigate(`/customer/transfer/trans_accept/${selectedAccount}/${selectedMyAccount}/${yourMemo}/${myMemo}/${tAmount}`);            
                })
                .catch(err => {
                    console.log('error', err);
                });
            }
        }
        else{
            alert('다른 은행 전송중..');
            console.log("other",acnumber);
            TransferService.othersave(acnumber)
              .then(res => {
                    alert('이체완료');
                    navigate(`/customer/transfer/trans_accept/${selectedAccount}/${selectedMyAccount}/${yourMemo}/${myMemo}/${tAmount}`);           
              })
        }
    };
          
    return(
    <Container>
        
        <br />
        <h3>이체 확인</h3>
        <hr />
        <Table width={'200px'}> 
                <tbody>
                    <tr>
                        <th>이체 일시</th>
                        <td style={{textAlign:'right'}}>{currentTime}</td>
                    </tr>
                    <tr>
                        <th>예금주</th>
                        <td style={{textAlign:'right'}}>{name}</td>
                    </tr>
                    <tr>
                        <th>출금계좌</th>
                        <td style={{textAlign:'right'}}>[{bankName}]{acNum(selectedAccount)}</td>
                    </tr>
                    </tbody>
                    </Table>
                    <br/>
                    <hr/>
                    <Table>
                    <tbody>
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
                    </Table>
                    <br />
                    <hr />
                    <Table>
                    
                    <tbody>
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
                    </tbody>
        </Table>
                <div align='right'>
                    <Button variant="primary" size="lg" onClick={reloadReConfirmList}>
                    이체    
                    </Button>
                </div>
    </Container>
    )
}

export default TransReConfirm