// 공지사항
import React from "react";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Container } from "react-bootstrap";

function CsBoard () {
    return (
        <Container>
            <h3>공지사항</h3>
            <hr/>
            <Table align='center'>
            <thead>
                <tr>
                    <th>검색</th>
                    <td>
                        <Form.Control
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    /></td>
                </tr>
            </thead>
            <br />
            <br />
            <hr />
            <tbody align='center'>
                <tr>
                    <th>No.</th>
                    <th>제목</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td><a href="/customer/cscenter/cs_board_detail">청년전용 버팀목 전세자금대출</a></td>
                </tr>
            </tbody>
            </Table>
        </Container>
    )
}
export default CsBoard;