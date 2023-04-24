import React from "react";
import { Container, Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

function CsBoardDetail () {
    return(
        <Container>
            <h3>공지사항</h3>
            <hr />
            <br />
            <Table align="center">
                <thead>
                    <tr>
                        <th>*</th>
                        <th>청년전용 버팀목 전세자금 대출</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>content</td>
                    </tr>
                    <tr>
                        <td colSpan={4} align="center">
                            <a href="/customer/cscenter/cs_board"><Button variant="primary" >이전</Button></a>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default CsBoardDetail