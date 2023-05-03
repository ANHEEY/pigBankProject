import React,{useState} from 'react';
import {Form,Row,Col,Container,Stack,Button} from 'react-bootstrap';
import { Typography} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerService from '../CustomerService';
import { useNavigate } from "react-router-dom";
//<script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&libraries=services"></script>


function Join(){
    
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

    const [postcode, setPostcode] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    const handlePostcode = () => {
        new window.daum.Postcode({
          oncomplete: (data) => {
            let addr = '';
            let extraAddr = '';
            if (data.userSelectedType === 'R') {
              addr = data.roadAddress;
            } else {
              addr = data.jibunAddress;
            }
            if (data.userSelectedType === 'R') {
              if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                extraAddr += data.bname;
              }
              if (data.buildingName !== '' && data.apartment === 'Y') {
                extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
              }
              if (extraAddr !== '') {
                extraAddr = ' (' + extraAddr + ')';
              }
              setAddress2(extraAddr);
            } else {
                setAddress2('');
            }
    
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            setPostcode(data.zonecode);
            setAddress1(addr);
            customer.address2.focus();
          },
        }).open();
      };

    const setDomain = (e)=>{
        setCustomer({ ...customer, email2: e.target.value });
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

    const validateId = (id) => {
        const regex = /^[a-z0-9]{8,15}$/;
        return regex.test(id);
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

    const join = (e)=> {
        e.preventDefault();

        const customerInfo = {
            id:customer.id,
            pwd:customer.pwd,
            name:customer.name,
            email:customer.email1+"@"+customer.email2,
            address:customer.postcode+"/"+customer.address1+"/"+customer.address2,
            hp:customer.hp,
            birthday:customer.birthday
        }


        if(!customerInfo.id){
            alert("아이디를 입력하세요!")
            return false;
        }
        else if (!validateId(customerInfo.id)) {
            alert("아이디는 소문자, 숫자 조합 8자 이상 15자 이하이어야 합니다!");
            return false;
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





        CustomerService.customerJoin(customerInfo)
            .then(res=> {
                console.log(customerInfo);
                navigate('/customer/*');
            })
        .catch(err => {
        console.log('customerJoin() 에러!!', err);
        });        
    }
    
    return( 
        <Container style={{
            width : 1000,
        }}>
            <Form>
            <br/><br/>
                <Typography variant="h2" textAlign="center" color="green">회원가입</Typography><br/><br/>
                <Form.Group as={Row} className="mb-3" controlId="formGroupId">
                    <Form.Label column sm={2}>아이디</Form.Label>
                    <Col sm={8}><Form.Control type="text" placeholder="소문자, 숫자 조합 8자 이상 15자 이하" 
                                name="id" value={customer.id} onChange={onChange}/></Col>
                    <Col sm={2}><Button variant="success">중복확인</Button></Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} className="mb-3" controlId="formGroupPassword">
                    <Form.Label column sm={2}>비밀번호</Form.Label>
                    <Col sm={10}><Form.Control type="password" placeholder="소문자, 숫자 조합 12자 이상 20자 이하"
                                name="pwd" value={customer.pwd}  onChange={onChange} /></Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} className="mb-3" controlId="formGroupRePassword">
                    <Form.Label column sm={2}>확인 비밀번호</Form.Label>
                    <Col sm={10}><Form.Control type="password" placeholder="비밀번호와 동일하게 입력해주세요"
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
                    <Form.Select aria-label="Default select example" onChange={setDomain}>
                        <option value="">직접입력</option>
                        <option value="naver.com">naver.com</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="nate.com">nate.com</option>
                        <option value="hanmail.net">hanmail.net</option>
                    </Form.Select></Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row} className="mb-3" controlId="formGroupAddress">
                    <Form.Label column sm={2}>주소</Form.Label>
                    <Col sm={6}><Form.Control type="text" placeholder="우편번호" 
                                name="postcode" value={customer.postcode} onChange={onChange}/></Col>
                    <Col sm={4}><Button variant="success" onClick={()=>handlePostcode}>우편번호찾기</Button></Col>
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
            <Stack direction="horizontal" gap={2} className="col-md-2 mx-auto">
                    <Button variant="success" onClick={join}>회원가입</Button>
                    <Button variant="outline-success">취소</Button>
            </Stack> 
        </Container>
    );
}
//// type="submit"
export default Join;