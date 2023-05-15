// 이체한도 조회
import React, { useEffect , useState } from "react";
import { Button, Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import TransferService from "../transfer-service/TransferService";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { getId } from '../../../helpers/axios_helper'

function TransLimit () {

    const [myaccounts,setMyaccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [trsfLimit, setTrsfLimit] = useState('');
    const [myvalue ,setMyvalue] = useState('');

    const navigate = useNavigate();

    const [id, setId] = useState(getId());

    useEffect(() => {
        reloadAccountList();
    }, [id]);

    // id 로 계좌목록 호출
    const reloadAccountList = () => {
        TransferService.fetchAccountList(id)
         .then(res => {
            setMyaccounts(res.data);
         })
         .catch(err => {
            console.log('fetchAccountList() Error!!', err);
            
         })
    }

    // 계좌번호 3번째에다가 - 추가해주는 함수
    const acNum = (acNumber) => {
        const acNum = acNumber.toString().slice(0, 3) + "-" + acNumber.toString().slice(3);
        return acNum;
    };

    // 선택한 계좌의 계좌번호로 이체한도 조회후 set
    const accountChange = (event) => {
        const selectedAccountInt = parseInt(event.target.value);
        const account = myaccounts.find(account => account.acNumber === selectedAccountInt);
        setSelectedAccount(selectedAccountInt);
        if (account) {
            setTrsfLimit(account.trsfLimit);
        } else {
            setTrsfLimit(0);
        }
    }

    // 이체한도 변경시 최대 5천만원을 넘어갈수없고 null,NaN,0 이 들어올수 없다.
    const transLimitAccept = () => {
        if(myvalue == null || myvalue >= 50000001 || myvalue <= 0){
            return alert("희망 이체한도는 0 또는 최대한도를 초과할 수 없습니다.")
        }
        else if (isNaN(myvalue)){
            return alert("값을 다시 입력해주세요.")
        }
        else if (isNaN(selectedAccount) || selectedAccount.length === 0) {
            return alert("계좌를 선택해주세요.")
        }
        else{
            let limit = {
                acNumber: selectedAccount,
                trsfLimit: myvalue,
            }
            console.log(limit);
            // 해당 데이터를 limit에 담아서 한도 update
            TransferService.updatetrsfLimit(limit)
                .then(res => {
                    console.log("한도변경완료!");
                    // 바뀌기 전 후 의 데이터를 navigate 함수 get 방식으로 값 넘겨주기
                    navigate(`/customer/transfer/trans_limit_accept/${trsfLimit}/${myvalue}`);
                })
        }

    }

    return (
        <Container>
            <div className="title_div">
                <div className="title_see">
                    이체 한도 조회/변경
                </div>
            </div>
            <hr />
            <Table align='center'>
            <thead>
                <tr>
                    <th>계좌번호</th>
                    <td><Form.Select aria-label="Floating label select example" onChange={accountChange}>
                        <option >내 계좌번호</option>
                        {myaccounts
                        .filter((account) => account.acType === "입출금통장")
                        .map((account) => (
                        <option key={account.acNumber} value={account.acNumber}>
                            [{account.bankName}]{acNum(account.acNumber)}</option>
                        ))}
                        </Form.Select></td>
                </tr>
            </thead>
            </Table>
           
            <hr />
            <br />
            <br />
            <Table>
            <thead>
               
                <tr>
                    <th> 일일 최대한도  </th>
                    <th> 현재 이체한도  </th>
                    <th> 희망 이체한도  </th>
                </tr>
            </thead>
            <tbody>
               <tr>
                    <th>50,000,000원</th>
                    <td>
                        <Form.Control
                        readOnly
                        value={Number(trsfLimit).toLocaleString('ko-kR')+ '원'}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    /></td>
                    <td><Form.Control
                        value={Number(myvalue).toLocaleString('ko-kR')+ '원'}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={(e) => setMyvalue(Number(e.target.value.replace(/[^0-9]/g, '')))}
                    /></td>
               </tr>
            </tbody>
            </Table>
            <div className="mb-2" align='center'>
                <button className="btnbtn big trns" onClick={transLimitAccept}>
                변경
                </button>{' '}
            </div>
        </Container>
    )
}
export default TransLimit;