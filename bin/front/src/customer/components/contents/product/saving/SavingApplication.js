import React , { useState, useEffect }  from "react"
import AgreeAccordion from "../product-application/AgreeAccordion" 
import { Form, Button, InputGroup, Table } from 'react-bootstrap'
import '../../../../resources/css/product/application-form.css'
import PdSavingService from "./PdSavingService";
import { useNavigate } from "react-router-dom";

function SavingApplication(){

    const navigate = useNavigate();

    const comma = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    // 약관 동의
    const [isAgreed, setIsAgreed] = useState({
        isAgreed1: "",
        isAgreed2: ""
    })

    const [acPwd, setAcPwd] = useState('');       // 출금계좌 비밀번호
    const [inputAcPwd, setInputAcPwd] = useState(''); // 비밀번호 입력 값
    const [acBalance,setAcBalance] = useState(''); // 계좌 잔액
    const [sacPwd, setSAcPwd] = useState('');     // 적금계좌 비밀번호
    const [sAmount, setSAmount] = useState('');   // 정기납입 금액
    const [selectAccount, setSelectAccount] = useState(''); // 출금계좌
    const [sdeAccount, setSDeAccount] = useState(''); // 만기시 입금계좌
    
    const handleCheckedAgreement = (e) => {
        setIsAgreed(prevState => {
            return{
                ...prevState,
                isAgreed1:e.checkbox1,
                isAgreed2:e.checkbox2
            }
        });
    }

    // 상품
    const [savingProduct, setSavingProduct] = useState({
        spdname: "",
        scontent: "",
        speriod:  "",
        smin: "",
        smax: "",
        srate: "",
        scxlrate: "",
        sregdate: ""
    });

    const [accounts, setAccounts] = useState([]);

    // 자동이체 시작일, 만기일
    // const [sstartDate, setSstartDate] = useState(new Date().toISOString().slice(0, 10));
    // const [sendDate, setSendDate] = useState(new Date().toISOString().slice(0, 10));
    const [sstartDate, setSstartDate] = useState(new Date().toISOString().slice(0, 10));
    const sendDate = new Date(new Date(sstartDate).setMonth(new Date(sstartDate).getMonth() + savingProduct.speriod)).toISOString().slice(0, 10);
    

    useEffect(() => {
        savingDetail();
        custAccList(window.localStorage.getItem("id"));
    }, []);

    const savingDetail = () => {
        PdSavingService.custSPdDetail(window.localStorage.getItem("spdname"))
            .then(res => {
                setSavingProduct(res.data);
                console.log('custSPdDetail');
                console.log(res.data);
            })
            .catch(err => {
                console.log('custSPdDetail() Error!', err);
            }) 
    }

    const accountChange = (e) => {
        const selectAccountInt = parseInt(e.target.value);
        const account = accounts.find(account => account.acNumber === selectAccountInt);
        setSelectAccount(selectAccountInt);
        if(account) {
            setAcPwd(account.acPwd);
            setAcBalance(account.acBalance);
        } else {
            setAcPwd('');
            setAcBalance('');
        }
    }

    const sAccountChange = (e) => {
        const sSelectAccountInt = parseInt(e.target.value);
        const account = accounts.find(account => account.acNumber === sSelectAccountInt);
        setSDeAccount(sSelectAccountInt);
    }

    const custAccList = (id) => {
        PdSavingService.custAccountList(id)
            .then(res => {
                console.log(res.data);
                setAccounts(res.data);
            })
            .catch(err => {
                console.log('custAccountList() Error!', err);
            })
    }
    
    const handleSubmit=() => {
        if(sAmount === "") {
            alert('적금 가입금액을 입력하세요!');
            return false;
        }
        if(sAmount < savingProduct.smin*10000 || sAmount > savingProduct.smax*10000) {
            alert('상품 가입금액을 확인하세요!');
            return false;
          }
        if(sacPwd === "") {
            alert('적금 비밀번호를 입력하세요!');
            return false;
        }
        if(selectAccount === "") {
            alert('출금계좌를 선택하세요!');
            return false;
        }
        if(inputAcPwd === "") {
            alert('선택하신 계좌의 비밀번호를 입력하세요!');
            return false;
        }
        if(sdeAccount === "") {
            alert('만기시 입금계좌를 선택하세요!');
            return false;
        }
        if(savingProduct.smin*10000 > sAmount) {
            alert('적금 최소 금액 ' + comma(savingProduct.smin) + '만원보다 큰 금액을 입력해주세요!');
            setSAmount('');
            return false;
        }
        if(acBalance < sAmount) {
            alert("계좌 잔액이 부족합니다. 확인 후 다시 가입해주세요!");
            return false;
        }
        
        const custSavigAccInfo = {
            id: window.localStorage.getItem("id"),
            spdname:savingProduct.spdname,
            acPwd:sacPwd,
            speriod:savingProduct.speriod,
            samount:Number(sAmount),
            sexpAmount:Math.round(Number(savingProduct.srate/100)*Number(sAmount)*Number(savingProduct.speriod/12)+(Number(sAmount)*Number(savingProduct.speriod))), // 이자+(가입금액*가입기간(m))
            sdeAccount:sdeAccount, // 만기시 입금계좌
            sstartDate:sstartDate, // sendDate: sendDate
            sendDate: sendDate,
            withdrawAcNumber:selectAccount
        }

        console.log(acPwd);
        console.log(inputAcPwd);
        console.log(custSavigAccInfo);

        if(Number(acPwd) === Number(inputAcPwd)) {
            if(isAgreed.isAgreed1&&isAgreed.isAgreed2){
                PdSavingService.addSavingAccount(custSavigAccInfo)
                    .then(res => {
                                alert("적금상품 가입이 완료되었습니다.");
                                navigate('/customer/product/pdSaving');
                    })
                .catch(err => {
                    console.log('addSavingAccount() Error!', err);
                });
            } else {
                alert('이용약관에 동의 후 가입이 가능합니다.');
                
            } 
        } else {
            alert('선택하신 출금계좌 비밀번호가 틀립니다. 다시 입력하세요!')
            setInputAcPwd('');
           
        }

    }

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
                                <th  style={{width:"160px"}}>가입자명</th>
                                <td colSpan={4}>
                                    {/* <Input variant="outlined" color="neutral" size="md" readOnly defaultValue={getId} />  defaultValue에 고객아이디(이름)와 연결하기 */}
                                    <Form.Control readOnly name="id" value={window.localStorage.getItem("id")}  />
                                </td>
                            </tr>
                            <tr>
                                <th tyle={{width:"200px"}}>출금계좌</th>
                                <td>
                                    <Form.Select aria-label="Default select example" onChange={accountChange}>                                
                                    <option value="">출금계좌를 선택하세요</option>
                                    {accounts.filter((account) => account.acType === "입출금통장").map((account)=>(
                                        <option key={account.acNumber} value={account.acNumber}>
                                        [{account.bankName}]{account.acNumber}||{account.acType}
                                        </option>
                                    ))} 
                                    </Form.Select>
                                </td>
                                <th style={{width:"150px"}}>비밀번호</th>
                                <td style={{width:"280px"}}>
                                    <Form.Control 
                                        placeholder="비밀번호 4자리 입력"
                                        maxLength={4}
                                        type="password"
                                        name="inputAcPwd"
                                        value={inputAcPwd}
                                        onChange={(e) => setInputAcPwd(e.target.value)}
                                        variant="outlined"
                                        color="neutral"
                                        size="md"  />
                                </td>
                            </tr>
                            <tr>
                                <th>만기시 입금계좌</th>
                                <td colSpan={4}> 
                                <Form.Select aria-label="Default select example" onChange={sAccountChange}>                                
                                <option value="">만기 시 입금계좌를 선택하세요</option>
                                {accounts.filter((account) => account.acType === "입출금통장").map((account)=>(
                                        <option key={account.acNumber} value={account.acNumber}>
                                            [{account.bankName}]{account.acNumber}||{account.acType}
                                        </option>))}
                                </Form.Select>
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
                                    <Form.Control readOnly value={savingProduct.spdname}  /> {/* defaultValue에 이전페이지에서 상품명 받아와 연결하기 */}
                                </td>
                                <th style={{width:"150px"}}>금리</th>
                                <td style={{width:"280px"}}>
                                    <InputGroup className="mb-3">
                                        <Form.Control readOnly value={savingProduct.srate}  /> 
                                        <InputGroup.Text>%</InputGroup.Text>
                                    </InputGroup>
                                </td>
                            </tr>
                            <tr>
                                <th tyle={{width:"200px"}}>가입기간</th>
                                <td>
                                <InputGroup className="mb-3">
                                <Form.Control readOnly value={savingProduct.speriod}  />
                                        <InputGroup.Text>개월</InputGroup.Text>
                                    </InputGroup>
                                </td>
                                <th style={{width:"150px"}}>적금 비밀번호</th>
                                <td style={{width:"250px"}}>
                                    <Form.Control 
                                        placeholder="비밀번호 4자리 입력"
                                        maxLength={4}
                                        type="password"
                                        name="sacPwd"
                                        onChange={(e) => setSAcPwd(e.target.value)}
                                        variant="outlined"
                                        color="neutral"
                                        size="md"  />    
                                </td>
                            </tr>
                            <tr>
                                <th>가입금액</th>
                                <td colSpan={3}> 
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>₩</InputGroup.Text>
                                        <Form.Control placeholder="가입금액을 입력하세요." 
                                                      name="sAmount"
                                                      value={sAmount} 
                                                      onChange={(e)=>setSAmount(e.target.value)} /> 
                                    </InputGroup>
                                </td>
                            </tr>
                            <tr>
                                <th>자동이체 시작일</th>
                                <td> 
                                <Form.Control type="date" name="strsfCycle"  value={sstartDate} onChange={(e) => setSstartDate(e.target.value)}/>
                                </td>
                                <th>예상 만기일</th>
                                <td> 
                                <Form.Control type="date" name="sendDate"  value={sendDate} onChange={(e) => setSstartDate(e.target.value)} />
                                {/* {new Date(sstartDate.getFullYear(), sstartDate.getMonth() + savingProduct.speriod, sstartDate.getDate())} onChange={(e) => setSendDate(e.target.value)} */}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="d-grid gap-2">
                        <Button style={{ background: '#9dc888' ,border:'#9dc888'}} size="lg" onClick={handleSubmit}> 가입하기 </Button>
                    </div>
            </Form>
            <br/>
        </div>
    )
}
export default SavingApplication;