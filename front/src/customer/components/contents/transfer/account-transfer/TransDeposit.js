import React, {useState , useEffect } from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TransferService from "../transfer-service/TransferService";
import Container from 'react-bootstrap/Container';
import { getId } from '../../../helpers/axios_helper'

import TransReConfirm from "../account-transfer/TransReConfirm";

function TransDeposit() {

  // AddAutoTrans와 거의 일치

  // 자식 컴포넌트를 보여줄지 안보여줄지를 판단하는 변수
  const [showComponent, setShowComponent] = useState(false);
  // 자식컴포넌트로 값을 넘길 변수
  const [data, setData] = useState([]);
  // 내 계좌
  const [accounts, setAccounts] = useState([]);
  // 선택한출금계좌
  const [selectedAccount, setSelectedAccount] = useState('');
  // 선택한 출금계좌의 잔액
  const [selectedBalance, setSelectedBalance] = useState('');
  // 선택한 입금계좌
  const [selectedMyAccount, setSelectedMyAccount] = useState('');
  // 선택한 이체금액
  const [tAmount, setTAmount] = useState('');
  // 메모
  const [myMemo, setMyMemo] = useState('');
  const [yourMemo, setYourMemo] = useState('');
  // 출금계좌의 해당하는 비밀번호
  const [acPwd, setAcPwd] = useState('');
  // 내가 입력한 비밀번호
  const [notePwd, setNotePwd] = useState('');
  // 출금계좌에 해당하는 은행명
  const [bankName, setBankName] = useState('');
  // 출금계좌에 해당하는 이체한도
  const [trsfLimit, setTrsfLimit] = useState('');
  // 입금계좌번호에 해당하는 은행명
  const [mybkName, setMybkName] = useState('');
  // 입금계좌번호에 해당하는 계좌명의
  const [name, setName] = useState('');
  // 출금계좌번호에 해당하는 계좌명의
  const [myname, setMyname] = useState('');
  // 값을 비교하기위해 가져온 모든계좌정보 
  const [allAccount, setAllAccounts] = useState([]);

  const [id, setId] = useState(getId());

  useEffect(() => {
    reloadAccountList();
    allAcountList();
    }, [id]);
  
    // id 에 해당하는 고객 계좌 조회
    const reloadAccountList = () => {
      TransferService.fetchAccountList(id)
        .then(res => {
          setAccounts(res.data);
        })
      .catch(err => {
        alert('로그인하세요.');
        console.log('fetchAccountList() Error!!', err);
      });
      
    };

    
    // 계좌번호 3번째에다가 - 추가해주는 함수
    const acNum = (acNumber) => {
      const acNum = acNumber.toString().slice(0, 3) + "-" + acNumber.toString().slice(3);
      return acNum;
  };

  // 전체계좌조회
    const allAcountList = () => {
      TransferService.allAccountList()
        .then(res => {
            setAllAccounts(res.data);
        })
    }

      // 이체 확인 컴포넌트를 뿌려주는 함수 
        const handleClick = (e) => {
          e.preventDefault(); // 실행시 렌더링이 안되고 클릭했을때만 렌더링이 되게 하는 함ㅅ

          // acNumber에 set한 모든 정보 담아주기 배열로
        let acNumber = [selectedAccount,  
                        acPwd,  
                        selectedMyAccount,  
                        tAmount,  
                        myMemo,  
                        yourMemo, 
                        mybkName,
                        name,
                        bankName,
                        myname];

                        console.log(myname);
                        console.log(acNumber);
       
                if(acPwd == notePwd) { // 계좌 비밀번호 체크
                  if(trsfLimit >= tAmount) { // 해당계좌에 이체한도와 입력한 이체금액 체크
                  setShowComponent(true);
                  setData(acNumber);
                  }
                  else{
                    alert('한도초과 확인후 다시 시도해주세요.')
                  }
                }
                else {
                  alert("비밀번호 오류 다시시도해주세요.");
                }
              
        }

        // 출금 계좌번호 선택시 그 계좌에 해당하는 비밀번호 이체한도 은행명 계좌명의 set 하기
        const accountChange = (event) => {
          const selectedAccountInt = parseInt(event.target.value);
          const account = accounts.find(account => account.acNumber === selectedAccountInt);
          setSelectedAccount(selectedAccountInt);
          
          if (account) {
            setAcPwd(account.acPwd);
            setTrsfLimit(account.trsfLimit);
            setBankName(account.bankName);
            setName(account.name);
          } else {
            setAcPwd('');
          }
          };

        // 잔액조회 해당하는 계좌에서 잔액값 set
        const handleBalanceClick = () => {
          const selectedAccountInt = parseInt(selectedAccount);
          const account = accounts.find(account => account.acNumber === selectedAccountInt);
          if (account) {
            setSelectedBalance(account.acBalance);
          } else {
            setSelectedBalance(0);
          }
        };


        // 입금 계좌번호 입력 또는 내계좌번호중 선택했을시에 해당하는값을 전체계좌를 조회한 값으로 찾아서 값 set 해주기
        const myAccountChange = (event) => {
          const selectedAllAccountInt = parseInt(event.target.value);
          const allaccount = allAccount.find((all) => all.acNumber === selectedAllAccountInt);
          setSelectedMyAccount(selectedAllAccountInt);
          console.log(allaccount);
          if (allaccount) {
            console.log(allaccount.name);
            setYourMemo(allaccount.name);
            setMybkName(allaccount.bankName);
            setMyname(allaccount.name);
          } else {
            setYourMemo("");
          }
        };

      return (
      <Container >
        <div className="title_div">
          <div className="title_see">
            계좌이체
          </div>
        </div>
        <div className="trans-div">
          <table align="center">
            <thead>
              <tr>
                <th colSpan={3}>출금정보</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <InputGroup.Text id="basic-addon1">출금 계좌번호</InputGroup.Text>
                </td>
                <td>
                  <Form.Control
                    readOnly
                    value={acNum(selectedAccount)}
                    placeholder="오른쪽에서 계좌 선택해주세요"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(event) => setSelectedAccount(event.target.value)}
                  />
                </td>
                <td>
                  <Form.Select aria-label="Default select example" onChange={accountChange}>
                    <option>계좌선택</option>
                    {accounts
                    .filter((account) => account.acType === "입출금통장")
                    .map((account) => (
                      <option key={account.acNumber} value={account.acNumber}>
                        [{account.bankName}]{acNum(account.acNumber)} || {account.acType}</option>
                    ))}
                  </Form.Select>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  {Number(selectedBalance).toLocaleString('ko-kR')}원
                </td>
                <td>
                    <button 
                      className="trnsbtn" 
                      onClick={handleBalanceClick} 
                      disabled={isNaN(selectedAccount) || !selectedAccount}
                      >
                        잔액조회</button>
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
          </table>
        </div>
        <div className="trans-div">
          <table align="center">
            <thead>
              <tr>
                <th colSpan={3}>입금정보</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <InputGroup.Text id="basic-addon1" >입금 계좌번호</InputGroup.Text>
                </td>
                <td>
                  <Form.Control
                      value={isNaN(selectedMyAccount) ? 0 : selectedMyAccount}
                      placeholder="-없이 입력해주세요"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => {setSelectedMyAccount(parseInt(e.target.value))
                                          myAccountChange(e) }}
                      />  
                </td>    
                <td>
                  <Form.Select aria-label="Default select example" onChange={myAccountChange}>
                          <option>본인계좌조회</option>
                          {accounts.map((account) => (
                              <option key={account.acNumber} value={account.acNumber}>
                                [{account.bankName}]{acNum(account.acNumber)} || {account.acType}</option>
                          ))}
                  </Form.Select> 
                </td>
              </tr> 
              <tr>
                <td>
                  <InputGroup.Text id="basic-addon1" >입금은행</InputGroup.Text>
                </td>
                <td colSpan={2}>
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
                <td colSpan={2}>
                  <Form.Control
                      value={tAmount ? Number(tAmount).toLocaleString('ko-kR') : ''}
                      placeholder="원(KRW)"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) => setTAmount(Number(e.target.value.replace(/[^0-9]/g, '')))}
                      />  
                </td>    
              </tr>
              <tr>
                <td>
                  <InputGroup.Text id="basic-addon1" >내통장 메모</InputGroup.Text>
                </td>
                <td colSpan={2}>
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
                <td>
                  <InputGroup.Text id="basic-addon1" >받는통장 메모</InputGroup.Text>
                </td>
                <td colSpan={2}>
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
          </table>     
        </div>
        <div className="mb-2" align='center'>
              <button className="btnbtn big trns"  onClick={handleClick} disabled={!selectedAccount || !notePwd || !selectedMyAccount || !tAmount} >
              다음
              </button>
        </div>
      {showComponent && (
          <TransReConfirm  data={data} 
            />
      )}
          </Container>
            )
      }


export default TransDeposit;








