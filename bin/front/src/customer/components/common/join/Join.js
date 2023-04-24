import React from 'react';
import {Form,Row,Col,Container,Stack,Button} from 'react-bootstrap';
import { Typography} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';

function join(){
    return( 
        <Container style={{
            width : 1000,
        }}>
            <Form>
            <br/><br/>
                <Typography variant="h2" textAlign="center" color="green">회원가입</Typography><br/><br/>
                <Form.Group as={Row} className="mb-3" controlId="formGroupId">
                    <Form.Label column sm={2}>아이디</Form.Label>
                    <Col sm={8}><Form.Control type="text" placeholder="소문자, 숫자 조합 8자 이상 15자 이하" /></Col>
                    <Col sm={2}><Button variant="success">중복확인</Button></Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} className="mb-3" controlId="formGroupPassword">
                    <Form.Label column sm={2}>비밀번호</Form.Label>
                    <Col sm={10}><Form.Control type="password" placeholder="소문자, 숫자 조합 12자 이상 20자 이하" /></Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} className="mb-3" controlId="formGroupRePassword">
                    <Form.Label column sm={2}>비밀번호 확인</Form.Label>
                    <Col sm={10}><Form.Control type="password" placeholder="소문자, 숫자 조합 12자 이상 20자 이하" /></Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} className="mb-3" controlId="formGroupName">
                    <Form.Label column sm={2}>이름</Form.Label>
                    <Col sm={10}><Form.Control type="text" placeholder="이름을 입력하세요" /></Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} className="mb-3" controlId="formGroupEmail">
                    <Form.Label column sm={2}>이메일</Form.Label>
                    <Col sm={3}><Form.Control type="text" placeholder="이메일을 입력하세요" /></Col>
                    @
                    <Col sm={3}><Form.Control type="text" /></Col>
                    <Col sm={3}>
                    <Form.Select aria-label="Default select example">
                        <option>직접입력</option>
                        <option value="1">naver.com</option>
                        <option value="2">gmail.com</option>
                        <option value="3">nate.com</option>
                        <option value="4">hanmail.net</option>
                    </Form.Select></Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} className="mb-3" controlId="formGroupAddress">
                    <Form.Label column sm={2}>주소</Form.Label>
                    <Col sm={6}><Form.Control type="text" placeholder="우편번호" /></Col>
                    <Col sm={4}><Button variant="success">우편번호찾기</Button></Col>
                    <br/><br/>
                    <Form.Label column sm={2}>기본주소</Form.Label>
                    <Col sm={10}><Form.Control type="text" placeholder="기본주소" /></Col>
                    <br/><br/>
                    <Form.Label column sm={2}>상세주소</Form.Label>
                    <Col sm={10}><Form.Control type="text" placeholder="상세주소" /></Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} className="mb-3" controlId="formGroupPhone">
                    <Form.Label column sm={2}>핸드폰 번호</Form.Label>
                    <Col sm={10}><Form.Control type="text" placeholder="핸드폰 번호(-제외)를 입력하세요" /></Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} className="mb-3" controlId="formGroupBirthday">
                    <Form.Label column sm={2}>생년월일</Form.Label>
                    <Col sm={10}><Form.Control type="date" /></Col>
                </Form.Group>
            </Form>
            <br/>
            <Stack direction="horizontal" gap={2} className="col-md-2 mx-auto">
                    <Button variant="success" type="submit">회원가입</Button>
                    <Button variant="outline-success">취소</Button>
            </Stack> 
        </Container>
    );
}

export default join;