import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import CustomerApiService from "./service/CustomerApiService";
import '../../../resources/css/customer/detail_customer.css'

export default function AccountListComponent(props) {
    // url에서 id값을 받아오는  useParams
    const { id } = useParams();
    const [account, setAccount] = useState([]);
    // 데이터를 가져올때 useEffect 
    useEffect(() => {
        CustomerApiService.listAccount(id)
            .then(res => {
                setAccount(res.data);
            })
            .catch(err => {
                console.log('listAccount() 에러', err);
            });
    }, [id]);

    const [totalAmount, setTotalAmount] = useState(0); // totalAmount 변수를 선언 (컴포넌트에서 호출하기 위해 밖으로 빼줌 ! )
    // 계좌 잔액의 합계
    useEffect(() => {
        const sum = account.reduce((acc, curr) => acc + curr.acBalance, 0);
        const total = sum.toLocaleString();
        setTotalAmount(total); // totalAmount 값을 할당
    }, [account]);

    // totalAmount 값이 변경될 때, 부모 컴포넌트에서 정의한 함수를 호출하여 데이터 전달
    useEffect(() => {
        props.onTotalAmountChange(totalAmount);
    }, [totalAmount, props]);


    // 계좌번호 => 문자열로 변환 후 slice
    function acNum(acNumber) {
        const acNum = acNumber.toString().slice(0, 3) + '-' + acNumber.toString().slice(3);
        return acNum;
    }

    // 잔액 화폐단위 나타내는 함수
    function formatBalance(value) {
        const formatter = new Intl.NumberFormat("ko-KR", {
            style: "currency",
            currency: "KRW",
        });
        return formatter.format(value);
    }
    return (
        <div>
            <table className="admin-customer-account">
                <thead>
                    <tr className="table-title">
                        <th colSpan={8}>고객 계좌 정보</th>
                    </tr>
                    <tr>
                        <th style={{ width: '10%' }}>은행명</th>
                        <th style={{ width: '15%' }}>계좌종류</th>
                        <th style={{ width: '15%' }}>계좌번호</th>
                        <th style={{ width: '15%' }}>잔액</th>
                        <th style={{ width: '15%' }}>개설일</th>
                        <th style={{ width: '15%', fontSize: '15px' }}>마지막거래일</th>
                        <th style={{ width: '15%' }}>일일최대한도</th>
                        <th style={{ width: '15%' }}>상태</th>
                    </tr>
                </thead>
                <tbody>
                    {account.map((account) => (
                        <tr key={account.acNumber}>
                            <td>{account.bankName}</td>
                            <td>{account.acType}</td>
                            <td>{acNum(account?.acNumber)}</td>
                            <td>
                                {formatBalance(account.acBalance)}
                            </td>
                            <td>
                                {new Date(account.newDate).getFullYear()}년
                                {new Date(account.newDate).getMonth() + 1}월
                                {new Date(account.newDate).getDate()}일
                            </td>
                            <td>{account.lastDate}</td>
                            <td>{account.trsfLimit}</td>
                            <td>{account.acState}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={4}>
                            <h5>총 잔액 합계 :</h5>
                        </td>
                        <td colSpan={4} className="customer_total_amount">
                            <h4><span>{totalAmount}</span>원</h4>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
