import React , { useState, useEffect }  from "react"
import AgreeAccordion from "../product-application/AgreeAccordion" 
import { Form, Button, Row, Col, InputGroup, Table } from 'react-bootstrap'
import {Container, Input, Select, Option } from "@mui/joy";
import DatePicker from "react-datepicker";

import '../../../../resources/css/product/application-form.css'
import PdSavingService from "./PdSavingService";
import { getId} from "../../../helpers/axios_helper";

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
                alert('적금 신청이 완료되었습니다. 자동이체등록 페이지로 이동합니다.') // 정액
                window.location.href = '/customer/transfer/add_auto_trans';
            } else {
                alert('적금 신청이 완료되었습니다.'); // 자유식
                window.location.href = '/customer/product/pdSaving';
            }
        } else {
            alert('이용약관에 동의 후 가입 가능합니다.');
        }
    }
    
    const handleCheckedAgreement = (e) => {
        setIsAgreed(prevState => {
            return{
                ...prevState,
                isAgreed1:e.checkbox1,
                isAgreed2:e.checkbox2
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

    // 고객정보 불러오기
    const [id, setId] = useState(getId());

    useEffect(() => {
        setId(getId());
        PdSavingService.custAccountList(id)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log('custAccountList() Error!', err);
            })
    })

    // 계좌정보 가져오기(출금/만기 계좌 선택 클릭시)
    const [selectAcc, setSelectAcc] = useState('');
    const selectAccClick = (evnt) => {
        setSelectAcc(evnt.target.value);
    }

    // 자동이체일 선택 후 가입기간에 따른 만기일
    const [selectedDate, setSelectedDate] = useState(new Date());

    const twoYearsFromNow = new Date(
        selectedDate.getFullYear() + 2, // 가입기간에 맞게 다시 값 주기
        selectedDate.getMonth(),
        selectedDate.getDate()
    );

    // input



    return(
        <div className="applicaiton container">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" type = "text/css"/>
            <h1>적금 상품 가입</h1>
            <br/>
            <AgreeAccordion onAgree={handleCheckedAgreement}/>
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
                                    {/* <Input variant="outlined" color="neutral" size="md" readOnly defaultValue={getId} />  defaultValue에 고객아이디(이름)와 연결하기 */}
                                    <Form.Control placeholder="신청자" readOnly defaultValue={id}  />
                                </td>
                            </tr>
                            <tr>
                                <th tyle={{width:"200px"}}>출금계좌</th>
                                <td>
                                    <Select placeholder="계좌를 선택하세요." value={selectAcc}>
                                            <Option value="null">계좌를 선택하세요</Option> {/* value에 고객 입출금계좌와 연결하기 */}
                                            <Option value="">710402-00-243513</Option>
                                    </Select>
                                </td>
                                <th style={{width:"100px"}}>비밀번호</th>
                                <td style={{width:"250px"}}>
                                    <Form.Control 
                                        placeholder="비밀번호 4자리 입력"
                                        type="password"
                                        name="acPwd"
                                        value="{acPwd}  onChange={(e) => onChange(e)}"
                                       
                                        variant="outlined"
                                        color="neutral"
                                        size="md"  />
                                </td>
                            </tr>
                            <tr>
                                <th>만기시 입금계좌</th>
                                <td colSpan={4}> 
                                    <Select placeholder="계좌를 선택하세요." value="">
                                            <Option value="0">계좌를 선택하세요</Option> {/* value에 고객 입출금계좌와 연결하기 */}
                                            <Option value="">710402-00-243513</Option>
                                    </Select>
                                </td>
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
                                <td>
                                    <Form.Control readOnly defaultValue={detailInfo.spdname}  /> {/* defaultValue에 이전페이지에서 상품명 받아와 연결하기 */}
                                </td>
                                <th style={{width:"100px"}}>금리</th>
                                <td style={{width:"250px"}}>
                                    <InputGroup className="mb-3">
                                        <Form.Control readOnly defaultValue={detailInfo.srate}  /> 
                                        <InputGroup.Text>%</InputGroup.Text>
                                    </InputGroup>
                                </td>
                            </tr>
                            <tr>
                                <th tyle={{width:"200px"}}>가입기간</th>
                                <td>
                                    <Select placeholder="가입기간을 선택하세요.">
                                            <Option value="0">가입기간을 선택하세요</Option>
                                            <Option value="12">12개월</Option>
                                            <Option value="24">24개월</Option>
                                            <Option value="36">36개월</Option>
                                    </Select>
                                </td>
                                <th style={{width:"100px"}}>비밀번호</th>
                                <td style={{width:"250px"}}>
                                    <Input placeholder="비밀번호 4자리 입력" type="password" variant="outlined" color="neutral" size="md" />
                                </td>
                            </tr>
                            <tr>
                                <th>가입금액</th>
                                <td colSpan={4}> 
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>₩</InputGroup.Text>
                                        <Form.Control placeholder="가입금액을 입력하세요."  /> 
                                    </InputGroup>
                                </td>
                            </tr>
                            <tr>
                                <th>자동이체일 지정</th>
                                <td> 
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(date) => setSelectedDate(date)}
                                        minDate={new Date()}
                                        maxDate={twoYearsFromNow}
                                        dateFormat="yyyy-MM-dd"
                                    />
                                   
                                </td>
                                <th>예상만기일</th>
                                <td> 
                                    <DatePicker
                                        selected={twoYearsFromNow}
                                        onChange={(date) => setSelectedDate(date)}
                                        minDate={new Date()}
                                        maxDate={twoYearsFromNow}
                                        dateFormat="yyyy-MM-dd"
                                    />
                                   {/* <Form.Control type="date" name="sEndDate"  dateFormat="yyyy-MM-dd" value={twoYearsFromNow} onChange={(e) => onChange(e)}/> */} 
                                </td>
                            </tr>
                        </tbody>
                    </Table>
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