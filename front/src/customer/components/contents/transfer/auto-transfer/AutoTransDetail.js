import React,{useState,useEffect} from "react";
import { Button, Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from "react-router-dom";
import TransferService from "../transfer-service/TransferService";



function AutoTransDetail () {

    const {anum} = useParams();
    const [acNumber, setAcNumber] = useState(0);
    const [adepositAmount, setAdepositAmount] = useState(0); 
    const [trsfLimit, setTrsfLimit] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [transferCycle, setTransferCycle] = useState('');
    const [aState, setAState] = useState('');
    const [aregDate, setAregDate] = useState('');
    const [yourMemo, setYourMemo] = useState('');
    const [Anum, setAnum] = useState();
    const [datas, setDatas] = useState();

    const navigate = useNavigate();
    
    useEffect(() => {
        reloadAccountList(anum);
        console.log(startDate);
        console.log(endDate);
        console.log(aregDate);

    },[anum],[datas]);

    const reloadAccountList = (anum) => {
        TransferService.selectOne(anum)
            .then(res => {
                console.log("hi : " , res.data);
                setAcNumber(res.data.acNumber);
                setAdepositAmount(res.data.adepositAmount);
                setTrsfLimit(res.data.trsfLimit);
                setStartDate(new Date(res.data.astartDate).toISOString());
                setEndDate(new Date(res.data.aendDate).toISOString());
                setTransferCycle(res.data.atransferCycle);
                setAState(res.data.astate);
                setAregDate(new Date(res.data.aregDate).toISOString());
                setYourMemo(res.data.yourMemo);
                setAnum(res.data.anum);

                
                let datas = {
                    adepositAmount: adepositAmount,
                    aendDate: endDate,
                    anum: Anum,
                    atransferCycle: transferCycle
                }
                setDatas(datas);
                console.log(datas);
                
                console.log(startDate);
                console.log(endDate);
                console.log(aregDate);

            })
    }

    const updateAutoTransfer = () => {
        if (transferCycle >= 13) {
          return alert("이체주기는 13개월 이상일수 없습니다.");
        } else if (transferCycle <= 0) {
          return alert("이체주기는 0개월 이하일수 없습니다.");
        } else if (startDate > endDate) {
          return alert("이체종료날짜가 이체시작날짜 전일수 없습니다!.");
        } else if (trsfLimit < adepositAmount) {
          return alert("한도초과 금액확인후 이용해주세요.");
        }else if (isNaN(adepositAmount)) {
          return alert("금액을 다시 입력해주세요.");  
        } else {
          console.log(datas);
          const updatedDatas = {
            adepositAmount: adepositAmount,
            aendDate: endDate,
            anum: Anum,
            atransferCycle: transferCycle
          };
          setDatas(prevDatas => ({
            ...prevDatas,
            ...updatedDatas
          }));
          console.log(datas);
          TransferService.updateOne(updatedDatas)
            .then(res => {
              alert("변경완료되었습니다!");
              navigate("/customer/transfer/auto_trans");
            })
            .catch(() => {
              return TransferService.updateOne();
            });
        }
      };
    return(
        <Container>
            <h3 align='left'>자동이체 변경</h3>
            <hr />
            <Table align='center'>
            <tbody>
                <tr>
                    <td>
                    <h4 align='left'>자동이체 등록날짜</h4>
                    <p align='left'>{aregDate.slice(0, 10)}</p>
                    <p align='center'>금액, 이체종료일, 이체주기만 변경 가능</p>
                    <p align='right'> 자동이체 상태 = {aState}</p>
                            <Form.Label ><h4>출금계좌</h4></Form.Label>
                            <Form.Control
                            readOnly
                            value={acNumber}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            />  
                    </td> 
                </tr>
                
                <tr>
                    <td>
                       <Row>
                            <Col>
                                <Form.Label ><h4>받는분</h4></Form.Label>
                                <Form.Control
                                    readOnly
                                    value={yourMemo}
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                /> 
                            </Col>
                            <Col>
                                <Form.Label ><h4>금액</h4></Form.Label>
                                <Form.Control
                                    
                                    value={adepositAmount}
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={(e) => setAdepositAmount(parseInt(e.target.value))}
                                /> 
                            </Col>
                        </Row>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Row>
                            <Form.Label ><h4 >이체기간</h4></Form.Label>
                            <Col>
                                    <Form.Label><h4>이체시작일</h4></Form.Label>
                                    <Form.Control
                                        readOnly
                                        type="date"
                                        value={startDate.slice(0, 10)}
                                        placeholder="원(KRW)"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        />
                            </Col>
                            <Col>
                                <Form.Label><h4>이체종료일</h4></Form.Label>
                                <Form.Control
                                    type="date"
                                    value={endDate.slice(0, 10)}
                                    placeholder="원(KRW)"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={(e) => setEndDate(e.target.value)}
                                    />
                            </Col>
                        </Row>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Row>
                            <Col>
                                <Form.Label ><h4>이체주기(개월)</h4></Form.Label>
                                <Form.Control
                                    type="number"
                                    maxLength={2}
                                    max={12}
                                    value={transferCycle}
                                    onChange={(e) => setTransferCycle(e.target.value)}
                                    />
                            </Col>
                            <Col>
                                <Form.Label><h4>이체한도</h4></Form.Label>
                                <Form.Control
                                    readOnly
                                    value={trsfLimit}
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                />
                            </Col>
                        </Row>
                    </td>
                </tr>
                
            </tbody>
            </Table>
            <div className="mb-2" align='center'>
            <Button variant="primary" size="lg" onClick={updateAutoTransfer} >
                변경
                </Button> {' '}
                <a href="/customer/transfer/auto_trans"><Button variant="secondary" size="lg">
                이전
                </Button></a>
            </div>
        </Container>
    )
}
export default AutoTransDetail;