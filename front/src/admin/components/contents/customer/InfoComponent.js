import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers} from "@fortawesome/free-solid-svg-icons";

import CustomerApiService from "./service/CustomerApiService";
import '../../../resources/css/customer/list_customer.css'

function InfoComponent(){
    // useNavigate 
    const navigate = useNavigate();

    function handleDetailClick(id) {
        navigate(`detail/${id}`);
    }

    const [customer, setCustomer] = useState([]);
    // 데이터를 가져올때 useEffect 
    useEffect(() => {
        CustomerApiService.listCustomer()
        .then(res =>{
            setCustomer(res.data);
        })
        .catch(err =>{
            console.log('listCustomer() 에러',err);
        });
    }, []);

    return(
        <div className="component-div">
            <div className="admin-title">
                <FontAwesomeIcon icon={faUsers}/>  고객 목록
            </div>
            <div>
                <table className="admin-customer-list">
                    <thead>
                        <tr>
                            <th>아이디</th>
                            <th>이름</th>
                            <th>가입일</th>
                            <th>등급</th>
                            <th colSpan={2}>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customer.map(customer =>
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                                <td>
                                    {new Date(customer.regDate).getFullYear()}년 
                                    {new Date(customer.regDate).getMonth() + 1}월 
                                    {new Date(customer.regDate).getDate()}일    
                                </td>
                                <td>
                                    {customer.grade === 'yellow' && (
                                        <span className='grade-span yellow'>YELLOW</span>
                                    )}
                                    {customer.grade === 'red' && (
                                        <span className='grade-span red'>RED</span>
                                    )}
                                    {customer.grade === 'black' && (
                                        <span className='grade-span black'>BLACK</span>
                                    )}
                                    {customer.grade === 'gold' && (
                                        <span className='grade-span gold'>GOLD</span>
                                    )}
                                </td>
                                <td>{customer.cusState}</td>
                                <td>
                                    <Link to={`detail/${customer.id}`}>
                                    <button onClick={() => handleDetailClick(customer.id)} className="customerinfoBtn">detail</button>
                                    </Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>            
    )
}
export default InfoComponent;