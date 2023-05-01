import React, {useState , useEffect } from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TransferService from "../transfer-service/TransferService";
import Container from 'react-bootstrap/Container';

import TransReConfirm from "../account-transfer/TransReConfirm";

function Account(props) {

  const [data, setData] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedBalance, setSelectedBalance] = useState('');
  const [selectedMyAccount, setSelectedMyAccount] = useState('');
  const [tAmount, setTAmount] = useState('');
  const [myMemo, setMyMemo] = useState('');
  const [yourMemo, setYourMemo] = useState('');
  const [acPwd, setAcPwd] = useState('');
  const [notePwd, setNotePwd] = useState('');
  const [showComponent, setShowComponent] = useState(false);
  const [bankName, setBankName] = useState('');
  const [trsfLimit, setTrsfLimit] = useState('');
  const [mybkName, setMybkName] = useState('');

  
  useEffect(() => {
    reloadAccountList();
    }, [acPwd]);
  
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

      const myAccountChange = (event) => {
        const selectedMyAccountInt = parseInt(event.target.value);
        const account = accounts.find(account => account.acNumber === selectedMyAccountInt);
        setSelectedMyAccount(selectedMyAccountInt);
        setYourMemo(accounts[0].name);
          if (account) {
            setMybkName(account.bankName);
          } else {
            setMybkName('');
          }
        };

        const handleClick = (e) => {
          e.preventDefault();
         
        let acNumber = [selectedAccount,  
                        acPwd,  
                        selectedMyAccount,  
                        tAmount,  
                        myMemo,  
                        yourMemo, 
                        mybkName];
          if(acPwd == notePwd) {
            if(trsfLimit >= tAmount) {
            setShowComponent(true);
            
            props.onData(acNumber);
            setData(acNumber);
            }
            else{
              alert('한도초과 확인후 다시 시도해주세요')
            }
          }
          else {
            alert("비밀번호 오류 다시시도해주세요");
          }
        };


        const accountChange = (event) => {
          const selectedAccountInt = parseInt(event.target.value);
          const account = accounts.find(account => account.acNumber === selectedAccountInt);

          setSelectedAccount(selectedAccountInt);
          if (account) {
            setAcPwd(account.acPwd);
            setTrsfLimit(account.trsfLimit);
            setBankName(account.bankName);
          } else {
            setAcPwd('');
          }
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

      return (
      <Container >
        <h2> 계좌이체 </h2>
        <br />
        <hr />
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
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(event) => setSelectedAccount(event.target.value) }
          />
        </td>
        <td>
          <Form.Select aria-label="Default select example" onChange={accountChange}>
            <option>계좌선택</option>
            {accounts.map((account) => (
              <option key={account.acNumber} value={account.acNumber}>
                [{account.bankName}]{account.acNumber}</option>
            ))}
          </Form.Select>
        </td>
        <td>
          <Button 
            variant="light" 
            onClick={handleBalanceClick} 
            disabled={isNaN(selectedAccount) || !selectedAccount}
            >
              잔액조회</Button>
        </td>
        <td>
          {selectedBalance}원
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
                onChange={(e) => setNotePwd(e.target.value)}
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
                    </Form.Select> </td>
                </tr> 
                <tr>
                    <td>
                        <InputGroup.Text id="basic-addon1" >입금은행</InputGroup.Text>
                        </td>
                        <td>
                        <Form.Control
                            value={mybkName}
                            placeholder="은행명"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(e) => setMybkName(e.target.value)}
                            />  
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
                    </tr>   
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
                    </tbody>
                </Table>     

        <div className="mb-2" align='center'>
              <Button variant="primary" size="lg" onClick={handleClick} disabled={!selectedAccount || !notePwd || !selectedMyAccount || !tAmount} >
              다음
              </Button>
          </div>
          <br/>
      {showComponent && (
          <TransReConfirm  data={data} 
            />
      )}
          </Container>
            )
      }


export default Account;









