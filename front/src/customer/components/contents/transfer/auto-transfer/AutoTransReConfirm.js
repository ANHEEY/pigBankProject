import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import TransferService from "../transfer-service/TransferService";
import { useNavigate } from "react-router-dom";

function AutoTransReConfirm (props) {

    
    const selectedAccount = props.auto[0];
    const acPwd = props.auto[1];
    const selectedMyAccount= props.auto[2];
    const bankName = props.auto[3]
    const tAmount = props.auto[4];
    const myMemo = props.auto[5];
    const yourMemo = props.auto[6];
    const transferCycle = props.auto[7];
    const startDate = props.auto[8];
    const endDate = props.auto[9];
    const mybkName = props.auto[10];
    const name = props.auto[11];
    
    const navigate = useNavigate();

    const reloadReConfirmList = (e) => {
        e.preventDefault();

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

            console.log(acnumber)
            TransferService.autoSave(acnumber)
            .then(res => {
                navigate(`/customer/transfer/auto_trans_accept/${selectedAccount}/${selectedMyAccount}/${yourMemo}/${myMemo}/${tAmount}/${transferCycle}/${startDate}/${endDate}`);
            })
            .catch(err => {
                console.log('error', err);
            });
            
        };      

    return(
    <Container>
        <div align='center'>
        <a href="/customer/transfer/add_auto_trans"><Button variant="secondary" size="lg">
                초기화
        </Button></a>
        </div>
        <h3>자동 이체 확인</h3>
        <hr />
        <Table>
                <tbody>
                    <tr>
                        <th>이체 주기</th>
                        <td align='right'>{transferCycle}개월</td>
                    </tr>
                    <tr>
                        <th>예금주</th>
                        <td align='right'>{name}</td>
                    </tr>
                    <tr>
                        <th>출금계좌</th>
                        <td align='right'>[{bankName}]{selectedAccount}</td>
                    </tr>
                    <tr>
                        <th>이체 시작/종료일</th>
                        <td align='right'>{startDate} ~ {endDate}</td>
                    </tr>
                    </tbody>
                    </Table>
                    <br/>
                    <hr/>
                    <Table>
                    <tbody>
                    <tr>
                        <th>받는 분</th>
                        <td align='right'>{yourMemo}</td>
                    </tr>
                    <tr>
                        <th>받는계좌</th>
                        <td align='right'>{selectedMyAccount}</td>
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
                        <td align='right'>{tAmount}원</td>
                    </tr>
                    <tr>
                        <th>내통장메모</th>
                        <td align='right'>{myMemo}</td>
                    </tr>
                    <tr>
                        <th>받는통장메모</th>
                        <td align='right'>{yourMemo}</td>
                        
                    </tr>
                </tbody>
        </Table>
                <div align='right'>
                    {' '} 
                    <Button variant="primary" size="lg" onClick={reloadReConfirmList}>
                    자동 이체    
                    </Button>
                </div>
    </Container>
    )
}

export default AutoTransReConfirm