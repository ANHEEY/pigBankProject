import React from "react";
import { Container, Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

function TransLimitAccept () {
    return(
        <Container>
        <h2 align="center">이체한도 변경 신청 완료</h2>
        <hr />
        <br />
        <br />
        <Table>
            <tbody>
                <tr>
                    <td>
                        <label>
                            <h4>변경 전</h4>
                        </label>
                        <td >
                            10,000,000
                        </td>
                    </td>
                    <td>
                        <label>
                            <h4>변경 후</h4>
                        </label>
                        <td >

                        </td>
                    </td>
                </tr>
            </tbody>
        </Table>
        <div align='center'>
        <a href="/customer/*" ><Button variant="secondary" size="lg" >홈으로</Button></a>
        </div>
        </Container>
    )
}

export default TransLimitAccept