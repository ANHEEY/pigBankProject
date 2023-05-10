// 회원 정보 수정페이지(탈퇴도 가능) 비밀번호 인증하고 들어올 수 있음 
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
        address:"",
        hp:"",
        birthday:""
    });

    useEffect(()=>{
        customerDetail(window.localStorage.getItem("id"));
    },[]);

    

    const customerDetail=(id)=>{
        CustomerService.customerDetail(id)
            .then(res=>{
                const fullEmail = res.data.email.split("@");
                const fullBirth = new Date(res.data.birthday);
                const realBirth = `${fullBirth.getFullYear()}-${(fullBirth.getMonth() + 1).toString().padStart(2, "0")}-${fullBirth.getDate().toString().padStart(2, "0")}`;

                setCustomer({
                    ...res.data,
                    id:res.data.id,
                    pwd:"",
                    repwd:"",
                    name:res.data.name,
                    email1:fullEmail[0],
                    email2:fullEmail[1],
                    address:res.data.address,
                    hp:res.data.hp,
                    birthday:realBirth
                });
                console.log(res.data);
                console.log(customer);
            })
            .catch(err=>{
                console.log('customerDetail 에러!!!',err);
            });
    }

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
            address:customer.address,
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
                alert('회원정보 수정이 완료되었습니다! 다시 로그인 해주세요:)')
                console.log(customerInfo);
                localStorage.clear();
                navigate('/customer/*');
            })
            .catch(err => {
            console.log('customerUpdate() 에러!!', err);
        });

        
    }
    
    const deleteCus = (id)=>{
        CustomerService.customerDelete(id)
            .then(res=>{
                alert("탈퇴 신청이 완료되었습니다! 승인시 탈퇴 처리 됩니다");
                localStorage.clear();
                navigate('/customer/*');
            })
            .catch(err=>{
                console.log('customerDelete() 에러!!',err);
            })
    }

    const cxl = ()=>{
        navigate('/customer/*');
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
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>이메일</Form.Label>
                    <Col sm={3}><Form.Control type="text" placeholder="이메일을 입력하세요" 
                                name="email1" id="email1" value={customer.email1} onChange={onChange}/></Col>
                    @
                    <Col sm={3}><Form.Control type="text" id="email2" name="email2" value={customer.email2} onChange={onChange} /></Col>
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
                    <Col sm={10}><Form.Control type="text" placeholder="주소를 입력하세요" 
                                name="address" value={customer.address} onChange={onChange}/></Col>
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
                    <Button variant="dark" size="lg" onClick={()=>deleteCus(customer.id)}>회원탈퇴</Button>
                    <Button variant="outline-success" size="lg" onClick={cxl}>취소</Button>
            </Stack> 
            <br/> <br/> <br/> <br/> <br/>
        </Container>
    );
}

export default Mypage;