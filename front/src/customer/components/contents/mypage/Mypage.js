// 내정보
import React,{useState,useEffect} from 'react';
import {Form,Row,Col,Container,Stack,Button} from 'react-bootstrap';
import { Typography} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import CustomerService from '../../common/CustomerService';

function Mypage(){

    const navigate = useNavigate();

    const [customer,setCustomer] = useState({
        id:"",
        pwd:"",
        repwd:"",
        name:"",
        email1:"",
        email2:"",
        postcode:"",
        address1:"",
        address2:"",
        hp:"",
        birthday:""
    });

    useEffect(()=>{
        customerDetail(window.localStorage.getItem("id"));
    },[]);

    const customerDetail=(id)=>{
        CustomerService.customerDetail(id)
            .then(res=>{
                setCustomer(res.data);
            })
            .catch(err=>{
                console.log('customerDetail 에러!!!',err);
            });
    }


    const onChange = (e) => {
        // 이벤트를 부른 요소의 value와 name 키의 값 가져오기
        // value는 그 때의 텍스트
        const {value, name} = e.target;
    
        setCustomer({
            ...customer, 
            [name]: value 
        });
    };

    const validatePassword = (password) => {
        const regex = /^[a-z0-9]{12,20}$/;
        return regex.test(password);
    };
      
    const validateName = (name) => {
        const regex = /^[가-힣]{2,5}$/;
        return regex.test(name);
    };

    const validateEmail=(email)=>{
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

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

        if(!customerInfo.pwd){
            alert("비밀번호를 입력하세요!")
            return false;
        }
        else if (!validatePassword(customerInfo.pwd)) {
            alert("비밀번호는 소문자, 숫자 조합 12자 이상 20자 이하이어야 합니다!");
            return false;
        }

        if(!customer.repwd){
            alert("확인 비밀번호를 입력하세요!")
            return false;
        }

        if (customer.pwd !== customer.repwd){
            alert("비밀번호와 확인 비밀번호는 일치해야합니다!");
            return false;
        }
          
        if(!customerInfo.name){
            alert("이름을 입력하세요!");
            return false;
        }
        else if (!validateName(customerInfo.name)) {
            alert("이름은 한글 2자 이상 5자 이하이어야 합니다!");
            return false;
        }

        if(!customer.email1){
            alert("이메일을 입력하세요!");
            return false;
        }
        else if(!customer.email2){
            alert("이메일 도메인을 입력하세요!")
            return false;
        }
        else if(!validateEmail(customerInfo.email)){
            alert("이메일의 형식에 맞게 입력하세요!");
            return false;
        }

        if(!customerInfo.address){
            alert("주소를 입력하세요!");
            return false;
        }

        if(!customerInfo.hp){
            alert("핸드폰 번호를 입력하세요!");
            return false;
        }

        if(!customerInfo.birthday){
            alert("생일을 입력하세요!");
            return false;
        }

        CustomerService.customerUpdate(customerInfo)
            .then(res=> {
                console.log(customerInfo);
                navigate('/customer/*');
            })
            .catch(err => {
            console.log('customerUpdate() 에러!!', err);
        });

        
    }
    
    const deleteCus = (id)=>{
        CustomerService.customerDelete(id)
            .then(res=>{
                alert("회원 탈퇴 신청이 완료되었습니다!!!");
                navigate('');
            })
            .catch(err=>{
                console.log('customerDelete() 에러!!',err);
            })
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
                    <Col sm={10}><Form.Control type="text" name="id" defaultValue={customer.id} readOnly/></Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} className="mb-3" controlId="formGroupPassword">
                    <Form.Label column sm={2}>비밀번호</Form.Label>
                    <Col sm={10}><Form.Control type="password" placeholder="소문자, 숫자 조합 12자 이상 20자 이하"
                                name="pwd" value=""  onChange={onChange} /></Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} className="mb-3" controlId="formGroupRePassword">
                    <Form.Label column sm={2}>비밀번호 확인</Form.Label>
                    <Col sm={10}><Form.Control type="password" placeholder="소문자, 숫자 조합 12자 이상 20자 이하"
                                name="repwd" value=""  onChange={onChange} /></Col>
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
                    <Button variant="success" size="lg" onClick={()=>update}>회원수정</Button>
                    <Button variant="dark" size="lg" onClick={()=>deleteCus(customer.id)}>회원탈퇴</Button>
                    <Button variant="outline-success" size="lg">취소</Button>
            </Stack> 
            <br/> <br/> <br/> <br/> <br/>
        </Container>
    );
}

export default Mypage;