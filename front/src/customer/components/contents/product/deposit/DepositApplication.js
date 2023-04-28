import React, { useState,useEffect } from "react"
import AgreeAccordion from "../product-application/AgreeAccordion"
import {Form,Button, Row, Col,InputGroup,Container} from 'react-bootstrap'
import '../../../../resources/css/product/application-form.css'
import { useNavigate } from "react-router-dom";
import PdDepositService from "./PdDepositService";

function DepositApplication(){
    const navigate = useNavigate();

    //동의 약관 설정
    const [isAgreed,setIsAgreed]=useState({
        isAgreed1:"",
        isAgreed2:"",
    })

    const handleSubmit=(e)=>{
        e.preventDefault();

        if(isAgreed.isAgreed1&&isAgreed.isAgreed2){
            alert('예금 신청이 완료되었습니다!');
            navigate('/customer/product/deposit/pdDeposit');
        }
        else{
            alert('이용약관에 동의 후 가입 가능합니다!');
        }
    }

    const handleCheckedAgreement=(e)=>{
        setIsAgreed(prevState=>{
            return{
                ...prevState,
                isAgreed1:e.checkbox1,
                isAgreed2:e.checkbox2
            }
        });
    }

    const [depositProduct, setDepositProduct] = useState({
        dpdName:"",
        dcontent:"",
        dperiod:"",
        dmin:"",
        dmax:"",
        drate:"",
        dcxlRate:""
    });

    useEffect(()=>{
        depositDetail();
    },[]);

    const depositDetail=() =>{
        PdDepositService.pdDepositDetailInfo(window.localStorage.getItem("dpdName"))
            .then(res=>{
                setDepositProduct(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log('depositPdDetail() Error!!!', err);
            });
    }    

    const productJoin=(dpdName)=>{
        
    }

    return(
        
        <Container className="applicaiton">
                    <br/><br/><br/><br/>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" type = "text/css"/>
            <h1>예금 상품 가입</h1>
            <br/>
            <AgreeAccordion onAgree={handleCheckedAgreement}/>
            <br/>
            <Form className="formArea" onSubmit={handleSubmit}>
                <div>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">상품명</Form.Label>
                        <Col sm="10">
                            <Form.Control readOnly value={depositProduct.dpdName} placeholder="이곳에 예금상품명 입력"/>
                              {/* defaultValue에 이전페이지에서 상품명 받아와 연결하기 */}
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">가입자명</Form.Label>
                        <Col sm="10">
                            <Form.Control placeholder="이곳에 가입자명 입력"  />  {/* readOnly value={id} */}
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">가입기간</Form.Label>
                        <Col sm="10">
                            {depositProduct.dperiod}개월
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">가입금액</Form.Label>
                        <Col sm="10">
                            <InputGroup className="mb-3">
                                <InputGroup.Text>₩</InputGroup.Text>
                                <Form.Control placeholder="가입금액을 입력하세요."  /> 
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">출금계좌</Form.Label>
                        <Col sm="10">
                            <Form.Select>
                                
                                <option>출금계좌를 선택하세요</option>
                                <option value="">710402-00-243513</option>{/* value에 고객 입출금계좌와 연결하기 */}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">계좌 비밀번호</Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" size="4" placeholder="비밀번호 4자리를 입력하세요."  />
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">만기 시 입금계좌</Form.Label>
                        <Col sm="10">
                            <Form.Select>
                                <option>출금계좌를 선택하세요</option>
                                <option value="">710402-00-243513</option>{/* value에 고객 입출금계좌와 연결하기 */}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <br/>
                </div>
                <div className="d-grid gap-2">
                    <Button style = {{background:'#9dc888' ,border:'#9dc888'}} size="lg" type="submit"> 가입하기 </Button>
                    {/* onClick={()=>productJoin(depositProduct.dpdName)} */}
                </div>
            </Form>
            <br/><br/><br/><br/>
        </Container>


    )
}
export default DepositApplication;