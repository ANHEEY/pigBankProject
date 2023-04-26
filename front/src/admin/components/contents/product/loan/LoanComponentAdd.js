import React, { Component } from "react";
import { Container, Button, Form, Stack } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 css를 적용하기 위함
import { Typography } from "@mui/material";

class LoanComponentAdd extends Component{
    render(){
        return(
            <Container className="component-div">
                <Typography variant="h3" textAlign="center" color="black">대출상품등록</Typography><br/><br/>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>* 대출상품명</Form.Label>
                    <Form.Control required type="text" placeholder="대출상품명을 입력해주세요." />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>* 대출상품설명</Form.Label>
                    <Form.Control required as="textarea" rows={3} placeholder="대출상품설명을 간략히 적어주세요." />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>* 대출신청자격</Form.Label>
                    <Form.Select required>
                        <option>gold</option>
                        <option>black</option>
                        <option>red</option>
                        <option>yellow</option>
                    </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>* 대출가능 최장기간</Form.Label>
                    <Form.Control required type="text" placeholder="월" />
                    <Form.Text className="text-muted">
                        월 단위로 입력해주세요.
                    </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>* 대출가능 최고금액</Form.Label>
                    <Form.Control required type="number" placeholder="만원" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>* 대출이자</Form.Label>
                    <Form.Control required type="number" placeholder="%" />
                    <Form.Text className="text-muted">
                        소수점 둘째자리까지만 입력해주세요.
                    </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>* 대출상환방법</Form.Label>
                    <Form.Select required>
                        <option>원리금 균등분할상환</option>
                        <option>원금 균등분할상환</option>
                        <option>만기일시상환</option>
                    </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>* 중도상환 수수료율</Form.Label>
                    <Form.Control type="number" placeholder="%" />
                    <Form.Text className="text-muted">
                        소수점 둘째자리까지만 입력해주세요.
                    </Form.Text>
                    </Form.Group>

                    <Stack direction="horizontal" gap={2} className="col-md-2 mx-auto">
                    <Button variant="success" type="submit">Register</Button>
                    <Button variant="outline-secondary" type="reset">Cancel</Button>
                    </Stack>
                </Form>
            </Container>   
        )
    }
}

export default LoanComponentAdd;