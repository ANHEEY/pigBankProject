// 자동이체등록
import React, {Component} from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ReactDatePicker from "../ReactDatePicker";


class AddAutoTrans extends Component {
    render(){
    return (
        <div className="container">
            <h3>출금정보</h3>
            <hr />
            <Table align="center">
                <tbody>
                    <tr>
                        <td>
                        <InputGroup.Text id="basic-addon1" >출금 계좌번호</InputGroup.Text>
                        </td>
                        <td>
                        <Form.Control
                            placeholder="-없이 입력해주세요"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            />  
                        </td>    
                        <td><Form.Select aria-label="Default select example">
                                    <option>계좌선택</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select> 
                             </td>
                             <td><Button variant="light">잔액조회</Button>{' '} </td>
                    </tr>
                    <tr>
                <       td>
                        <InputGroup.Text id="basic-addon1" >계좌 비밀번호</InputGroup.Text>
                        </td>
                        <td>
                        <Form.Control
                            placeholder="숫자 4자리"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            />  
                        </td>    
                    </tr>
                     
                </tbody>
                </Table>
                <br/>
                <hr/>
                <h3>입금정보</h3>
                <hr />
                <Table align="center">
                    <tbody>
                        <tr>
                            <td>
                            <InputGroup.Text id="basic-addon1" >입금 계좌번호</InputGroup.Text>
                            </td>
                            <td>
                            <Form.Control
                                placeholder="-없이 입력해주세요"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                />  
                            </td>    
                            <td><Form.Select aria-label="Default select example">
                                    <option>본인계좌조회</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select> 
                             </td>
                        </tr>
                        <tr>
                            <td>
                            <InputGroup.Text id="basic-addon1" >이체금액</InputGroup.Text>
                            </td>
                            <td>
                            <Form.Control
                                placeholder="원(KRW)"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                />  
                                
                            </td>    
                        </tr>
                        <tr>
                            <td>
                            <InputGroup.Text id="basic-addon1" >이체주기</InputGroup.Text>
                            </td>
                            <td>
                            <Form.Select aria-label="Floating label select example">
                                <option value="1">1개월</option>
                                <option value="2">2개월</option>
                                <option value="3">3개월</option>
                                <option value="4">4개월</option>
                                <option value="5">5개월</option>
                                <option value="6">6개월</option>
                                <option value="7">7개월</option>
                                <option value="8">8개월</option>
                                <option value="9">9개월</option>
                                <option value="10">10개월</option>
                                <option value="11">11개월</option>
                                <option value="12">12개월</option>
                            </Form.Select>  
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <InputGroup.Text id="basic-addon1" >이체시작일/종료일</InputGroup.Text>
                            </td>
                            <div>
                            <td>
                                <ReactDatePicker/>
                            </td>
                            <td>~</td>
                            <td>
                                <ReactDatePicker/>
                            </td>
                            </div>
                            <td><Button variant="light">12개월</Button>{' '} <Button variant="light">24개월</Button>{' '}</td>
                        </tr>
                        <tr>
                    <       td>
                            <InputGroup.Text id="basic-addon1" >받는통장 메모</InputGroup.Text>
                            </td>
                            <td>
                            <Form.Control
                                placeholder="받는 통장(계좌) 명의"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                />  
                            </td>    
                        </tr>   
                        <tr>
                    <       td>
                            <InputGroup.Text id="basic-addon1" >내통장 메모</InputGroup.Text>
                            </td>
                            <td>
                            <Form.Control
                                placeholder="(선택)"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                />  
                            </td>    
                        </tr>     
                    </tbody>
                </Table>
                <div className="mb-2" align='center'>
                    <a href="/customer/transfer/auto_trans_reConfirm"><Button variant="primary" size="lg">
                    다음
                    </Button></a>
                </div>
                <br/>
                
        </div>
    )
}
}
export default AddAutoTrans;