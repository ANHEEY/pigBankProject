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

    const [id, setId] = useState(getId());

    useEffect(() => {
        reloadAccountList();
    }, [id]);
    
    const reloadAccountList = () => {
        TransferService.fetchAccountList(id)
         .then(res => {
            setMyaccounts(res.data);
         })
         .catch(err => {
            alert("로그인 하세요.");
            console.log('fetchAccountList() Error!!', err);
         })
    }

    const accountChange = (event) => {
        setSelectedAccount(event.target.value);
    }

    const handleChange = (astate) => {
        setAstate(astate);
    }
    
    const handleClick = (e) => {
        e.preventDefault();

        let value = [selectedAccount, 
                        astate];
        setData(value);
        setShowComponent(true);
    }

    return (
        <div className="container">
            <hr />
            <Table striped="columns">
                <tbody>
                    <tr>
                        <td>계좌번호</td>
                        <td><Form.Select aria-label="Floating label select example" onChange={accountChange}>
                            <option>내 계좌번호</option>
                            {myaccounts.map((account) => (
                            <option key={account.acNumber} value={account.acNumber}>
                                [{account.bankName}]{account.acNumber}</option>
                            ))}
                            </Form.Select></td>
                        <td>조회구분</td>
                        <td><RadioCheck onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <td colSpan={4} align="center">
                                <Button variant="primary" size="lg" onClick={handleClick}>조회</Button>
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

