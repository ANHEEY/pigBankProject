import React, { useState } from "react";
import AgreeAccordion from "../../product-application/AgreeAccordion";
import { Form, Button, Table, InputGroup } from "react-bootstrap";
import "../../../../../resources/css/product/application-form.css";
import { getId } from "../../../../helpers/axios_helper";
import PdAccApiService from "../PdAccApiService";
import { useNavigate } from "react-router-dom";

function FormSMS2() {
    
     const [id, setId] = useState(getId());  // 고객정보
     const [acPwd, setAcPwd] = useState(''); // 정보입력 비밀번호 입력, 네이버 SENS API사용 본인인증
   
     const navigate = useNavigate();
     // 약관 동의
    const [isAgreed, setIsAgreed] = useState({
        isAgreed1: "",
        isAgreed2: ""
    })

    const handleSubmit = (e) => {
        if(acPwd == "") {
            alert('비밀번호를 입력하세요!');
            return false;
        }
        e.preventDefault();
    
        const id = getId(); // getId() 함수를 호출하여 반환값을 id 변수에 저장
        const acInfo = {
          id: id, // id 변수를 사용하여 acInfo 객체를 생성
          acPwd: acPwd,
        };
    
        if (isAgreed.isAgreed1 && isAgreed.isAgreed2) {
            PdAccApiService.pdAccAdd(acInfo)
            .then((res) => {
                alert("<꿀꿀 자유입출금> 통장이 계설되었습니다.");
                window.location.href = "/*"; // 네비게이트로 바꾸기
            })
            .catch((err) => {
                console.log("pdAccAdd(acInfo) Error!!", err);
              });
          } else {
            alert("이용약관에 동의 후 가입이 가능합니다.");
          }
      };

    const handleCheckedAgreement = (e) => {
        setIsAgreed((prevState) => {
          return {
            ...prevState,
            isAgreed1:e.checkbox1,
            isAgreed2:e.checkbox2
          };
        });
      };

    const onChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "id":
                setId(value);
                break;
            case "acPwd":
                setAcPwd(value);
                break;
            case "inputValue":
                setInputValue(value);
                break;
            default:
                break;
        }
    };

    const [inputValue, setInputValue] = useState(''); // 입력된 값 상태 관리

    const handleInputChange = (e) => {
        setInputValue(e.target.value); // 입력된 값 업데이트
      };

      const handleVerification = () => {
       
        // sessionStorage에 담은 res.data => randomNumber 불러오기
        const randomNumber = sessionStorage.getItem("randomNumber");

        console.log('inputValue: ', inputValue)
        console.log('randomNumber: ', randomNumber)

        if (inputValue === randomNumber) { // 입력된 값과 서버에서 받은 값 비교
            console.log('인증 성공!');
            alert('본인인증에 완료하셨습니다.');
            navigate('/customer/product/account/sms_api/FormSMS3');
        } else {
            console.log('인증 실패!');
            alert('본인인증에 실패하셨습니다. 다시 인증하세요.');
            navigate('/customer/product/account/sms_api/FormSMS');
        }
      };

    return (

        <div className="applicaiton container">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" type = "text/css"/>
            <h1>입출금 상품 가입</h1>
            <br/>
            <AgreeAccordion  onAgree={handleCheckedAgreement} />
            <br/>
            <Form className="formArea">
            <Table>
                    <thead>
                        <tr>
                            <th colSpan={4}>￭ CUSTOMER INFO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th  style={{width:"160px"}}>신청자</th>
                            <td colSpan={4}>
                                <InputGroup className="mb-3">
                                    <Form.Control placeholder="신청자" name="id" onChange={(e) => onChange(e)} readOnly value={id} />       
                                    <Button variant="outline-secondary" id="btn-Form">본인인증</Button> {/* onClick => window.open으로 본인인증 */}
                                </InputGroup><br />
                            </td>
                        </tr>
                        <tr>
                            <th colSpan={2}></th>
                        </tr>
                        <tr>
                            <th colSpan={2} style={{ fontSize:"16px"}}>인증번호</th>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{textAlign:"left"}}>
                                <InputGroup className="mb-3" style={{width:"40%", justifyContent:"right"}}>
                                    <Form.Control placeholder="인증번호를 입력하세요." name="inputValue" value={inputValue} onChange={handleInputChange}/>       
                                    <Button variant="outline-dark" onClick={handleVerification}>인증번호확인</Button> {/* onClick => window.open으로 본인인증 */}
                                </InputGroup>
                                <p style={{fontSize:"12px"}}>
                                    <span style={{color:"red"}}><b>※ 인증번호 문자를 못 받으셨나요?</b></span><br />
                                    ⬞ 입력하신 인증정보가 일치하지 않을 경우, 인증번호 문자는 발송되지 않습니다.<br />
                                    ⬞ 인증번호가 문자로 수신되지 않을 경우 정확한 정보로 재시도해 주시기 바랍니다.<br />
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <th colSpan={2}></th>
                        </tr>
                    </tbody>
                </Table>
                <br/>
                <Table>
                    <thead>
                        <tr>
                            <th colSpan={4}>￭ PRODUCT INFO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th style={{width:"160px"}}>상품명</th>
                            <td colSpan={4}>
                                <Form.Control readOnly defaultValue="꿀꿀 자유입출금"  />
                            </td>
                        </tr>
                        <tr>
                            <th>계좌 비밀번호</th>
                            <td>
                                <Form.Control 
                                    placeholder="비밀번호 4자리 입력"
                                    type="password"
                                    name="acPwd"
                                    maxLength={4}
                                    value={acPwd}
                                    onChange={(e) => onChange(e)}
                                    variant="outlined"
                                    color="neutral"
                                    size="md"  />
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <br/>
                <h5>계좌 이체한도 안내 </h5>
                <div className="limitInfo">
                    <p><b>1일 이체한도 </b> 2,000,000원</p>
                    <p><b>1회 이체한도 </b> 2,000,000원</p>
                </div>
                <div className="d-grid gap-2">
                    <Button style = {{background:'#9dc888',border:'#9dc888'}} size="lg" onClick={handleSubmit} disabled> 가입하기 </Button>
                </div>
            </Form>
        </div>

   )
}
export default FormSMS2;