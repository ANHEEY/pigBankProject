// 내정보
import React,{useState} from 'react';
import {Form,Row,Col,Container,Stack,Button} from 'react-bootstrap';
import { Typography} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function Mypage(props){

    const navigate = useNavigate();

    const [customer,setCustomer] = useState({
        id:props.id,
        pwd:"",
        repwd:"",
        name:props.name,
        email1:props.email1,
        email2:props.email2,
        postcode:props.postcode,
        address1:props.address1,
        address2:props.address2,
        hp:props.hp,
        birthday:props.birthday
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

    const update = (e)=> {
        e.preventDefault();

        const customerInfo = {
            id:customer.id,
            pwd:customer.pwd,
            name:customer.name,
            email:customer.email1+"@"+customer.email2,
            address:customer.postcode+customer.address1+customer.address2,
            hp:customer.hp,
            birthday:customer.birthday
        }

        // CustomerService.customerJoin(customerInfo)
        //     .then(res=> {
        //         console.log(customerInfo);
        //         navigate('/customer/*');
        //     })
        // .catch(err => {
        // console.log('customerJoin() 에러!!', err);
        // });

        
    }
    

    return( 
        <Container style={{
            width : 1000,
        }}>
             <br/> <br/>
            <Form>
            <br/><br/>
                <Typography variant="h2" textAlign="center" color="green">회원 정보 수정</Typography><br/><br/>
                <Form.Group as={Row} className="mb-3" controlId="formGroupId">
                    <Form.Label column sm={2}>아이디</Form.Label>
                    <Col sm={10}><Form.Control type="text" placeholder="소문자, 숫자 조합 8자 이상 15자 이하" 
                                name="id" defaultValue={customer.id} /></Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} className="mb-3" controlId="formGroupPassword">
                    <Form.Label column sm={2}>비밀번호</Form.Label>
                    <Col sm={10}><Form.Control type="password" placeholder="소문자, 숫자 조합 12자 이상 20자 이하"
                                name="pwd" value={customer.pwd}  onChange={onChange} /></Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} className="mb-3" controlId="formGroupRePassword">
                    <Form.Label column sm={2}>비밀번호 확인</Form.Label>
                    <Col sm={10}><Form.Control type="password" placeholder="소문자, 숫자 조합 12자 이상 20자 이하"
                                name="repwd" value={customer.repwd}  onChange={onChange} /></Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} className="mb-3" controlId="formGroupName">
                    <Form.Label column sm={2}>이름</Form.Label>
                    <Col sm={10}><Form.Control type="text" placeholder="이름을 입력하세요" 
                                name="name" value={customer.name}  onChange={onChange}/></Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} className="mb-3" controlId="formGroupEmail">
                    <Form.Label column sm={2}>이메일</Form.Label>
                    <Col sm={3}><Form.Control type="text" placeholder="이메일을 입력하세요" 
                                name="email1" value={customer.email1} onChange={onChange}/></Col>
                    @
                    <Col sm={3}><Form.Control type="text" name="email2" value={customer.email2} onChange={onChange} /></Col>
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
                    <Col sm={6}><Form.Control type="text" placeholder="우편번호" 
                                name="postcode" value={customer.postcode} onChange={onChange}/></Col>
                    <Col sm={4}><Button variant="success">우편번호찾기</Button></Col>
                    <br/><br/>
                    <Form.Label column sm={2}>기본주소</Form.Label>
                    <Col sm={10}><Form.Control type="text" placeholder="기본주소"
                    name="address1" value={customer.address1} onChange={onChange} /></Col>
                    <br/><br/>
                    <Form.Label column sm={2}>상세주소</Form.Label>
                    <Col sm={10}><Form.Control type="text" placeholder="상세주소" 
                    name="address2" value={customer.address2} onChange={onChange}/></Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} className="mb-3" controlId="formGroupPhone">
                    <Form.Label column sm={2}>핸드폰 번호</Form.Label>
                    <Col sm={10}><Form.Control type="text" placeholder="핸드폰 번호(-제외)를 입력하세요" 
                                name="hp" value={customer.hp} onChange={onChange}/></Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} className="mb-3" controlId="formGroupBirthday">
                    <Form.Label column sm={2}>생년월일</Form.Label>
                    <Col sm={10}><Form.Control type="date" 
                                name="birthday" value={customer.birthday} onChange={onChange}/></Col>
                </Form.Group>
            </Form>
            <br/>
            <Stack direction="horizontal" gap={2} className="col-md-4 mx-auto">
                    <Button variant="success" size="lg" onClick={update}>회원수정</Button>
                    <Button variant="dark" size="lg" onClick={update}>회원탈퇴</Button>
                    <Button variant="outline-success" size="lg">취소</Button>
            </Stack> 
            <br/> <br/> <br/> <br/> <br/>
        </Container>
    );
}

export default Mypage;