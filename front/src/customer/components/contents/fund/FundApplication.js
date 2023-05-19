import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap'
import React, { useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getAuthToken } from '../../helpers/axios_helper';
import AgreeAccordion from "../product/product-application/AgreeAccordion"
import FundAPIService from "./service/FundAPIService";
import '../../../resources/css/product/application-form.css'

function FundApplication() {
    const navigate = useNavigate();
    const id = window.localStorage.getItem("id");
    const [account, setAccount] = useState([]);
    const [selectAccount, setSelectAccount] = useState('');
    const [acBalance, setAcBalance] = useState('');
    const [acPwd, setAcPwd] = useState('');
    const [bankName, setBankName] = useState('');

    const [fundAcInfo, setFundAcInfo] = useState({
        facPwd: '',
        reFacPwd: '',
        fbalance: ''
    });

    const onChange = (e) => {
        const { value, name } = e.target;
        setFundAcInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    useEffect(() => {
        // jwt 토큰 헤더에 저장
        if (getAuthToken() !== null) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
        } else {
            axios.defaults.headers.common['Authorization'] = ``;
        }
        // 페이지 로딩시 고객 입출금 계좌 select
        FundAPIService.selectAccountById(id)
            .then(res => {
                setAccount(res.data);
            })
            .catch(err => {
                console.log('계좌정보를 가져오지 못함 ', err);
            })
    }, []);
    //동의 약관 설정
    const [agree, setAgree] = useState({
        isAgreed1: "",
        isAgreed2: "",
    })
    const handleCheckedAgreement = (e) => {
        setAgree(prevState => {
            return {
                ...prevState,
                isAgreed1: e.checkbox1,
                isAgreed2: e.checkbox2
            }
        });
    }
    // ***** select 값이 변경될 때마다 업데이트 but 버튼 두번클릭해야 잔액 업데이트
    const handleSelectAccount = (e) => {
        const selectAccountInt = parseInt(e.target.value);
        const accountSelect = account.find(accountSelect => accountSelect.acNumber === selectAccountInt);
        setSelectAccount(selectAccountInt);
        if (accountSelect) {
            setSelectAccount(accountSelect.acNumber);
            setAcBalance(accountSelect.acBalance);
            setAcPwd(accountSelect.acPwd);
            setBankName(accountSelect.bankName);
        }
        else {
            setSelectAccount('');
            setAcBalance('');
            setAcPwd('');
            setBankName('');
        }
    }
    // 계좌번호 => 문자열로 변환 후 slice
    function acNum(acNumber) {
        const acNum = acNumber.toString().slice(0, 3) + '-' + acNumber.toString().slice(3);
        return acNum;
    }
    // 출금계좌 비밀번호 확인 및 잔액 조회
    const chkBalance = () => {
        const inputPwd = document.getElementById('acPwd').value;
        if (parseInt(inputPwd) === acPwd) {
            document.getElementById('balanceP').innerText = `${Number(acBalance).toLocaleString()}원`;
        }
        else if (inputPwd === '') {
            alert("비밀번호를 입력하세요.")
        }
        else {
            alert('출금계좌의 비밀번호가 일치하지 않습니다.');
        }
    };
    // 가입하기 버튼 클릭시
    const handleSubmit = (e) => {
        e.preventDefault();
        const fundAccountInfo = {
            id: id,
            facPwd: fundAcInfo.facPwd,
            fbalance: fundAcInfo.fbalance,
            acNumber: selectAccount,
        }
        if (!selectAccount) {
            alert("출금계좌를 선택하세요")
            return false;
        }
        if (!fundAccountInfo.fbalance) {
            alert('가입하실 금액을 입력하세요.')
            return false;
        }
        if (!fundAcInfo.facPwd) {
            alert('비밀번호를 입력하세요.')
            return false;
        }
        if (fundAcInfo.facPwd !== fundAcInfo.reFacPwd) {
            alert("비밀번호가 일치하지 않습니다. 다시입력해 주세요.")
            return false;
        }
        if (acBalance < fundAccountInfo.fbalance) {
            alert("현재 입출금계좌 잔액보다 많은 금액을 입력했습니다. 가입금액을 다시 입력하세요.")
            return false;
        }
        if (agree.isAgreed1 && agree.isAgreed2) {
            FundAPIService.insertFundAccount(fundAccountInfo)
                .then(() => {
                    alert('상품가입이 완료되었습니다 . 펀드상품 거래가 가능합니다.');
                    navigate('/customer/fund/list');
                })
                .catch(err => {
                    console.log('insertFundAccount 에러', err)
                })
        }
        else {
            alert('이용약관에 동의해주세요.');
        }
    }
    return (
        <div className="fundDiv">
            <div className="applicaiton">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" type="text/css" />
                <p className="fund-title">
                    FunFun한 펀드계좌 개설
                </p>
                <AgreeAccordion onAgree={handleCheckedAgreement} />
                <Form className="formArea" onSubmit={handleSubmit}>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">상품명</Form.Label>
                        <Col sm="10">
                            <Form.Control readOnly defaultValue="돼지은행 FunFun한 펀드계좌" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">가입자</Form.Label>
                        <Col sm="10">
                            <Form.Control readOnly defaultValue={id} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">출금계좌</Form.Label>
                        <Col sm="10">
                            <Form.Select value={selectAccount} onChange={handleSelectAccount}>
                                <option>출금계좌를 선택하세요</option>
                                {account.map(account =>
                                    <option key={account.acNumber} value={account.acNumber}>[{account.bankName}] {acNum(account.acNumber)} </option>
                                )}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">출금계좌 비밀번호</Form.Label>
                        <Col sm="8">
                            <Form.Control type="password" maxLength={4} placeholder="출금계좌의 비밀번호 4자리를 입력하세요." id='acPwd' />
                        </Col>
                        <Col sm="2">
                            <Button style={{ background: '#6ab64e', border: '#9dc888', padding: '8px 18px' }} onClick={chkBalance}>
                                잔액확인
                            </Button >
                        </Col>
                    </Form.Group>
                    {/* 비번 입력 후 버튼 클릭 시 선택된 계좌의 잔액 출력 */}
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">선택한 계좌 잔액</Form.Label>
                        <Col sm="10">
                            <p id='balanceP'></p>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">가입 금액</Form.Label>
                        <Col sm="10">
                            <InputGroup className="mb-3">
                                <InputGroup.Text>₩</InputGroup.Text>
                                <Form.Control
                                    placeholder="가입금액을 입력하세요. 출금계좌에서 금액이 차감됩니다."
                                    name="fbalance" value={fundAcInfo.fbalance} onChange={onChange}
                                />
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" > 가입계좌 비밀번호</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="password" maxLength={4} placeholder="가입하실 비밀번호 4자리를 입력하세요."
                                name="facPwd" value={fundAcInfo.facPwd} onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">비밀번호확인</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="password" maxLength={4} placeholder="가입하실 비밀번호를 다시 입력하세요."
                                name="reFacPwd" value={fundAcInfo.reFacPwd} onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button type="submit" size="lg"
                            style={{ background: '#6ab64e', border: '#6ab64e', padding: '10px', fontSize: '26px', marginTop: '20px' }}
                        >
                            가입하기
                        </Button >
                    </div>
                </Form>
            </div>
        </div>

    )
}
export default FundApplication
