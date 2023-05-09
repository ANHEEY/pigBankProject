//회원가입 페이지
import React,{useState} from 'react';
import {Form,Row,Col,Container,Stack,Button} from 'react-bootstrap';
import { Typography} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerService from '../CustomerService';
import { useNavigate } from "react-router-dom";

function Join(){
    
    const navigate = useNavigate();
    const [id,setId]=useState('');

    const [customer,setCustomer] = useState({
        pwd:"",
        repwd:"",
        name:"",
        address:"",
        email1:"",
        email2:"",
        hp:"",
        birthday:""
    });

    const [duplication,setDuplication] = useState(false);

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

    const onChangeId = (e)=>{
        setId(e.target.value);
    }

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

    const handleCheckDuplicate = () => {
        CustomerService.duplicateId(id)
            .then(res=>{
                if(res.data === 1){
                    alert('중복인 아이디 입니다! 새로 입력해 주세요.');
                    setId("");
                }else{
                    alert('사용가능한 아이디입니다!');
                    setDuplication(true);
                }
            })
            .catch(err => {
                console.log('duplicateId() 에러!!', err);
            });      
    }

    const join = (e)=> {
        e.preventDefault();

        const customerInfo = {
            id:id,
            pwd:customer.pwd,
            name:customer.name,
            email:customer.email1+"@"+customer.email2,
            address:customer.address,
            hp:customer.hp,
            birthday:customer.birthday
        }
        console.log(duplication);
        if(!duplication){
            alert('아이디 중복확인 해주세요!');
            return false;
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
                alert('회원가입이 완료되었습니다! 이메일 인증 후 이용가능합니다.');
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
                                name="id" value={id} onChange={onChangeId}/></Col>
                    <Col sm={2}><Button variant="success" onClick={()=>handleCheckDuplicate(id)}>중복확인</Button></Col>
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
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>이메일</Form.Label>
                    <Col sm={3}><Form.Control type="text" placeholder="이메일을 입력하세요" 
                                name="email1" id="email1" value={customer.email1} onChange={onChange}/></Col>
                    @
                    <Col sm={3}><Form.Control type="text" name="email2" id="email2" value={customer.email2} onChange={onChange} /></Col>
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
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>주소</Form.Label>
                    <Col sm={10}><Form.Control type="text" placeholder="주소를 입력하세요" 
                                name="address" id="address" value={customer.address} onChange={onChange}/></Col>
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