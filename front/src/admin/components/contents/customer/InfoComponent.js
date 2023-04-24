import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers} from "@fortawesome/free-solid-svg-icons";

class InfoComponent extends Component{
    render(){
        return(
            <div>
                <h1><FontAwesomeIcon icon={faUsers}/> 고객정보</h1>
                <Link to = "detail">이곳을 클릭하면 고객 상세페이지로 이동합니다.</Link>
                <ul>
                    <li>1. 고객 전체 목록 출력</li>
                    <li>2. 고객 검색 조회 </li>
                </ul>
                <div>
                    이곳에 고객 검색 폼 생성하기  
                </div>
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
                SELECT id,name,email,address,hp,birthday,grade,regDate <br/>
                FROM customer<br/>
                ORDER BY regDate DESC; <br/>

            </div>            
        )
    }
}
export default InfoComponent;