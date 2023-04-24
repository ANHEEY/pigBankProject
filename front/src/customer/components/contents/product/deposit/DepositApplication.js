import React from "react"
import AgreeAccordion from "../product-application/AgreeAccordion"
import {Form,Button, Row, Col,InputGroup} from 'react-bootstrap'
import '../../../../resources/css/product/application-form.css'

function DepositApplication(){
    return(
        <div className="applicaiton">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" type = "text/css"/>
            <h1>예금 상품 가입</h1>
            <br/>
            <AgreeAccordion/>
            <br/>
            <Form className="formArea">
                <div>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">상품명</Form.Label>
                        <Col sm="10">
                            <Form.Control readOnly defaultValue="이곳에 예금상품명 입력"  />    {/* defaultValue에 이전페이지에서 상품명 받아와 연결하기 */}
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">가입자명</Form.Label>
                        <Col sm="10">
                            <Form.Control readOnly defaultValue="이곳에 가입자명 입력"  />  {/* defaultValue에 고객아이디(이름)와 연결하기 */}
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">가입기간</Form.Label>
                        <Col sm="10">
                            <Form.Select>
                                <option>가입 기간을 선택하세요</option>
                                <option value="12">12개월</option>
                                <option value="24">24개월</option>
                                <option value="36">36개월</option>
                                <option value="48">48개월</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">가입금액</Form.Label>
                        <Col sm="10">
                            <InputGroup className="mb-3">
                                <InputGroup.Text>₩</InputGroup.Text>
                                <Form.Control placeholder="가입금액을 입력하세요."  /> 
                            </InputGroup>
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
                        <Form.Label column sm="2">계좌 비밀번호</Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" size="4" placeholder="비밀번호 4자리를 입력하세요."  />
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">만기 시 입금계좌</Form.Label>
                        <Col sm="10">
                            <Form.Select>
                                <option>출금계좌를 선택하세요</option>
                                <option value="">710402-00-243513</option>{/* value에 고객 입출금계좌와 연결하기 */}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <br/>
                </div>
                <div className="d-grid gap-2">
                    <Button style = {{background:'#9dc888' ,border:'#9dc888'}} size="lg" type="submit"> 가입하기 </Button>
                </div>
            </Form>
        </div>
    )
}
export default DepositApplication