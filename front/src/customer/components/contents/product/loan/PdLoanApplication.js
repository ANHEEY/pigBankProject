import React from "react"
import AgreeAccordion from "../product-application/AgreeAccordion"
import {Form,Button, Row, Col,InputGroup, Container, FormControl } from 'react-bootstrap'
import '../../../../resources/css/product/application-form.css'
import { useState } from 'react';

function PdLoanApplication() {
    const [selectedOption, setSelectedOption] = useState('');

    return(
        <>
        <br />
        <br />
        <br />
        <Container className="applicaiton">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" type = "text/css"/>
            <h1>대출 신청</h1>
            <br/>
            <AgreeAccordion/>
            <br/>
            <Form className="formArea">
                <br/>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">대출상품명</Form.Label>
                    <Col sm="10">
                        <Form.Control readOnly defaultValue="튼튼대출"  />
                    </Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">신청자명</Form.Label>
                    <Col sm="10">
                        <Form.Control readOnly defaultValue="홍길동"  />
                    </Col>
                </Form.Group>
                <br/>
                <fieldset>
                    <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={2}>
                        대출용도
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Check
                        type="radio"
                        label="가계자금"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        />
                        <Form.Check
                        type="radio"
                        label="사업자금"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        />
                        <Form.Check
                        type="radio"
                        label="주택자금"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios3"
                        /> 
                        <Form.Check 
                        type="radio" 
                        value="option3" 
                        checked={selectedOption === 'option3'} 
                        label="Other" 
                        />
                        {selectedOption === 'option3' && (
                        <FormControl 
                            type="text" 
                            placeholder="Enter text here" 
                            value={selectedOption} 
                        />
                        )}  
                    </Col>

                    
                    </Form.Group>
                </fieldset>
                <br/>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">계좌 비밀번호</Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" size="4" placeholder="비밀번호 4자리를 입력하세요."  />
                    </Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">출금계좌</Form.Label>
                    <Col sm="10">
                        <Form.Select>
                            <option>출금계좌를 선택하세요</option>
                            <option value="">710402-00-243513</option>{/* value에 고객 입출금계좌와 연결하기 */}
                        </Form.Select>
                    </Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">대출 금액</Form.Label>
                    <Col sm="10">
                        <InputGroup className="mb-3">
                            <InputGroup.Text>₩</InputGroup.Text>
                            <Form.Control placeholder="가입금액을 입력하세요."  /> 
                        </InputGroup>
                    </Col>
                </Form.Group>
                <br/>
                <h5>계좌 이체한도 안내 </h5>
                <div className="limitInfo">
                    <p><b>1일 이체한도 </b> 10,000,000원</p>
                    <p><b>1회 이체한도 </b> 10,000,000원</p>
                </div>
                <div className="d-grid gap-2">
                    <Button type="submit" style = {{background:'#9dc888',border:'#9dc888'}} size="lg" > 가입하기 </Button>
                </div>
            </Form>
        </Container>
        <br />
        <br />
        <br />
        </>
    )
}
export default PdLoanApplication;