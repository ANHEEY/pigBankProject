import React from "react"
import AgreeAccordion from "../product-application/AgreeAccordion"
import {Form,Button, Row, Col,InputGroup, Container} from 'react-bootstrap'
import '../../../../resources/css/product/application-form.css'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function PdLoanApplication() {
    // 이동 navigate 설정
    const navigate = useNavigate();

    // radoi 박스 설정
    const [selectedPurpose, setSelectedPurpose] = useState('');
    const [textOption, setTextOption] = useState('');

    const handleRadioChange = (event) => {
        setSelectedPurpose(event.target.value); // 대출용도 기타사항 입력박스
    };

    const handleInputChange = (event) => {
        setTextOption(event.target.value); // 대출용도 기타사항 입력박스
    };

    // 동의 약간 설정
    const [isAgreed, setIsAgreed] = useState({
        isAgreed1 : "",
        isAgreed2 : "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isAgreed.isAgreed1 && isAgreed.isAgreed2) {
            // 가입 정보를 서버로 보내는 코드
            alert('신청이 완료되었습니다.');
            navigate('/customer/product/loan/pdLoan');
        }
        else {
            alert('이용약관에 동의해주세요!');
        }
    }

    const handleCheckedAgreement = (e) => {
        setIsAgreed(prevState => {
            return {
                ...prevState,
                isAgreed1: e.checkbox1,
                isAgreed2: e.checkbox2
            }
        });
    };

    return(
        <>
        <br />
        <br />
        <br />
        <Container className="applicaiton">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" type = "text/css"/>
            <h1>대출 신청</h1>
            <br/>
            <AgreeAccordion onAgree={handleCheckedAgreement}/>
            <br/>
            <Form className="formArea" onSubmit={handleSubmit}>
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
                        name="purpose"
                        value="가계자금" 
                        checked={selectedPurpose === '가계자금'} 
                        label="가계자금" 
                        onChange={handleRadioChange}
                        />
                        <Form.Check
                        type="radio"
                        name="purpose"
                        value="사업자금" 
                        checked={selectedPurpose === '사업자금'} 
                        label="사업자금"
                        onChange={handleRadioChange}
                        />
                        <Form.Check
                        type="radio"
                        name="purpose"
                        value="주택자금"
                        checked={selectedPurpose === '주택자금'} 
                        label="주택자금"
                        onChange={handleRadioChange}
                        /> 
                        <Form.Check 
                        type="radio" 
                        name="purpose"
                        value="기타" 
                        checked={selectedPurpose === '기타'} 
                        label="기타" 
                        onChange={handleRadioChange}
                         />
                        {selectedPurpose === '기타' && (
                            <Form.Control 
                            type="text" 
                            name="purpose"
                            placeholder="대출목적을 정확히 입력해주세요." 
                            value={textOption} 
                            onChange={handleInputChange}
                            />
                        )}
                    </Col>
                    </Form.Group>
                </fieldset>
                <br/>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">연간소득</Form.Label>
                    <Col sm="10">
                        <Form.Select>
                            <option value="1억원미만">1억원미만</option>{/* value에 고객 입출금계좌와 연결하기 */}
                            <option value="1억원이상 3억원미만">1억원이상 3억원미만</option>
                            <option value="3억원이상 5억원미만">3억원이상 5억원미만</option>
                            <option value="5억원이상">5억원이상</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">대출 금액</Form.Label>
                    <Col sm="10">
                        <InputGroup className="mb-3">
                            <Form.Control placeholder="대출금액을 입력하세요."  /> 
                            <InputGroup.Text>만원</InputGroup.Text>
                        </InputGroup>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">대출 기간</Form.Label>
                    <Col sm="10">
                        <Form.Select>
                            <option value="12개월(1년)">12개월(1년)</option>{/* value에 고객 입출금계좌와 연결하기 */}
                            <option value="24개월(2년)">24개월(2년)</option>
                            <option value="36개월(3년)">36개월(3년)</option>
                            <option value="48개월(4년)">48개월(4년)</option>
                            <option value="60개월(5년)">60개월(5년)</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">계좌선택</Form.Label>
                    <Col sm="10">
                        <Form.Select>
                            <option>입출금계좌를 선택하세요</option>
                            <option value="">710402-00-243513</option>{/* value에 고객 입출금계좌와 연결하기 */}
                        </Form.Select>
                    </Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">대출계좌 비밀번호</Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" size="4" placeholder="비밀번호 4자리를 입력하세요."  />
                    </Col>
                </Form.Group>
                <br/>
                <br/>
                <br/>
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