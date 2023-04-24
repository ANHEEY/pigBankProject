// 자동이체 조회
import React from "react";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import RadioCheck from "../RadioCheck";
import Button from 'react-bootstrap/Button';

function AutoTrans () {
    return (
        <div className="container">
            <hr />
            <Table striped="columns">
                <tbody>
                    <tr>
                        <td>계좌번호</td>
                        <td><Form.Select aria-label="Floating label select example">
                                <option value="1">000</option>
                                <option value="2">1111</option>
                            </Form.Select></td>
                        <td>조회구분</td>
                        <td><RadioCheck/></td>
                    </tr>
                    <tr>
                        <td colSpan={4} align="center">
                            <a href="/customer/transfer/auto_trans_check"><Button variant="primary" size="lg">조회</Button></a>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
export default AutoTrans;