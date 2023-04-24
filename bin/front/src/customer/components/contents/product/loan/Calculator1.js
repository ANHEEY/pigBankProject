// 계산기
import {Tab, Tabs, Row, Col, Button, Stack, Form} from 'react-bootstrap';
import React, { useState } from 'react';
import CalcResult from './CalcResult';

const Calculator1 = () => {

    const [showResult, setShowResult] = useState(false);

    const [inputs, setInputs] = useState({
        amount: "",
        period: "",
        rate: "",
    });
    
    { /* tabs 클릭시 showResult 컨트롤 */}
    const handleClick = () => {
        setShowResult(false);
    }

    const onChange = (e) => {
        const value = e.target.value;
        const id = e.target.id;
  
        setInputs({
          ...inputs,
          [id]: value,
        });
    }
   
    { /* 계산하기 */}
    const calculator = () => {
        setShowResult(true);

        const newData = {
          amount: inputs.amount,
          period: inputs.period,
          rate: inputs.rate,
        }
  
        console.log(newData);
  
        setInputs({ 
          amount: "", 
          period: "", 
          rate: "" 
        })
        
    }

    return(
        <>
        <Tabs
            defaultActiveKey="cal1"
            id="fill-tab-example"
            className="mb-3"
            fill
            onSelect={(eventKey) => handleClick(eventKey)}
        >
        <Tab eventKey="cal1" title="원리금균등상환"> 
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                <Form.Control onChange={onChange}
                    size="sm"
                    type="number"
                    id="amount"
                    value={inputs.amount}
                    placeholder="금액"
                />
                </Col>
                을
                <Col sm={2}>
                <Form.Control onChange={onChange}
                    size="sm"
                    type="number"
                    id="period"
                    value={inputs.period}
                    placeholder="기간"
                />
                </Col>
                개월 동안
                <Col sm={2}>
                <Form.Control onChange={onChange}
                    size="sm"
                    type="number"
                    id="rate"
                    value={inputs.rate}
                    placeholder="이자"
                />
                </Col>
                %의 적금상품에 저축 &nbsp; &nbsp; &nbsp; &nbsp;       
                <Col sm={3}>
                    <Stack direction="horizontal" gap={3} >
                        <Button variant="dark" size="sm" onClick={calculator}>계산하기</Button>
                        <Button variant="outline-dark" size="sm">초기화</Button>
                    </Stack>
                </Col>
            </Form.Group>

            {showResult && <CalcResult />}
        
        </Tab>

        <Tab eventKey="cal2" title="원금균등상환">
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                <Form.Control onChange={onChange}
                    size="sm"
                    type="number"
                    id="amount"
                    value={inputs.amount}
                    placeholder="금액"
                />
                </Col>
                을
                <Col sm={2}>
                <Form.Control onChange={onChange}
                    size="sm"
                    type="number"
                    id="period"
                    value={inputs.period}
                    placeholder="기간"
                />
                </Col>
                개월 동안
                <Col sm={2}>
                <Form.Control onChange={onChange}
                    size="sm"
                    type="number"
                    id="rate"
                    vaue={inputs.rate}
                    placeholder="이자"
                />
                </Col>
                %의 적금상품에 저축 &nbsp; &nbsp; &nbsp; &nbsp;       
                <Col sm={3}>
                <Stack direction="horizontal" gap={3} >
                <Button variant="dark" size="sm" onClick={calculator}>계산하기</Button>
                <Button variant="outline-dark" size="sm">초기화</Button>
                </Stack>
                </Col>
            </Form.Group>

            { /* 계산 결과 테이블  */}
            {showResult && <CalcResult />}

        </Tab>

        <Tab eventKey="cal3" title="만기일시상환">
            <Form.Group as={Row} className="mb-3">
                <Col sm={2}>
                <Form.Control onChange={onChange}
                    size="sm"
                    type="number"
                    id="amount"
                    value={inputs.amount}
                    placeholder="금액"
                />
                </Col>
                을
                <Col sm={2}> 
                <Form.Control onChange={onChange}
                    size="sm"
                    type="number"
                    id="period"
                    value={inputs.period}
                    placeholder="기간"
                />
                </Col>
                개월 동안
                <Col sm={2}>
                <Form.Control onChange={onChange}
                    size="sm"
                    type="number"
                    id="rate"
                    vaue={inputs.rate}
                    placeholder="이자"
                />
                </Col>
                %의 적금상품에 저축 &nbsp; &nbsp; &nbsp; &nbsp;       
                <Col sm={3}>
                    <Stack direction="horizontal" gap={3} >
                        <Button variant="dark" size="sm" onClick={calculator}>계산하기</Button>
                        <Button variant="outline-dark" size="sm">초기화</Button>
                    </Stack>
                </Col>
            </Form.Group> 

            {showResult && <CalcResult />}

        </Tab> 
    </Tabs>
    </>
    )
}

export default Calculator1;