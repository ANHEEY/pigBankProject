import {React, useState, useEffect} from 'react';
import { Form, Button, Container, Stack, Col, Row } from 'react-bootstrap';
import '../../../../resources/css/account/closeDetail.css';
import { useParams, useNavigate } from 'react-router-dom';
import AllService from "../All/AllService";
import PdLoanService from '../../product/loan/PdLoanService.js';


export default function LoanCancel() {
        
    const tableStyle = {
            width: '220px',
            textAlign: 'center'
        }
    
    const navigate = useNavigate();
    // url에서 lnum값을 받아오는 useParams
    const { lnum } = useParams();
    // 해지예상일 - 오늘 날짜 가져오기
    const today = new Date();
    const cancelDate = today.toLocaleDateString();    
    // 로그인한 id 
    const id = window.localStorage.getItem("id");
    // 비밀번호
    const [acPwd, setAcPwd] = useState(''); // 실제 계좌 비밀번호
    const [notePwd, setNotePwd] = useState(''); // 입력받은 비밀번호
    // 잔액
    const [acBalance, setAcBalance] = useState(''); // 실제 계좌 비밀번호
    // 이체한도
    const [trsfLimit, setTrsfLimit] = useState('');
    // 나의 계좌목록
    const [myAccounts, setMyAccounts] = useState([]); 
    // 선택한 출금계좌
    const [selectedAccount, setSelectedAccount] = useState('');
    // 대출 해지 정보
    const[loanCancelInfo, setLoanCancelInfo] = useState("");
    
    useEffect(() => {
        // 계좌조회
        PdLoanService.fetchAccountList(id)
        .then(res => {
        console.log(res.data);
        setMyAccounts(res.data);
        })
        .catch(err => {
        console.log('fetchAccountList() Error!!', err);
        });

        // 대출 상환 중도해지 정보
        AllService.fetchLoanCancelInfo(lnum)
        .then(res => {
            setLoanCancelInfo(res.data);
            console.log(res.data);
        })
        .catch(err => {
            console.log('fetchLoanCancelInfo Error', err);
        });
    }, [lnum]);

    // 계좌 선택 눌렀을 때
    const accountChange = (e) => {
        // 입력한 계좌를 int형으로 바꾼다. (문자열 즉, 계좌선택을 눌렀을 때 parseInt 하지 않는다. Nan값을 안뜨게 하기 위함)
        const selectedAccountInt = e.target.value === '' ? '' : parseInt(e.target.value);
        // 입력한 계좌번호가 불러온 계좌번호들 중 일치한 계좌번호 정보를 account에 담는다.
        const account = myAccounts.find(account => account.acNumber === selectedAccountInt);
        setSelectedAccount(selectedAccountInt);
        // account가 존재할 때만
        if (account) {
          setAcPwd(account.acPwd);
          setTrsfLimit(account.trsfLimit);
          setAcBalance(account.acBalance);
        } else {
          setAcPwd('');
        }
    };

    // 해지버튼
    const handleCancelButton = (e) => {
        e.preventDefault();
      
        if (!selectedAccount) {
          alert("출금 계좌를 선택해주세요.");
          return;
        }
       
        // !=== 타입까지 비교, != 값만 비교
        if (acPwd !== notePwd) {
          alert("출금 계좌 비밀번호를 확인해주세요.");
          return;
        }

        if (acBalance < (loanCancelInfo.cancelFee + loanCancelInfo.acBalance)) {
          alert("출금 계좌 잔액이 부족합니다.");
          return;
        }

        if (trsfLimit < (loanCancelInfo.cancelFee + loanCancelInfo.acBalance)) {
            alert("이체한도가 초과되었습니다.");
            return;
        }
      
        // 대출 상환금(원금+이자)
        const loanCancelPay = {
            lnum: lnum,
            acNumber: selectedAccount, // 입출금 출금통장
            cancelFee: loanCancelInfo.cancelFee,  
            acBalance: loanCancelInfo.acBalance, // 대출 잔액
        }
       
        PdLoanService.updateLoanClose(loanCancelPay);
        alert("중도해지 처리가 완료되었습니다.");
        
        // 대출 계좌 조회로 이동
        navigate('/customer/account/Loan');

    };
    
    // 계좌번호 => 문자열로 변환 후 slice
    const acNum = (e) => {
        if (!e) return "";  // acNumber가 undefined면 빈 문자열 반환
        return e.toString().slice(0, 3) + '-' + e.toString().slice(3);
    }

    // 금액 콤마 찍기
    const comma = (amount) => {
        if (!amount) return "";  // acNumber가 undefined면 빈 문자열 반환
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    return (
        <Container>
        <br/><br/><br/><br/>
        <div>
            <div>
                <h1 style={{textAlign:"center"}}>대출 해지 예상 조회</h1>
            </div>
            <br/><br/>
            <div className='border' style={{textAlign:"center"}}>
                <p>

                    * 조회시점의 잔액을 기준으로 한 해지예상조회 결과입니다.<br/>
                    * 계좌잔액에는 미결제된 자기앞수표, 당좌수표, 약속어음 등 타점권이 포함되어 있을 수 있습니다.<br/>
                    * 적용이율 또는 세율변동 시 실제 지급액이 다를 수 있습니다.<br/>
                    * 해지를 원하시면 조회결과 하단의 [해지]버튼을 선택하시기 바랍니다.<br/>
                </p>
            </div> 
            <br/>
            <div>
                <table className="CDTable" style={{width:'1300px'}}>
                    <thead className='CDTable-title'>
                        <tr>
                            <th colSpan={6}>Account Info</th>
                        </tr>
                    </thead>
                    <tbody className='CDTable-info'>
                        <tr>
                            <th style={tableStyle}>대출상품명</th>
                            <td colSpan={5}>{loanCancelInfo.lpdName}</td>
                        </tr>
                        <tr>
                            <th style={tableStyle}>대출 계좌</th>
                            <td style={tableStyle}>{acNum(loanCancelInfo.acNumber)}</td>
                            <th style={tableStyle} >대출 잔액</th>
                            <td style={tableStyle}>{comma(loanCancelInfo.acBalance)}</td>
                        </tr>
                        <tr>
                            <th style={tableStyle}>신규일</th>
                            <td>{new Date(loanCancelInfo.lstartDate).toLocaleDateString().slice(0,-1)}</td>
                            <th style={tableStyle}>만기일</th>
                            <td>{new Date(loanCancelInfo.lendDate).toLocaleDateString().slice(0,-1)}</td>
                        </tr>
                        <tr>
                            <th style={tableStyle}>상환방식</th>
                            <td colSpan={3}>전액상환</td>
                        </tr>
                        <tr>
                            <th style={tableStyle}>해지예상일</th>
                            <td colSpan={3}>{cancelDate.slice(0,-1)}</td>
                        </tr>
                        <tr>
                            <th style={tableStyle}>해지시 출금계좌</th>
                            <td style={tableStyle}>
                            <Form.Group as={Row}>
                            <Col>
                                <Form.Select name="acNumber" value={selectedAccount} onChange={accountChange}>
                                    <option value="">입출금계좌를 선택하세요</option>
                                        {/* fetch를 통해 가져온 계좌들을 조회한다. */} 
                                        {myAccounts
                                            .filter((account) => account.acType === "입출금통장")
                                            .map(account => {
                                            return (
                                                <option key={account.acNumber} name="acNumber" value={account.acNumber}>
                                                    [{account.bankName}]{acNum(account.acNumber)}||{account.acType}
                                                </option>
                                            );
                                        })}
                                </Form.Select>
                            </Col>
                            </Form.Group> 
                            </td>
                            <th style={tableStyle}>출금계좌 비밀번호</th>
                            <td style={tableStyle}>
                                <Form.Control 
                                type="password"
                                value={notePwd}
                                maxLength={4}
                                placeholder="비밀번호 4자리 입력" 
                                onChange={(e) => setNotePwd(parseInt(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th style={tableStyle}>상환원금</th>
                            <td>{comma(loanCancelInfo.lprincipal)}원</td>
                            <th style={tableStyle}>중도상환 해약금</th>
                            <td>{comma(loanCancelInfo.cancelFee)}원</td>
                        </tr>
                        <tr>
                            <th style={tableStyle}>상환금액 합계</th>
                            <td colSpan={3}>{comma(loanCancelInfo.cancelFee + loanCancelInfo.acBalance)}원</td>
                        </tr>
                        <tr>
                            <th style={tableStyle}>상환후 대출잔액</th>
                            <td colSpan={5}>0원</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br/>
            <br/><br/><br/><br/>
            <Stack direction="horizontal" gap={2} className="col-md-3 mx-auto d-flex justify-content-end">
                <Button variant="success" size='lg' style={{background:"green", color:"white"}} onClick={handleCancelButton}>해지</Button>
                <Button variant="outline-secondary" size='lg' onClick={() => navigate(-1)}>계좌목록</Button>
            </Stack>  
            <br/><br/><br/><br/>      
        </div>
        </Container>
    );
}
