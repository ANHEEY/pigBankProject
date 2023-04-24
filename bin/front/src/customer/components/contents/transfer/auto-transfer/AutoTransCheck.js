import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import Checkbox from "../Checkbox";

function AutoTransCheck () {
    return (
        <Container>
            <hr />
            <div align='left'>
                <h4>조회결과 | </h4>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>선택</th>
                        <th>입금계좌</th>
                        <th>받는분</th>
                        <th>이체금액</th>
                        <th>이체기간</th>
                        <th>해지일자</th>
                        <th>이체일자</th>
                        <th>이체주기</th>
                        <th>받는통장 메모</th>
                        <th>내통장 메모</th>
                        <th>업무</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                          <Checkbox />  
                        </td>
                        <td>
                            2
                        </td>
                        <td>
                            3
                        </td>
                        <td>
                            4
                        </td>
                        <td>
                            5
                        </td>
                        <td>
                            6
                        </td>
                        <td>
                            7
                        </td>
                        <td>
                            8
                        </td>
                        <td>
                            9
                        </td>
                        <td>
                            10
                        </td>
                        <td>
                            <a href="/customer/transfer/auto_trans_detail"><Button variant="success" size="sm" >
                                자동이체수정   
                            </Button></a>
                        </td>
                    </tr>
                </tbody>
                
            </Table>
                <div align='center'>
                    <Button variant="primary" size="lg" >
                        자동이체 취소   
                    </Button>
                </div>
        </Container>
    )
}

export default AutoTransCheck