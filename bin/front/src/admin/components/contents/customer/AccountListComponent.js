import { Component } from "react";

import CustomerApiService from "./service/CustomerApiService";
import '../../../resources/css/customer/detail_customer.css'

export default class AccountListComponent extends Component{
    render(){
        return(
            <div className="component-div">
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
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                        </tr>
                    </tbody>
                </table>
            </div>   
        )
    }
}
                    