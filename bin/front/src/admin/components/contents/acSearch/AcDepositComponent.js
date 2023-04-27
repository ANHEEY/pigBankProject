import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Table from 'react-bootstrap/Table';

class AcDepositComponent extends Component{
    render(){
        return(
            <div className="component-div">
                <h1><FontAwesomeIcon icon={faSearch}/> 이체내역</h1>
                <ul>
                    <li>1. 이체내역 출력 (당일날짜기준) </li>
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
                SELECT * FROM transfer_tbl ORDER BY t_num DESC;
            </div>            
        )
    }
}
export default AcDepositComponent;