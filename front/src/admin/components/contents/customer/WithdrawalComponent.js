import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import '../../../resources/css/customer/list_customer.css'

class WithdrawalComponent extends Component{
    render(){
        return(
            <div className="component-div">

                <div className="admin-title">
                    <FontAwesomeIcon icon={faUsers}/> 탈퇴요청목록
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
                                <th colSpan={6}><br/>
                                    <br/>
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
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <Link to = "detail">
                                        <button className="customerinfoBtn">정보보기</button>
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <Link to = "detail">
                                        <button className="customerinfoBtn">정보보기</button>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>            
        )
    }
}
export default WithdrawalComponent;