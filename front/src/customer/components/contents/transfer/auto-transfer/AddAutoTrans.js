// 자동이체등록
import React, {useState , useEffect } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import TransferService from "../transfer-service/TransferService";
import AutoTransReConfirm from "./AutoTransReConfirm";


function AddAutoTrans () {

    const number = [1,2,3,4,5,6,7,8,9,10,11,12]

    const [showComponent, setShowComponent] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [selectedBalance, setSelectedBalance] = useState('');
    const [acPwd, setAcPwd] = useState('');
    const [selectedMyAccount, setSelectedMyAccount] = useState('');
    const [tAmount, setTAmount] = useState('');
    const [bankName, setBankName] = useState('');
    const [myMemo, setMyMemo] = useState('');
    const [yourMemo, setYourMemo] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [transferCycle, setTransferCycle] = useState('');

    const [auto, setAuto] = useState('');

    useEffect(() => {
        reloadAccountList();
        }, []);

    const reloadAccountList = () => {
        TransferService.fetchAccountList()
        .then(res => {
            console.log(res.data);
        setAccounts(res.data);
        })
        .catch(err => {
            console.log('fetchAccountList() Error!!', err);
        });
    };

    const handleClick = (e) => {
        e.preventDefault();

        console.log(transferCycle)
        
        let datas= [
            selectedAccount ,
            acPwd,
            Number(selectedMyAccount) ,
            bankName,
            Number(tAmount),
            myMemo,
            yourMemo,
            Number(transferCycle),
            startDate,
            endDate
        ];

        setShowComponent(true);
        setAuto(datas);
    }

    const accountChange = (event) => {
        setSelectedAccount(event.target.value);
        };

    const handleBalanceClick = () => {
        const selectedAccountInt = parseInt(selectedAccount);
        const account = accounts.find(account => account.acNumber === selectedAccountInt);
        if (account) {
          setSelectedBalance(account.acBalance);
        } else {
          setSelectedBalance(0);
        }
    }; 

    const myAccountChange = (event) => {
        setSelectedMyAccount(event.target.value);
        setYourMemo(accounts[0].name);
        const selectedAccountInt = parseInt(selectedAccount);
          const account = accounts.find(account => account.acNumber === selectedAccountInt);
          if (account) {
            setBankName(account.bankName);
          } else {
            setBankName('');
          }
        };

    return (
        <Container >
            <h2> 자동이체 </h2>
            <br />
            <hr />
            <h3>출금정보</h3>
            <hr />
            <Table align="center">
                <tbody>
                    <tr>
                        <td>
                        <InputGroup.Text id="basic-addon1" >출금 계좌번호</InputGroup.Text>
                        </td>
                        <td>
                        <Form.Control
                            value={selectedAccount}
                            placeholder="-없이 입력해주세요"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(event) => setSelectedAccount(event.target.value) }
                            />  
                        </td>    
                        <td><Form.Select aria-label="Default select example" onChange={accountChange}>
                            <option>계좌선택</option>
                            {accounts.map((account) => (
                                <option key={account.acNumber} value={account.acNumber}>
                                [{account.bankName}]{account.acNumber}</option>
                            ))}
                                </Form.Select> 
                             </td>
                             <td><Button 
                                    variant="light" 
                                    onClick={handleBalanceClick} 
                                    disabled={isNaN(selectedAccount) || !selectedAccount}
                                    >잔액조회</Button>{' '} </td>
                            <td>
                                {selectedBalance}원
                            </td>
                        </tr>
                    <tr>
                <       td>
                        <InputGroup.Text id="basic-addon1" >계좌 비밀번호</InputGroup.Text>
                        </td>
                        <td>
                        <Form.Control
                            value={acPwd}
                            type="password"
                            maxLength={4}
                            placeholder="숫자 4자리"
                            onChange={(e) => setAcPwd(e.target.value)}
                            />  
                        </td>    
                    </tr>
                     
                </tbody>
                </Table>
                <br/>
                <hr/>
                <h3>입금정보</h3>
                <hr />
                <Table align="center">
                    <tbody>
                        <tr>
                            <td>
                            <InputGroup.Text id="basic-addon1" >입금 계좌번호</InputGroup.Text>
                            </td>
                            <td>
                            <Form.Control
                                value={selectedMyAccount}
                                placeholder="-없이 입력해주세요"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={(e) => setSelectedMyAccount(e.target.value)}
                                />  
                            </td>    
                            <td><Form.Select aria-label="Default select example" onChange={myAccountChange}>
                                    <option>본인계좌조회</option>
                                {accounts.map((account) => (
                                    <option key={account.acNumber} value={account.acNumber}>[{account.bankName}]{account.acNumber}</option>
                                ))}
                                </Form.Select> 
                             </td>
                        </tr>
                        <tr>
                            <td>
                            <InputGroup.Text id="basic-addon1" >이체금액</InputGroup.Text>
                            </td>
                            <td>
                            <Form.Control
                                 value={tAmount}
                                 placeholder="원(KRW)"
                                 aria-label="Username"
                                 aria-describedby="basic-addon1"
                                 onChange={(e) => setTAmount(e.target.value)}
                                />  
                                
                            </td>    
                        </tr>
                        <tr>
                            <td>
                            <InputGroup.Text id="basic-addon1" >이체주기</InputGroup.Text>
                            </td>
                            <td>
                            <Form.Select aria-label="Floating label select example" onChange={(e) => setTransferCycle(e.target.value)}>
                                {number.map((anumber) => (
                                        <option key={anumber} value={anumber}
                                       >{anumber}개월</option>
                                ))}
                            </Form.Select>  
                            </td>
                        </tr>
                        </tbody>
                        </Table>
                        <Table>
                            <tbody>
                        <tr>
                            <td>
                            <InputGroup.Text >이체시작일/종료일</InputGroup.Text>
                            </td>
                            <td>
                                <Form.Control
                                 type="date"
                                 value={startDate}
                                 placeholder="원(KRW)"
                                 aria-label="Username"
                                 aria-describedby="basic-addon1"
                                 onChange={(e) => setStartDate(e.target.value)}
                                />  
                                
                            </td>
                            <td>~</td>
                            <td>
                             <Form.Control
                                 type="date"
                                 value={endDate}
                                 placeholder="원(KRW)"
                                 aria-label="Username"
                                 aria-describedby="basic-addon1"
                                 onChange={(e) => setEndDate(e.target.value)}
                                />  
                            </td>
                            <td>
                            <p size='lg' align='left'>이체시작일을 기준으로 매월 이체일자 설정</p>
                            </td>
                        </tr>
                        </tbody>
                        </Table>
                                
                    <Table>
                        <tbody>
                        <tr>
                    <       td>
                            <InputGroup.Text id="basic-addon1" >받는통장 메모</InputGroup.Text>
                            </td>
                            <td>
                            <Form.Control
                                value={yourMemo}
                                placeholder="받는 통장(계좌) 명의"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={(e) => setYourMemo(e.target.value)}
                                />  
                                
                            </td>    
                        </tr>   
                        <tr>
                    <       td>
                            <InputGroup.Text id="basic-addon1" >내통장 메모</InputGroup.Text>
                            </td>
                            <td>
                                
                            <Form.Control
                                 value={myMemo}
                                 placeholder="(선택)"
                                 aria-label="Username"
                                 aria-describedby="basic-addon1"
                                 onChange={(e) => setMyMemo(e.target.value)}
                                />  
                            </td>    
                            <td>{' '}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        </tr>

                    </tbody>
                </Table>
                <div className="mb-2" align='center'>
                    <a href="/customer/transfer/auto_trans_check">
                        <Button variant="light" size="lg">조회</Button>
                    </a>{'  '}{' '}

                    <Button variant="primary" size="lg" onClick={handleClick}>
                    다음
                    </Button>
                </div>
                <br/>
                {showComponent && (
                <AutoTransReConfirm  auto={auto}
                    />
                )}
                
        </Container>
    )
}

export default AddAutoTrans;