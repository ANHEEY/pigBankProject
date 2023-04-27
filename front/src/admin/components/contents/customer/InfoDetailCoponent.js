import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers} from "@fortawesome/free-solid-svg-icons";

import CustomerApiService from "./service/CustomerApiService";
import '../../../resources/css/customer/detail_customer.css'

import AccountListComponent from "./AccountListComponent";

function InfoDetailComponent(){
    // url에서 id값을 받아오는  useParams
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    
    // 데이터를 가져올때 useEffect 
    useEffect(() => {
        CustomerApiService.infoCustomer(id)
        .then(res => {
            setCustomer(res.data);
        })
        .catch(err => {
            console.log('infoDetail() 에러', err);
        });
    },[id]);
    /* '?' 을 붙이는 이유 = null값을 방지하기 위해 (Optional Chaining )*/
    return (
        <div className="component-div">
            <div className="admin-title">
                <FontAwesomeIcon icon={faUsers}/> 회원정보 상세페이지
            </div>
            <div className="admin-customer-detail">
                <table className="admin-customer-info">
                    <thead>
                        <tr className="table-title">
                            <th colSpan={2}>고객 정보</th>
                        </tr>
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
                            <td>{customer?.birthday}</td>
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
                            <td>{customer?.cusState}</td>
                        </tr>
                    </tbody>
                </table>
                <AccountListComponent/>
            </div>
        </div>
    )
}
export default InfoDetailComponent;