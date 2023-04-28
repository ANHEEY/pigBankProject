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
  const [message, setMessage] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedBalance, setSelectedBalance] = useState('');
  const [selectedMyAccount, setSelectedMyAccount] = useState('');
  const [tAmount, setTAmount] = useState('');
  const [myMemo, setMyMemo] = useState('');
  const [yourMemo, setYourMemo] = useState('');
  const [acPwd, setAcPwd] = useState('');
  const [acnumber, setAcnumber] = useState('');
  const [showComponent, setShowComponent] = useState(false);
  const [bankName, setBankName] = useState('');

  
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

        const handleClick = (e) => {
          e.preventDefault();

          setShowComponent(true);

          let acNumber = [  selectedAccount,  acPwd,  selectedMyAccount,  tAmount,  myMemo,  yourMemo, bankName];

          let acnumber = {
            acNumber: selectedAccount,
            acpwd: acPwd,
            tdepositnum: Number(selectedMyAccount),
            tamount: Number(tAmount),
            myMemo: myMemo,
            yourMemo: yourMemo,
            tdepositBank: bankName
          };
          
          setAcnumber(acnumber);

          props.onData(acNumber);
          setData(acNumber);
          };


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

      return (
      <Container >
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
            value={selectedAccount}
            placeholder="-없이 입력해주세요"
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
                    </Form.Select> </td>
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
              <Button variant="primary" size="lg" onClick={handleClick} >
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









