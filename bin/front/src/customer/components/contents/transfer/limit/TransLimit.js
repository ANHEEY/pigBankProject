// 이체한도 조회
import React from "react";
import { Button, Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

function TransLimit () {
    return (
        <Container>
            <h3 align='left'>이체 한도 조회/변경</h3>
            <hr />
            <Table align='center'>
            <thead>
                <tr>
                    <th>계좌번호</th>
                    <td><Form.Select aria-label="Floating label select example">
                            <option value="1">000</option>
                            <option value="2">1111</option>
                        </Form.Select></td>
                </tr>
            </thead>
            <hr />
            <br />
            <br />
            <thead>
               
                <tr>
                    <th>  *  </th>
                    <th> 현재 이체한도  </th>
                    <th> 희망 이체한도  </th>
                </tr>
            </thead>
            <tbody>
               <tr>
                    <th>일일 최대한도</th>
                    <td>
                        <Form.Control
                        readOnly
                        value={'10,000,000'}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    /></td>
                    <td><Form.Control
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    /></td>
               </tr>
            </tbody>
            </Table>
            <div className="mb-2" align='center'>
                <a href="/customer/transfer/trans_limit_accept"><Button variant="primary" size="lg">
                변경
                </Button></a>{' '}
            </div>
        </Container>
    )
}
export default TransLimit;