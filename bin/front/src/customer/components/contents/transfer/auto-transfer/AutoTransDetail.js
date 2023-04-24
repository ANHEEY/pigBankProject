import React from "react";
import { Button, Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactDatePicker from "../ReactDatePicker";



function AutoTransDetail () {
    return(
        <Container>
            <h3 align='left'>자동이체 변경</h3>
            <hr />
            <Table align='center'>
            <tbody>
                <tr>
                    <td>
                        <Form.Label ><h4>출금계좌</h4></Form.Label>
                        <Form.Control
                        readOnly
                        value={'938002-00-266491'}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        />  
                    </td> 
                    
                </tr>
                <hr/>
                <tr>
                    <td>
                       <Row>
                            <Col>
                                <Form.Label ><h4>받는분</h4></Form.Label>
                                <Form.Control
                                    readOnly
                                    value={'이정재'}
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                /> 
                            </Col>
                            <Col>
                                <Form.Label ><h4>금액</h4></Form.Label>
                                <Form.Control
                                    readOnly
                                    value={'450,000원'}
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                /> 
                            </Col>
                        </Row>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Row>
                            <Col>
                                <Form.Label ><h4>이체기간</h4></Form.Label>
                                <div>
                                    <td>
                                        <ReactDatePicker/>
                                    </td>
                                    <td>~</td>
                                    <td>
                                        <ReactDatePicker/>
                                    </td>
                                </div>
                            </Col>
                            <Col>
                                <Form.Label ><h4>이체주기</h4></Form.Label>
                                <Form.Control
                                    readOnly
                                    value={'1개월'}
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                />  
                            </Col>
                        </Row>
                    </td>
                </tr>
                
            </tbody>
            </Table>
            <div className="mb-2" align='center'>
                <a href="/customer/transfer/auto_trans_check"><Button variant="primary" size="lg">
                변경
                </Button></a>{' '}
                <a href="/customer/transfer/auto_trans_check"><Button variant="secondary" size="lg">
                이전
                </Button></a>
            </div>
        </Container>
    )
}
export default AutoTransDetail;