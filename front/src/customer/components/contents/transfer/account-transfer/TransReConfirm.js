import React, {useState , useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import TransferService from "../transfer-service/TransferService";
import { useNavigate } from "react-router-dom";

function TransReConfirm (props) {

    const acPwd = props.data[1];
    const selectedAccount = props.data[0];
    const yourMemo = props.data[5];
    const myMemo = props.data[4];
    const tAmount = props.data[3];
    const selectedMyAccount= props.data[2];
    const [currentTime, setCurrentTime] = useState(null);
    const mybkName = props.data[6];
    
    const navigate = useNavigate();

    
        useEffect(() => {
            const now = new Date();
            const year = now.getFullYear(); // 년 정보 가져오기
            const month = now.getMonth() + 1; // 월 정보 가져오기 (0부터 시작하므로 +1 필요)
            const date = now.getDate(); // 일 정보 가져오기
            setCurrentTime(`${year}-${month}-${date}`);
            }, []);
    
    const reloadReConfirmList = (e) => {
        e.preventDefault();

        let acnumber = {
            acNumber: Number(selectedAccount),
            tdepositnum: Number(selectedMyAccount),
            tamount: Number(tAmount),
            myMemo: myMemo,
            acPwd: acPwd,
            yourMemo: yourMemo,
            tdepositBank: mybkName,
          };

          TransferService.save(acnumber)
            .then(res => {
              console.log(acnumber);
              console.log(selectedAccount);
              navigate(`/customer/transfer/trans_accept/${selectedAccount}/${selectedMyAccount}/${yourMemo}/${myMemo}/${tAmount}`);            
            })
            .catch(err => {
              console.log('error', err);
            });
          
          };
    return(
    <Container>
        <div align='center'>
            <a href="/customer/transfer/trans_deposit">
                <Button variant="secondary" size="lg" >
                초기화
                </Button>
            </a>
        </div>
        <h3>이체 확인</h3>
        <hr />
        <Table>
                <tbody>
                    <tr>
                        <th>이체 일시</th>
                        <td align='right'>{currentTime}</td>
                    </tr>
                    <tr>
                        <th>예금주</th>
                        <td align='right'>{props.data[5]}</td>
                    </tr>
                    <tr>
                        <th>출금계좌</th>
                        <td align='right'>{props.data[0]}</td>
                    </tr>
                    </tbody>
                    </Table>
                    <br/>
                    <hr/>
                    <Table>
                    <tbody>
                        <tr>
                        <th>받는 분</th>
                        <td align='right'>{props.data[5]}</td>
                    </tr>
                    <tr>
                        <th>받는계좌</th>
                        <td align='right'>{props.data[2]}</td>
                    </tr>
                    <tr>
                        <th>은행명</th>
                        <td align='right'>{mybkName}</td>
                    </tr>
                    </tbody>
                    </Table>
                    <br />
                    <hr />
                    <Table>
                    
                    <tbody>
                    <tr>
                        <th>이체금액</th>
                        <td align='right'>{props.data[3]}원</td>
                    </tr>
                    <tr>
                        <th>받는통장메모</th>
                        <td align='right'>{props.data[5]}</td>
                        
                    </tr>
                    <tr>
                        <th>내통장메모</th>
                        <td align='right'>{props.data[4]}</td>
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