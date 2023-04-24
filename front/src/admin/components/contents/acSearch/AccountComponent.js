import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";

class AccountComponent extends Component{
    render(){
        return(
            <div>
                <h1><FontAwesomeIcon icon={faSearch}/> 계좌목록 </h1>
                <ul>
                    <li>1. 전체계좌 출력 (최신순) </li>
                    <li>2. 검색조건 검색(항목 : 회원별, 계좌번호, 가입날짜 ) 후 선택조건 출력 </li>
                </ul>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan={2}>Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                <button></button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                SELECT * FROM account_tbl ORDER BY newDate DESC;
            </div>                
        )
    }
}
export default AccountComponent;