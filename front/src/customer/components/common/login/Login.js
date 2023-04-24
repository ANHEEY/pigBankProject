import React from "react";
import {Typography} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Row, Col, Container, Stack, Button} from 'react-bootstrap';//npm install react-bootstrap


function Login() {

        return(
            <Container style={{
                fontSize : 25,
                fontWieght : 'bold',
                padding : 16,
                width : 600,
                align:"center",
            }}><br/><br/>
                <Typography variant="h2" textAlign="center" color="green">로그인</Typography><br/><br/>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={3} htmlFor="id">아이디</Form.Label>
                <Col sm={8}>
                <Form.Control
                    size="lg"
                    type="text"
                    id="id"
                    placeholder="아이디를 입력하세요"
                />
                </Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={3} htmlFor="pwd">비밀번호</Form.Label>
                <Col sm={8}>
                <Form.Control
                    size="lg"
                    type="password"
                    id="pwd"
                    placeholder="비밀번호를 입력하세요"
                />
                </Col>
                </Form.Group>
                <br/><br/>
                <Stack direction="horizontal" gap={2} className="col-md-3 mx-auto">
                    <Button variant="success" type="submit">로그인</Button>
                    <Button variant="outline-success">취소</Button>
                </Stack> 
            </Container>
        );

}

export default Login;