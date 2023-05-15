// 자동이체 조회
import React, { useEffect , useState } from "react";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import RadioCheck from "../RadioCheck";
import Button from 'react-bootstrap/Button';
import TransferService from "../transfer-service/TransferService";
import AutoTransCheck from "./AutoTransCheck";
import { getId } from '../../../helpers/axios_helper'

function AutoTrans () {

    const [myaccounts,setMyaccounts] = useState([]);
    const [showComponent, setShowComponent] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [astate,setAstate] = useState('');
    const [data,setData] = useState([])

    const [id, setId] = useState(getId()); // getid로 id 가져오기

    useEffect(() => {
        reloadAccountList();
    }, [id]);

    const acNum = (acNumber) => {
        const acNum = acNumber.toString().slice(0, 3) + "-" + acNumber.toString().slice(3);
        return acNum;
    };
    
    const reloadAccountList = () => {  // id로 계좌 조회
        TransferService.fetchAccountList(id)
         .then(res => {
            setMyaccounts(res.data); // myaccounts에 set 해주기
            console.log(res.data);
         })
         .catch(err => {
            console.log('fetchAccountList() Error!!', err);
         })
    }

    const accountChange = (event) => { // 불러온 계좌번호중 계좌번호 선택
        setSelectedAccount(event.target.value);
    }

    const handleChange = (astate) => { // 라디오 버튼으로 상태값 set 
        setAstate(astate);
    }
    
    const handleClick = (e) => { // 버튼클릭시 value 값에 배열로 계좌번호와 상태값 을 넣고 하단 페이지 보여줌 data={data} 로 자식컴포넌트에 값 넘겨주기
        e.preventDefault();

        let value = [selectedAccount, 
                        astate];
        setData(value);
        setShowComponent(true);
    }

    return (
        <div className="container">
            <div className="title_div">
                <div className="title_see">
                    자동이체 조회
                </div>
            </div>
            <hr />
            <Table striped="columns">
                <tbody>
                    <tr>
                        <td>계좌번호</td>
                        <td><Form.Select aria-label="Floating label select example" onChange={accountChange}>
                            <option>내 계좌번호</option>
                            {myaccounts
                            .filter((account) => account.acType === "입출금통장")
                            .map((account) => (
                            <option key={account.acNumber} value={account.acNumber}>
                                [{account.bankName}]{acNum(account.acNumber)} || {account.acType}</option>
                            ))}
                            </Form.Select></td>
                        <td>조회구분</td>
                        <td><RadioCheck onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <td colSpan={4} align="center" style={{paddingTop: '50px'}}>
                                <button className="btnbtn big trns" onClick={handleClick}>조회</button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            
            <hr/>
            <br/>
            {showComponent && (
          <AutoTransCheck  data={data} 
            />
        )}
        </div>
    )
    
}

export default AutoTrans;

