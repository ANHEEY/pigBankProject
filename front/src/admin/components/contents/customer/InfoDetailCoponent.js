import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

import CustomerApiService from "./service/CustomerApiService";
import '../../../resources/css/customer/detail_customer.css'

import AccountListComponent from "./AccountListComponent";

function InfoDetailComponent() {
    // url에서 id값을 받아오는  useParams
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [customer, setCustomer] = useState(null);
    const [total, setTotal] = useState();
    const handleTotalAmountChange = (totalAmount) => {
        console.log('잔액:', totalAmount);
        setTotal(totalAmount);
        console.log("total : " + total);
    }

    // 데이터를 가져올때 useEffect 
    useEffect(() => {

        CustomerApiService.infoCustomer(id)
            .then(res => {
                console.log(res.data);
                setCustomer(res.data);
            })
            .catch(err => {
                console.log('infoDetail() 에러', err);
            });
    }, [id]);

    function updateCustomerState(id) {
        if (total === '0') {
            CustomerApiService.updateCustomerState(id)
                .then(res => {
                    setIsLoading(false);
                    alert('승인 처리했습니다.');
                    navigate(-1);
                })
                .catch(err => {
                    console.log("updateCustomerState 에러", err)
                    setIsLoading(false);
                })
        } else {
            alert("잔액이 존재하여 승인 불가능 합니다.");
        }
        if (isLoading) {
            return <div>로딩 중...</div>;
        }
    }
    function rejectCustomerState(id) {
        if (total !== 0) {
            alert("탈퇴요청을 거절하시겠습니까?");
            CustomerApiService.rejectCustomerState(id)
                .then(res => {
                    setIsLoading(false);
                    alert(' "탈퇴불가능(사유:잔액존재)" 변경 완료')
                    navigate(-1);
                })
                .catch(err => {
                    console.log("rejectCustomerState 에러", err)
                    setIsLoading(false);
                })
        }
        if (isLoading) {
            return <div>로딩즁@@@</div>
        }
    }

    /* '?' 을 붙이는 이유 = null값을 방지하기 위해 (Optional Chaining )*/
    return (
        <div className="component-div">
            <div className="admin-title">
                <FontAwesomeIcon icon={faUsers} /> 회원정보 상세페이지
            </div>
            <div className="admin-customer-detail">
                <table className="admin-customer-info">
                    <thead>
                        {customer?.cusState === '탈퇴승인' && (
                            <tr className="table-title">
                                <th colSpan={2}>탈퇴 고객 정보</th>
                            </tr>
                        )}
                        {customer?.cusState !== '탈퇴승인' && (
                            <tr className="table-title">
                                <th colSpan={2}>고객 정보</th>
                            </tr>
                        )}
                    </thead>
                    <tbody>
                        <tr>
                            <th>이름</th>
                            <td>{customer?.name}</td>
                        </tr>
                        <tr>
                            <th>아이디</th>
                            <td>{customer?.id}</td>
                        </tr>
                        <tr>
                            <th>생년월일</th>
                            <td>
                                {new Date(customer?.birthday).getFullYear()}년 &nbsp;
                                {new Date(customer?.birthday).getMonth() + 1}월 &nbsp;
                                {new Date(customer?.birthday).getDate()}일
                            </td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td>{customer?.email}</td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td>{customer?.address}</td>
                        </tr>
                        <tr>
                            <th>휴대폰번호</th>
                            <td>
                                <span>{customer?.hp}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>가입일</th>
                            <td>
                                {new Date(customer?.regDate).getFullYear()}년 &nbsp;
                                {new Date(customer?.regDate).getMonth() + 1}월 &nbsp;
                                {new Date(customer?.regDate).getDate()}일
                            </td>
                        </tr>
                        <tr>
                            <th>등급</th>
                            <td>
                                {customer?.grade === 'yellow' && (
                                    <span className='grade-span yellow'>YELLOW</span>
                                )}
                                {customer?.grade === 'red' && (
                                    <span className='grade-span red'>RED</span>
                                )}
                                {customer?.grade === 'black' && (
                                    <span className='grade-span black'>BLACK</span>
                                )}
                                {customer?.grade === 'gold' && (
                                    <span className='grade-span gold'>GOLD</span>
                                )}

                            </td>
                        </tr>
                        <tr>
                            <th>상태</th>
                            <td>
                                {customer?.cusState === '탈퇴요청' && (
                                    <div className="updateState">
                                        {customer?.cusState}
                                        <button onClick={() => updateCustomerState(id)}>탈퇴승인</button>
                                        <button onClick={() => rejectCustomerState(id)}>요청거절</button>
                                    </div>
                                )}
                                {customer?.cusState !== '탈퇴요청' && (
                                    <div className="updateState">
                                        {customer?.cusState}
                                    </div>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <AccountListComponent onTotalAmountChange={handleTotalAmountChange} />
            </div>
        </div>
    )
}
export default InfoDetailComponent;