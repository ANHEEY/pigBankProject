import React,{useState} from "react";
import {Typography} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Row, Col, Container, Stack, Button} from 'react-bootstrap';//npm install react-bootstrap
import { useNavigate } from "react-router-dom";
import CustomerService from "../../common/CustomerService";


function CertificationPage() {
    const navigate = useNavigate();

    const [pwd,setPwd] = useState("");

    const onChange = (e) => {
        // 이벤트를 부른 요소의 value와 name 키의 값 가져오기
        // value는 그 때의 텍스트
        const {value, name} = e.target;
    
        setPwd({
          ...pwd, 
          [name]: value 
        });
    };

    const certification = (e)=> {
        e.preventDefault();


        CustomerService.customerCertification(pwd)
            .then(res=> {
                console.log(pwd);
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
                width : 800,
                align:"center",
            }}><br/><br/>
                <Typography variant="h2" textAlign="center" color="green">본인인증</Typography><br/><br/>
                <br/>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>비밀번호</Form.Label>
                <Col sm={8}>
                <Form.Control
                    size="lg"
                    type="password"
                    id="pwd"
                    name="pwd" 
                    value={pwd}
                    onChange={onChange}
                    placeholder="비밀번호를 입력하세요"
                />
                </Col>
                </Form.Group>
                <br/><br/>
                <Stack direction="horizontal" gap={2} className="col-md-5 mx-auto">
                    <Button variant="success" size="lg" onClick={certification}>회원인증</Button>
                    <Button variant="outline-success" size="lg">취소</Button>
                </Stack> 
            </Container>
        );

}

export default CertificationPage;