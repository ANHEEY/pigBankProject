//고객 예금 상품 가입페이지
import React, { useState,useEffect } from "react"
import AgreeAccordion from "../product-application/AgreeAccordion"
import {Form,Button, Row, Col,InputGroup,Container} from 'react-bootstrap'
import '../../../../resources/css/product/application-form.css'
import { useNavigate } from "react-router-dom";
import PdDepositService from "./PdDepositService";

function DepositApplication(){
    const navigate = useNavigate();

    const comma = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    //동의 약관 설정
    const [isAgreed,setIsAgreed]=useState({
        isAgreed1:"",
        isAgreed2:"",
    });

    const [acPwd, setAcPwd] = useState('');
    const [inputAcPwd, setInputAcPwd] = useState('');
    const [acBalance,setAcBalance] = useState('');
    const [dacPwd,setDacPwd] = useState('');
    const [dAmount,setDAmount] = useState('');
    const [selectedAccount,setSelectedAccount] = useState('');
    const [dSelectedAccount,SetDSeletedAccount] = useState('');

    const handleCheckedAgreement=(e)=>{
        setIsAgreed(prevState=>{
            return{
                ...prevState,
                isAgreed1:e.checkbox1,
                isAgreed2:e.checkbox2
            }
        });
    }

    // 계좌번호 => 문자열로 변환 후 slice
    const acNum = (e) => {
        console.log(e);
        if(!e) return "";       
        return e.toString().slice(0, 3) + '-' + e.toString().slice(3);
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

    const [accounts, setAccounts] = useState([]);
    const [period,setPeriod] = useState([]);

    useEffect(()=>{
        depositDetail();
        cusAccountList(window.localStorage.getItem("id"));
    },[]);

    const depositDetail=() =>{
        PdDepositService.pdDepositDetailInfo(window.localStorage.getItem("dpdName"))
            .then(res=>{
                setDepositProduct(res.data);
                console.log(res.data);
                localStorage.removeItem("dpdName");
            })
            .catch(err => {
                console.log('depositPdDetail() Error!!!', err);
            });
    }   

    const accountChange = (e)=>{
        const selectedAccountInt = parseInt(e.target.value);
        const account = accounts.find(account => account.acNumber === selectedAccountInt);
        setSelectedAccount(selectedAccountInt);
        if(account){
            setAcPwd(account.acPwd);
            setAcBalance(account.acBalance);
        }else{
            setAcPwd('');
            setAcBalance('');
        }
    }

    const dAccountChange=(e)=>{
        const dSelectedAccountInt = parseInt(e.target.value);
        const accout = accounts.find(account => account.acNumber === dSelectedAccountInt);
        SetDSeletedAccount(dSelectedAccountInt);
    }
    const cusAccountList=(id)=>{
        PdDepositService.cusAccountList(id)
            .then(res=>{
                console.log(res.data);
                setAccounts(res.data);
            })
            .catch(err=>{
                console.log('cusAccountList() error!!',err);
            });
    }

    const productJoin=()=>{
        if(period === ""){
            alert("예금 가입 기간을 입력하세요!");
            return false;
        }
        else if(period<1){
            alert("예금 가입 기간은 1개월 이상입니다!");
            setPeriod("");
            return false;
        }
        else if(period>depositProduct.dperiod){
            alert("최대 예금 가입 기간은 "+depositProduct.dperiod+"개월입니다!");
            setPeriod("");
            return false;
        }

        if(dAmount === ""){
            alert("예금 가입 금액을 입력하세요!");
            return false;
        }
        if(dacPwd === ""){
            alert("예금 비밀번호를 입력하세요!");
            return false;
        }
        else if(dacPwd.length !== 4){
            alert("예금 비밀번호 4자리로 입력해주세요!");
            return false;
        }
        if(selectedAccount === ""){
            alert("출금계좌를 선택하세요!");
            return false;
        }
        if(inputAcPwd === ""){
            alert("출금계좌 비밀번호를 입력하세요!");
            return false;
        }
        if(dSelectedAccount === ""){
            alert("만기시 입금계좌를 선택하세요!");
            return false;
        }        
        if(depositProduct.dmin*10000>dAmount){
            alert("예금 최소 금액 "+comma(depositProduct.dmin)+"만원보다 큰 금액을 입력해주세요!");
            setDAmount('');
            return false;
        }
        if(depositProduct.dmax*10000<dAmount){
            alert("예금 최대 금액 "+comma(depositProduct.dmax)+"만원보다 작은 금액을 입력해주세요!");
            setDAmount('');
            return false;
        }
        if(acBalance < dAmount){
            alert("계좌 잔액이 부족합니다! 확인하고 가입해 주세요");
            return false;
        }      
        const cusDepositOpenInfo = {
            id:window.localStorage.getItem("id"),
            dpdName:depositProduct.dpdName,
            acPwd:dacPwd,
            damount:dAmount,
            dexpAmount:Math.round(Number(depositProduct.drate/100)*Number(dAmount)*Number(period/12)+Number(dAmount)),
            ddeAccount:dSelectedAccount,
            dperiod:period,
            withdrawAcNumber:selectedAccount,
        }
        console.log(acPwd);
        console.log(inputAcPwd);
        console.log(cusDepositOpenInfo);

        if(Number(acPwd) === Number(inputAcPwd)){
            if(isAgreed.isAgreed1&&isAgreed.isAgreed2){
                PdDepositService.cusDepositOpen(cusDepositOpenInfo)
                .then(res=>{
                    alert("예금 가입이 완료되었습니다!");
                    navigate('/customer/product/pdDeposit');
                })
                .catch(err=>{
                    console.log("cusDepositOpen() 에러!!!", err);
                });
            }
            else{
                alert('이용약관에 동의 후 가입 가능합니다!');
            }
        }
        else{
            alert('출금 계좌 비밀번호가 틀렸습니다! 다시 입력해주세요');
            setInputAcPwd('');
        }

    }

    return(
        
        <Container className="applicaiton">
                    <br/><br/><br/><br/>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" type = "text/css"/>
            <h1>예금 상품 가입</h1>
            <br/>
            <AgreeAccordion onAgree={handleCheckedAgreement}/>
            <br/>
            <Form className="formArea">
                <div>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">예금 상품명</Form.Label>
                        <Col sm="10">
                            <Form.Control readOnly value={depositProduct.dpdName}/>
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">가입자명</Form.Label>
                        <Col sm="10">
                            <Form.Control readOnly value={window.localStorage.getItem("id")} />
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">가입 기간</Form.Label>
                        <Col sm="10">
                            <InputGroup className="mb-3">
                                <Form.Control type="number" min={1} max={depositProduct.dperiod} name="period" value={period} placeholder="가입 기간을 입력하세요." onChange={(e)=>setPeriod(e.target.value)} /> 
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">가입 금액</Form.Label>
                        <Col sm="10">
                            <InputGroup className="mb-3">
                                <InputGroup.Text>₩</InputGroup.Text>
                                <Form.Control type="number" min={depositProduct.dmin*10000} max={depositProduct.dmax*10000} name="dAmount" value={dAmount} placeholder="가입금액을 입력하세요." onChange={(e)=>setDAmount(e.target.value)} /> 
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">예금 비밀번호</Form.Label>
                        <Col sm="10">
                            <InputGroup className="mb-3">
                                <Form.Control name="dacPwd" type="password" placeholder="예금 계좌 비밀번호 4자리를 입력하세요." onChange={(e)=>setDacPwd(e.target.value)} /> 
                            </InputGroup>
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">출금계좌</Form.Label>
                        <Col sm="10">
                            <Form.Select aria-label="Default select example" onChange={accountChange}>                                
                                <option value="">출금계좌를 선택하세요</option>
                                {accounts.filter((account) => account.acType === "입출금통장").map((account)=>(
                                        <option key={account.acNumber} value={account.acNumber}>
                                            [{account.bankName}]{acNum(account.acNumber)}||{account.acType}
                                        </option>))}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">계좌 비밀번호</Form.Label>
                        <Col sm="10">
                            <Form.Control name="inputAcPwd" value={inputAcPwd} type="password" size="4" placeholder="비밀번호 4자리를 입력하세요." onChange={(e)=>setInputAcPwd(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">만기 시 입금계좌</Form.Label>
                        <Col sm="10">
                        <Form.Select aria-label="Default select example" onChange={dAccountChange}>                                
                                <option value="">만기 시 입금계좌를 선택하세요</option>
                                {accounts.filter((account) => account.acType === "입출금통장").map((account)=>(
                                        <option key={account.acNumber} value={account.acNumber}>
                                            [{account.bankName}]{acNum(account.acNumber)}||{account.acType}
                                        </option>))}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <br/>
                </div>
                <div className="d-grid gap-2">
                    <Button style = {{background:'#9dc888', border:'#9dc888'}} size="lg" onClick={()=>productJoin()}> 가입하기 </Button>
                </div>
            </Form>
            <br/><br/><br/><br/>
        </Container>


    )
}
export default DepositApplication;