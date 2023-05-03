import React , { useState, useEffect }  from "react"
import AgreeAccordion from "../product-application/AgreeAccordion" 
import {Form,Button, Row, Col,InputGroup} from 'react-bootstrap'
import '../../../../resources/css/product/application-form.css'
import PdSavingService from "./PdSavingService";

function SavingApplication(){

    // 약관 동의
    const [isAgreed, setIsAgreed] = useState({
        isAgreed1: "",
        isAgreed2: ""
    })

    const [isAutoTransfer, setIsAutoTransfer] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isAgreed.isAgreed1&&isAgreed.isAgreed2) {
            if(isAutoTransfer) {
                alert('적금 신청이 완료되었습니다. 자동이체 등록 페이지로 이동합니다.')
                window.location.href = '/customer/transfer/add_auto_trans';
            } else {
                alert('적금 신청이 완료되었습니다.');
                window.location.href = '/customer/product/pdSaving';
            }
        } else {
            alert('이용약관에 동의 후 가입 가능합니다.');
        }
    }

    //     if (isAutoTransfer) {
    //         if(isAgreed.isAgreed1&&isAgreed.isAgreed2) {
    //             alert('')
    //         } else {

    //         }
    //         // 자동이체 등록 페이지로 이동
    //         window.location.href = '/customer/transfer/add_auto_trans';
    //     } else {
    //         // 가입 완료 상품 리스트로 이동
    //         window.location.href = '/customer/product/pdSaving';
    //     }
    // }  

    const handleCheckedAgreement = (e) => {
        setIsAgreed(prevState => {
            return{
                ...prevState,
                isAgreed:e.checkbox1,
                isAgreed:e.checkbox2
            }
        });
    }
    
    // 적금상품명 불러오기
    const [detailInfo, setDetailInfo] = useState([]);

    useEffect(() => {
        console.log(window.localStorage.getItem("spdname"));
        PdSavingService.custSPdDetail(window.localStorage.getItem("spdname"))
        .then((res) => {
            setDetailInfo(res.data)
        })
        .catch((err) => {
            console.log(' PdSavingService.custSPdDetail Error!!', err);
        })
    }, []);

    return(
        <div className="applicaiton container">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" type = "text/css"/>
            <h1>적금 상품 가입</h1>
            <br/>
            <AgreeAccordion onAgree={handleCheckedAgreement}/>
            <br/>
            <Form  className="formArea" onSubmit={handleSubmit}>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">상품명</Form.Label>
                    <Col sm="10">
                        <Form.Control readOnly defaultValue={detailInfo.spdname}  />    {/* defaultValue에 이전페이지에서 상품명 받아와 연결하기 */}
                    </Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">가입자명</Form.Label>
                    <Col sm="10">
                        <Form.Control readOnly defaultValue="이곳에 가입자명 입력"  />  {/* defaultValue에 고객아이디(이름)와 연결하기 */}
                    </Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">가입기간</Form.Label>
                    <Col sm="10">
                        <Form.Select>
                            <option>가입 기간을 선택하세요</option>
                            <option value="12">12개월</option>
                            <option value="24">24개월</option>
                            <option value="36">36개월</option>
                        </Form.Select>
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
                    <Form.Label column sm="2">자동이체</Form.Label>
                    <Col sm="10">
                        <Form.Check id={`autoTransfer`} checked={isAutoTransfer} onChange={(e) => setIsAutoTransfer(e.target.checked)} />
                    </Col>
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button style={{ background: '#9dc888' ,border:'#9dc888'}} size="lg" type="submit" onClick={handleSubmit}> 가입하기 </Button>
                </div>
            </Form>
        </div>
    )
}
export default SavingApplication;