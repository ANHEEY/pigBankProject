import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers} from "@fortawesome/free-solid-svg-icons";

import CustomerApiService from "./service/CustomerApiService";
import '../../../resources/css/customer/list_customer.css'

class InfoComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            customer:[],
            message: null
        }
    }
    // 즉시 호출 함수
    componentDidMount(){
        this.listCustomer()
    }
    listCustomer = () =>{
        CustomerApiService.serviceListCustomer()
        .then(res =>{
            this.setState({
                customer : res.data
            })
        })
        .catch(err =>{
            console.log('listCustomer() 에러',err);
        });
    }

    render(){
        return(
            <div className="component-div">
                <div className="admin-title">
                    <FontAwesomeIcon icon={faUsers}/> 고객정보
                </div>
                <div>
                    <table className="admin-customer-list">
                        <thead>
                            <tr>
                                <th>아이디</th>
                                <th>이름</th>
                                <th>가입일</th>
                                <th>등급</th>
                                <th>상태</th>
                                <th></th>
                            </tr>
                            <tr>
                                <th colSpan="6"><br/>
                                    <select>
                                        <option value="">Select field</option>
                                        <option value="id">Id</option>
                                        <option value="title">Title</option>
                                        <option value="description">Description</option>
                                    </select> 
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.customer.map(customer =>
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.regDate}</td>
                                <td>{customer.grade}</td>
                                <td>{customer.cusState}</td>
                                <td>
                                    <Link to={`detail/${customer.id}`}>
                                        <button className="customerinfoBtn">정보보기</button>
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
}
export default InfoComponent;