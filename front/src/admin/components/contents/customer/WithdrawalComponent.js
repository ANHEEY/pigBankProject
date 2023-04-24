import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class WithdrawalComponent extends Component{
    render(){
        return(
            <div>
                <h1><FontAwesomeIcon icon={faUsers}/> 고객탈퇴요청목록</h1>
                <Link to  = "detail">이곳을 클릭하면 고객 상세페이지로 이동합니다.</Link>
                <ul>
                    <li>1. 탈퇴 요청한 회원 목록 출력 </li>
                    <li>2. 회원 정보 클릭 시 고객 상세정보 페이지 확인 ( 계좌번호, 예치금 , 대출, 펀드 확인할 수 있도록)</li>
                    <li>3. 계좌에 돈이 들어있을 시 탈퇴 요청 거절하기 , 돈 없을 시 탈퇴 승인 </li>
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
                    </tbody>
                </Table>
                SELECT id,name,email,address,hp,birthday,grade,regDate,cus_state<br/>
                FROM customer<br/>
                 WHERE cus_state = '탈퇴요청';

            </div>            
        )
    }
}
export default WithdrawalComponent;