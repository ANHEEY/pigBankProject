import React, { useState, useEffect}from "react"
import {Form,Button, Row, Col,InputGroup, Container} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import '../../../../resources/css/product/application-form.css'
import PdLoanService from './PdLoanService.js';
import AgreeAccordion from "../product-application/AgreeAccordion"

function PdLoanApplication() {
    // 전화면에서 받아온 상품이름
    let lpdName = window.localStorage.getItem("lpdName");
 
    const navigate = useNavigate();
    const [selectedPurpose, setSelectedPurpose] = useState('');
    // const [textOption, setTextOption] = useState(''); // 기타 text 입력값 설정
    const [selectedAccount, setSelectedAccount] = useState('');
    const [myAccounts, setMyAccounts] = useState([]); // 나의 계좌목록
    const [isAgreed, setIsAgreed] = useState({
        isAgreed1 : "",
        isAgreed2 : "",
    }); // 동의 약관 체크박스 설정

    const [inputs, setInputs] = useState({
        lpdName: lpdName,
        id: "",
        lpurpose: "",
        lincome: "",
        lprincipal: "",
        lperiod: "",
        acNumber: "",
        acPwd: "",
    }) // Input 값 설정

    useEffect(() => {
        // 계좌 조회 
        PdLoanService.fetchAccountList()
        .then(res => {
        console.log(res.data);
        setMyAccounts(res.data);
        })
        .catch(err => {
        console.log('fetchAccountList() Error!!', err);
        });
          
    }, []);

    // 기타를 누르고 값을 입력할 때
    // const handleInputChange = (event) => {
    //     setTextOption(event.target.value); // 대출용도 기타사항 입력박스
    // };

    // radio 박스 설정
    const handleRadioChange = (event) => {
        // if (event.target.value == '기타') {
        //     handleInputChange(event);
        //     console.log("handleRadioChange" + textOption)
        //     setSelectedPurpose(textOption);
        // }
        setSelectedPurpose(event.target.value); // 대출용도 선택 박스
        // setTextOption('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 동의 약관 설정     
        if(isAgreed.isAgreed1 && isAgreed.isAgreed2) {
            // 가입 정보를 서버로 보내는 코드
            let loanReq = {
                lpdName: inputs.lpdName,
                id: inputs.id,
                lpurpose: selectedPurpose,
                lincome: inputs.lincome,
                lprincipal: Number(inputs.lprincipal),
                lperiod: Number(inputs.lperiod),
                acNumber: Number(selectedAccount),
                acPwd: Number(inputs.acPwd)
            };
        
            console.log(loanReq);

            PdLoanService.addPdReqList(loanReq) 
                .then(res => {
                    alert("대출 신청이 완료되었습니다. 심사결과를 기다려주세요.")
                    console.log("대출신청성공");
                    navigate('/customer/product/loan/pdLoan');
                })
                .catch(err => {
                    console.log('addPdReqList() 에러', err)
                })
        }
        else {
            alert('이용약관에 동의해주세요!');
        }
    }

    // 자식 컴포넌트가 render 될떄 실행되면서 자식으로부터 입력받은 값을 전달받음
    const handleCheckedAgreement = (e) => {
        setIsAgreed(prevState => {
            return {
                ...prevState,
                isAgreed1: e.checkbox1,
                isAgreed2: e.checkbox2
            }
        });
    };

    // 계좌 선택 눌렀을 때
    const accountChange = (event) => {
        setSelectedAccount(event.target.value);
    };

    // 계좌번호 => 문자열로 변환 후 slice
    function acNum(acNumber) {
        const acNum = acNumber.toString().slice(0, 3) + '-' + acNumber.toString().slice(3);
        return acNum;
    }

    // 값을 입력할 때
    const handleInputValue = (e) => {
        setInputs(prevState => {
            return{
                ...prevState,
                [e.target.name] : e.target.value
            }
        })
    }

    return(
        <>
        <br />
        <br />
        <br />
        <Container className="applicaiton">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" type = "text/css"/>
            <h1>대출 신청</h1>
            <br/>
            <AgreeAccordion onAgree={handleCheckedAgreement}/>
            <br/>
            <Form onSubmit={handleSubmit} className="formArea">
                <br/>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">대출상품명</Form.Label>
                    <Col sm="10">
                        <Form.Control name="lpdName" readOnly value={inputs.lpdName}/>
                    </Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">신청자명</Form.Label>
                    <Col sm="10">
                        <Form.Control name="id" readOnly value="홍길동"  />
                    </Col>
                </Form.Group>
                <br/>
                <fieldset>
                    <Form.Group as={Row} className="mb-3">
                    <Form.Label as="legend" column sm={2}>
                        대출용도
                    </Form.Label>
                    <Col sm={10} name="lpurpose" value={inputs.lpurpose} onChange={handleInputValue}>
                        <Form.Check
                        type="radio" 
                        name="lpurpose"
                        value="가계자금" 
                        checked={selectedPurpose === '가계자금'} 
                        label="가계자금" 
                        onChange={handleRadioChange}
                        />
                        <Form.Check
                        type="radio"
                        name="lpurpose"
                        value="사업자금" 
                        checked={selectedPurpose === '사업자금'} 
                        label="사업자금"
                        onChange={handleRadioChange}
                        />
                        <Form.Check
                        type="radio"
                        name="lpurpose"
                        value="주택자금"
                        checked={selectedPurpose === '주택자금'} 
                        label="주택자금"
                        onChange={handleRadioChange}
                        /> 
                        <Form.Check 
                        type="radio" 
                        name="lpurpose"
                        value="기타"
                        checked={selectedPurpose === '기타'} 
                        label="기타" 
                        onChange={handleRadioChange}
                         />
                        {/* {selectedPurpose === '기타' && (
                            <Form.Control 
                            type="text" 
                            name="purpose"
                            placeholder="대출목적을 정확히 입력해주세요." 
                            value={textOption} 
                            onChange={handleInputChange}
                            />
                        )} */}
                    </Col>
                    </Form.Group>
                </fieldset>
                <br/>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">연간소득</Form.Label>
                    <Col sm="10">
                        <Form.Select name="lincome" value={inputs.lincome} onChange={handleInputValue}>
                            <option value="0">연간소득을 선택해주세요.</option>
                            <option value="1억원미만">1억원미만</option>
                            <option value="1억원이상 3억원미만">1억원이상 3억원미만</option>
                            <option value="3억원이상 5억원미만">3억원이상 5억원미만</option>
                            <option value="5억원이상">5억원이상</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">대출 금액</Form.Label>
                    <Col sm="10">
                        <InputGroup className="mb-3">
                            <Form.Control name="lprincipal" value={inputs.lprincipal} placeholder="대출금액을 입력하세요." onChange={handleInputValue}/> 
                            <InputGroup.Text>만원</InputGroup.Text>
                        </InputGroup>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">대출 기간</Form.Label>
                    <Col sm="10">
                        <Form.Select name="lperiod" value={inputs.lperiod} onChange={handleInputValue}>
                            <option value="0">대출기간을 선택해주세요.</option>
                            <option value="1">1년(12개월)</option>
                            <option value="2">2년(24개월)</option>
                            <option value="3">3년(36개월)</option>
                            <option value="4">4년(48개월)</option>
                            <option value="5">5년(60개월)</option>
                            <option value="7">7년(60개월)</option>
                            <option value="10">10년(120개월)</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">계좌선택</Form.Label>
                    <Col sm="10">
                        <Form.Select name="acNumber" value={selectedAccount} onChange={accountChange}>
                            <option value="입출금계좌를 선택하세요">입출금계좌를 선택하세요</option>
                                {/* fetch를 통해 가져온 계좌들을 조회한다. */} 
                                {myAccounts.map(account => {
                                    return (
                                        <option key={account.acNumber} name="acNumber" value={account.acNumber}>
                                            [{account.bankName}]{acNum(account.acNumber)}
                                        </option>
                                    );
                                })}
                        </Form.Select>
                    </Col>
                </Form.Group>
                <br/>
                <Form.Group as={Row}>
                    <Form.Label column sm="2">대출계좌 비밀번호</Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" name="acPwd" value={inputs.acPwd} size="4" placeholder="비밀번호 4자리를 입력하세요." onChange={handleInputValue} />
                    </Col>
                </Form.Group>
                <br/>
                <br/>
                <br/>
                <div className="d-grid gap-2">
                    <Button type="submit" style = {{background:'#9dc888',border:'#9dc888'}} size="lg" > 가입하기 </Button>
                </div>
            </Form>
        </Container>
        <br />
        <br />
        <br />
        </>
    )
}
export default PdLoanApplication;