import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers} from "@fortawesome/free-solid-svg-icons";

import CustomerApiService from "./service/CustomerApiService";
import '../../../resources/css/customer/detail_customer.css'

class InfoDetailComponent extends Component{
    render(){
        return(
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
                                <td>장*선</td>
                            </tr>
                            <tr>
                                <th>아이디</th>
                                <td>ha0******</td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>생년월일</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>주소</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>휴대폰번호</th>
                                <td>
                                    <span>010-****-0716</span>
                                </td>
                            </tr>
                            <tr>
                                <th>가입일</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>등급</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>상태</th>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="admin-customer-account">
                        <thead>
                            <tr className="table-title">
                                <th colSpan={8}>고객 계좌 정보</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>계좌은행명</th>
                                <th>계좌종류</th>
                                <th>계좌번호</th>
                                <th>계좌잔액</th>
                                <th>계좌개설일</th>
                                <th>계좌마지막거래날짜</th>
                                <th>일일최대한도</th>
                                <th>계좌상태</th>
                            </tr>
                            <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default InfoDetailComponent;