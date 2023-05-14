//로그인 페이지
import React,{useState} from "react";
import {Typography} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Row, Col, Container, Stack, Button} from 'react-bootstrap';//npm install react-bootstrap
import { useNavigate } from "react-router-dom";
import { getAuthToken, request, setAuthToken,setId,getId } from '../../helpers/axios_helper';
import axios from 'axios';   // npm install axios

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
    //여기서 부터 추가
    const login = (e)=> {
        localStorage.clear();

        e.preventDefault();

        const customerInfo = {
            id:customer.id,
            pwd:customer.pwd
        }

        request(
            "POST",
            "/login",
            {
                id: customerInfo.id,
                pwd: customerInfo.pwd
            }).
            then((res) => {
                setAuthToken(res.data.token);
                setId(res.data.id);

                console.log(res.data.token);
                console.log(getAuthToken());
                console.log(res.data.id);
                console.log(getId());
                console.log(res.data.authority);
                console.log(res.data.enabled);
            
                axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;

                if(res.data.enabled === '1'){
                    if(res.data.authority === 'ROLE_USER'){
                        navigate('/customer/*');
                        alert(getId()+'님 환영합니다!');
                    }else{
                        navigate('/admin');
                        alert(getId()+'관리자님 환영합니다:)');
                    }
                }
                else{
                    alert('이메일 인증 후 로그인 가능합니다!!');
                    localStorage.clear();
                    axios.defaults.headers.common['Authorization'] = ``;
                    navigate('/customer/*');
                }

                
            })
            .catch((err) => {
                console.log('login() 에러!!',err)
                alert('로그인 실패! 다시 로그인해주세요!');
                localStorage.clear();
            }
        );

        
    }

    const cxl = (e)=>{
       e.preventDefault();
       navigate('/customer/*');
       
    }

        return(
            <Container style={{
                fontSize : 25,
                fontWieght : 'bold',
                padding : 16,
                width : 600,
                align:"center",
            }}><br/><br/>
                <Typography variant="h3" textAlign="center" color="green">로그인</Typography><br/><br/>
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
                <Stack direction="horizontal" gap={2} className="col-md-3 mx-auto" size="lg">
                    <Button variant="success" onClick={login}>로그인</Button>
                    <Button variant="outline-success" onClick={cxl}>취소</Button>
                </Stack> 
                <br/><br/><br/><br/><br/>
            </Container>
        );

}

export default Login;