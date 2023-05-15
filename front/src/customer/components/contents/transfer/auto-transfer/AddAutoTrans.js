// 자동이체등록
import React, {useState , useEffect } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import TransferService from "../transfer-service/TransferService";
import AutoTransReConfirm from "./AutoTransReConfirm";
import { getId } from '../../../helpers/axios_helper'

function AddAutoTrans () {

    // 이체주기의 값
    const number = [1,2,3,4,5,6,7,8,9,10,11,12]
    // 자식 컴포넌트를 보여줄지 안보여줄지를 판단하는 변수
    const [showComponent, setShowComponent] = useState(false);
    // 자식컴포넌트로 값을 넘길 변수
    const [auto, setAuto] = useState('');
    // 내 계좌
    const [accounts, setAccounts] = useState([]);
    // 선택한출금계좌
    const [selectedAccount, setSelectedAccount] = useState('');
    // 선택한 출금계좌의 잔액
    const [selectedBalance, setSelectedBalance] = useState('');
    // 출금계좌의 해당하는 비밀번호
    const [acPwd, setAcPwd] = useState('');
    // 내가 입력한 비밀번호
    const [notePwd, setNotePwd] = useState('');
    // 선택한 입금계좌
    const [selectedMyAccount, setSelectedMyAccount] = useState('');
    // 선택한 이체금액
    const [tAmount, setTAmount] = useState('');
    // 출금계좌에 해당하는 이체한도
    const [trsfLimit, setTrsfLimit] = useState('');
    // 출금계좌에 해당하는 은행명
    const [bankName, setBankName] = useState('');
    // 메모
    const [myMemo, setMyMemo] = useState('');
    const [yourMemo, setYourMemo] = useState('');
    // 이체시작일
    const [startDate, setStartDate] = useState('');
    // 이체종료일
    const [endDate, setEndDate] = useState('');
    // 이체주기 실제값
    const [transferCycle, setTransferCycle] = useState('');
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

    // 내 아이디로 가져온 계좌번호 목록
    const reloadAccountList = () => {
        TransferService.fetchAccountList(id)
            .then(res => {
                setAccounts(res.data);
            })
            .catch(err => {
                alert("로그인 하세요.");
                console.log('fetchAccountList() Error!!', err);
             });
    };

    // 계좌번호 3번째에다가 - 추가해주는 함수
    const acNum = (acNumber) => {
        const acNum = acNumber.toString().slice(0, 3) + "-" + acNumber.toString().slice(3);
        return acNum;
    };


    // 모든 계좌 목록
    const allAcountList = () => {
        TransferService.allAccountList()
          .then(res => {
              setAllAccounts(res.data);
          })
      }

    const handleClick = (e) => {
        e.preventDefault();

        let datas= [
            selectedAccount ,
            Number(selectedMyAccount) ,
            bankName,
            Number(tAmount),
            myMemo,
            yourMemo,
            Number(transferCycle),
            startDate,
            endDate,
            mybkName,
            name,
            myname
        ];
        console.log(myname);
        console.log(datas);
            if(acPwd == notePwd) { // 비밀번호 비교
                if(trsfLimit >= tAmount) { // 이체 한도 내에서 이체 오버되면 오류
                setShowComponent(true); // 다음 컴포넌트의 상태값 true 로 변경
                setAuto(datas); // 입력받은값 datas 에 담아서 auto변수에 set 해줌
                }
                else{
                alert('한도초과 확인후 다시 시도해주세요.')
                }
            }
            else {
                alert("비밀번호 오류 다시시도해주세요.");
            }
            
        }
          
        

    const accountChange = (event) => {  // 내계좌중에서 선택 선택시 해당 계좌번호에 맞는 값들이 자동으로 뿌려짐
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

    const handleBalanceClick = () => { // 선택한 계좌번호로 찾아서 잔액 조회 클릭시 값 출력
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
        console.log(allAccount);
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
                    자동이체 등록
                </div>
            </div>
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
                            readOnly
                            value={acNum(selectedAccount)}
                            placeholder="오른쪽에서 계좌 선택해주세요"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(event) => setSelectedAccount(event.target.value) }
                            />  
                        </td>    
                        <td><Form.Select aria-label="Default select example" onChange={accountChange}>
                            <option>계좌선택</option>
                            {accounts
                            .filter((account) => account.acType === "입출금통장")
                            .map((account) => (
                                <option key={account.acNumber} value={account.acNumber}>
                                [{account.bankName}]{acNum(account.acNumber)} || {account.acType}</option>
                            ))}
                                </Form.Select> 
                             </td>
                             <td><Button 
                                    variant="light" 
                                    onClick={handleBalanceClick} 
                                    disabled={isNaN(selectedAccount) || !selectedAccount}
                                    >잔액조회</Button>{' '} </td>
                            <td>
                                <p>{Number(selectedBalance).toLocaleString('ko-kR')}원</p>
                            </td>
                        </tr>
                    <tr>
                <       td>
                        <InputGroup.Text id="basic-addon1" >계좌 비밀번호</InputGroup.Text>
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
                                value={isNaN(selectedMyAccount) ? 0 : selectedMyAccount}
                                placeholder="-없이 입력해주세요"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={(e) => {setSelectedMyAccount(parseInt(e.target.value))
                                                myAccountChange(e) }}
                                />  
                            </td>    
                            <td><Form.Select aria-label="Default select example" onChange={myAccountChange}>
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
                            <InputGroup.Text id="basic-addon1" >이체주기</InputGroup.Text>
                            </td>
                            <td>
                            <Form.Select aria-label="Floating label select example" onChange={(e) => setTransferCycle(e.target.value)}>
                                <option>이체주기선택</option>
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
                         <td>
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
                    <a href="/customer/transfer/auto_trans_check">
                        <Button variant="light" size="lg">조회</Button>
                    </a>{'  '}{' '}

                    <Button variant="primary" size="lg" onClick={handleClick} disabled={!selectedAccount || !notePwd || !selectedMyAccount || !tAmount}>
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