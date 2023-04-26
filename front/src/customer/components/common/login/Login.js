import React,{useState} from "react";
import {Typography} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Row, Col, Container, Stack, Button} from 'react-bootstrap';//npm install react-bootstrap
import { useNavigate } from "react-router-dom";
import ApiService from "../ApiService";


function Login() {
    const navigate = useNavigate();

    const [customer,setCustomer] = useState({
        id:"",
        pwd:""
    });

    const onChange = (e) => {
        // 이벤트를 부른 요소의 value와 name 키의 값 가져오기
        // value는 그 때의 텍스트
        const {value, name} = e.target;
    
        setCustomer({
          ...customer, 
          [name]: value 
        });
    };

    const login = (e)=> {
        e.preventDefault();

        const customerInfo = {
            id:customer.id,
            pwd:customer.pwd
        }


        ApiService.customerLogin(customerInfo)
            .then(res=> {
                console.log(customerInfo);
                console.log(res);
                navigate('res');
            })
        .catch(err => {
        console.log('customerLogin() 에러!!', err);
        });

        
    }


        return(
            <Container style={{
                fontSize : 25,
                fontWieght : 'bold',
                padding : 16,
                width : 600,
                align:"center",
            }}><br/><br/>
                <Typography variant="h2" textAlign="center" color="green">로그인</Typography><br/><br/>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>아이디</Form.Label>
                <Col sm={8}>
                <Form.Control
                    size="lg"
                    type="text"
                    id="id"
                    name="id" 
                    value={customer.id} 
                    onChange={onChange}
                    placeholder="아이디를 입력하세요"
                />
                </Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>비밀번호</Form.Label>
                <Col sm={8}>
                <Form.Control
                    size="lg"
                    type="password"
                    id="pwd"
                    name="pwd" 
                    value={customer.pwd}  
                    onChange={onChange}
                    placeholder="비밀번호를 입력하세요"
                />
                </Col>
                </Form.Group>
                <br/><br/>
                <Stack direction="horizontal" gap={2} className="col-md-3 mx-auto">
                    <Button variant="success" onClick={login}>로그인</Button>
                    <Button variant="outline-success">취소</Button>
                </Stack> 
            </Container>
        );

}

export default Login;