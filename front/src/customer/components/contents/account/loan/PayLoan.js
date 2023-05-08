// 상환금 납부하기 실행
import React, {useState , useEffect} from "react";
import {InputGroup, Table, Button, Form, Container} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import PdLoanService from "../../product/loan/PdLoanService";


const PayLoan = (props) => {

    const { lwillPayNum } = props;
    const navigate = useNavigate();

    // 로그인 중인 id
    const id = window.localStorage.getItem("id");
    // 입출금 출금계좌
    const [selectedAccount, setSelectedAccount] = useState('');
    // 전체계좌
    const [accounts, setAccounts] = useState([]);
    // 잔액
    const [selectedBalance, setSelectedBalance] = useState('');
    // 비밀번호
    const [acPwd, setAcPwd] = useState(''); // 실제 계좌 비밀번호
    const [notePwd, setNotePwd] = useState(''); // 입력받은 비밀번호
    const [name, setName] = useState('');
    // 이체한도
    const [trsfLimit, setTrsfLimit] = useState('');
    // 상환금액
    const [payAmount, setPayAmount] = useState('');
    // 납부 계좌 정보
    const [payLoanInfo, setPayLoanInfo] = useState({
        lwillPayNum: lwillPayNum,
        acNumber: 0,
        lmonTotal: 0,
    })

    useEffect(() => {
       // 출금계좌 조회 
       PdLoanService.fetchAccountList(id)
       .then(res => {
       setAccounts(res.data);
       console.log("전체계좌조회 : " + res.data);
       })
       .catch(err => {
       console.log('fetchAccountList() Error!!', err);
       });      
       // 대출 계좌 정보 조회
       PdLoanService.fetchMyPayinfo(lwillPayNum)
       .then(res => {
       setPayLoanInfo(res.data);
       })
       .catch(err => {
       console.log('fetchMyPayinfo() Error!!', err);
       });     
    }, [lwillPayNum]);
  
    // 출금 계좌 선택
    const outputAccountChange = (e) => {
        // 입력한 계좌를 int형으로 바꾼다. (문자열 즉, 계좌선택을 눌렀을 때 parseInt 하지 않는다. Nan값을 안뜨게 하기 위함)
        const selectedAccountInt = e.target.value === '' ? '' : parseInt(e.target.value);
        // 입력한 계좌번호가 불러온 계좌번호들 중 일치한 계좌번호 정보를 account에 담는다.
        const account = accounts.find(account => account.acNumber === selectedAccountInt);
        setSelectedAccount(selectedAccountInt);
        // account가 존재할 때만
        if (account) {
          setAcPwd(account.acPwd);
          setTrsfLimit(account.trsfLimit);
          setName(account.name);
        } else {
          setAcPwd('');
        }
    };

    // 잔액 조회
    const handleBalanceClick = () => {
        const selectedAccountInt = parseInt(selectedAccount);
        const account = accounts.find(account => account.acNumber === selectedAccountInt);
        if (account) {
            setSelectedBalance(account.acBalance);
        } else {
            setSelectedBalance(0);
        }
    };

    // 납부하기 버튼
    const handlePayment= (e) => {
        e.preventDefault();
      
        if (!selectedAccount) {
          alert("출금 계좌를 선택해주세요.");
          return;
        }
      
        if (!selectedBalance) {
          alert("출금 계좌 잔액을 조회해주세요.");
          return;
        }
      
        // !=== 타입까지 비교, != 값만 비교
        if (acPwd !== notePwd) {
          alert("출금 계좌 비밀번호를 확인해주세요.");
          return;
        }
      
        if (selectedBalance < payLoanInfo.lmonTotal) {
          alert("출금 계좌 잔액이 부족합니다.");
          return;
        }

        if (trsfLimit < payLoanInfo.lmonTotal) {
            alert("이체한도가 초과되었습니다.");
            return;
        }
      
        // 대출 상환금(원금+이자)
        setPayAmount(payLoanInfo.lmonTotal);

        const paidInfo = {
          lwillPayNum: lwillPayNum,
          id: id,
          acNumber: selectedAccount,
          lmonTotal: payAmount,
          name: name,
        };
      
        PdLoanService.updatePayStatus(paidInfo);
       
        alert("상환금 납부가 완료되었습니다.");
        // 대출 거래 내역으로 이동
        navigate('/customer/product/loan/pdLoan');

    };

    // 계좌번호 => 문자열로 변환 후 slice
    const acNum = (acNumber) => {
        console.log(acNumber);
        const acNum = acNumber.toString().slice(0, 3) + '-' + acNumber.toString().slice(3);
        return acNum;
    }

    // 금액 콤마 찍기
    const comma = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    return(
        <Container>
            <br />
            <br />
            <h3>출금정보</h3>
            <hr />
            <Table align="center">
            <tbody>
        <tr>
            <td>
            <InputGroup.Text id="basic-addon1">출금 계좌번호</InputGroup.Text>
            </td>
            <td>
            <Form.Control
                readOnly
                value={selectedAccount}
                placeholder="오른쪽에서 계좌 선택해주세요"
                onChange={(event) => setSelectedAccount(event.target.value)}
            />
            </td>
            <td>
            <Form.Select name="acNumber" value={selectedAccount} onChange={outputAccountChange}>
                <option value="">계좌선택</option>
                 {/* fetch를 통해 가져온 계좌들을 조회한다. */} 
                 {accounts
                    .filter((account) => account.acType === "입출금통장")
                    .map(account => {
                    return (
                        <option key={account.acNumber} name="acNumber" value={account.acNumber}>
                            [{account.bankName}]{acNum(account.acNumber)}
                        </option>
                    );
                })}
            </Form.Select>
            </td>
            <td>
            <Button
                variant="secondary" 
                onClick={handleBalanceClick} 
                disabled={isNaN(selectedAccount) || !selectedAccount}
            > 잔액조회
            </Button>
            </td>
            <td>
            {comma(selectedBalance)}원
            </td>
        </tr>
        <tr>
            <td>
                <InputGroup.Text>계좌 비밀번호</InputGroup.Text>
                </td>
                <td>
                <Form.Control
                    value={notePwd}
                    type="password"
                    maxLength={4}
                    placeholder="숫자 4자리"
                    onChange={(e) => setNotePwd(parseInt(e.target.value))}
                    />  
                </td>    
            </tr>   

            </tbody>
            </Table>
            <br/>
            <hr/>
            <h3>납부정보</h3>
            <hr />

            <Table align="center">
                <tbody>
                    <tr>
                        <td>
                        <InputGroup.Text id="basic-addon1">납부 계좌번호</InputGroup.Text>
                        </td>
                        <td>
                        <Form.Control
                            readOnly
                            value={acNum(payLoanInfo.acNumber)}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />  
                        </td>    
                    </tr>                        
                    <tr>
                        <td>
                        <InputGroup.Text id="basic-addon1">이번 회차 상환금액</InputGroup.Text>
                        </td>
                        <td>
                        <Form.Control
                            readOnly
                            value={comma(payLoanInfo.lmonTotal) + '원'}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                        </td>    
                    </tr>
                </tbody>
            </Table>     

            <div style={{ position: "relative" }}>
                <Button variant="success" style={{ position: "absolute", right: 0 }} onClick={handlePayment}>
                 납부하기
                </Button>
            </div>
            <br/>
        </Container>
    )
}
export default PayLoan;