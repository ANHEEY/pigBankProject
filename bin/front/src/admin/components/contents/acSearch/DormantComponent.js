import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Table from 'react-bootstrap/Table';

class DormantComponent extends Component{
    render(){
        return(
            <div className="component-div">
                <h1><FontAwesomeIcon icon={faSearch}/> 휴면계좌조회</h1>
                <ul>
                    <li>1. 휴면 계좌 전체 출력 </li>
                    <li>2. 버튼 클릭 시 휴면계좌 처리 </li>
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
                SELECT * <br/>
                FROM account_tbl<br/>
                WHERE acState IN ('휴면');<br/>

            </div>            
        )
    }
}
export default DormantComponent;