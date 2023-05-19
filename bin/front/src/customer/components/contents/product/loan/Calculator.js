// 계산기
import {Tab, Tabs, Row, Col, Button, Stack, Form} from 'react-bootstrap';
import React, { useState } from 'react';
import WonriCalc from './WonriCalc';
import WonriGuemCalc from './WonriGuemCalc';
import MangiCalc from './MangiCalc';

const Calculator = () => {

    const [showResult, setShowResult] = useState(false);

    const [inputs, setInputs] = useState({
        amount: "",
        period: "",
        rate: "",
    });
    
    // tabs 클릭시 showResult 컨트롤
    const handleClick = () => {
        setShowResult(false);
        reset();
    }

    const onChange = (e) => {
        const value = e.target.value;
        const id = e.target.id;
  
        setInputs({
          ...inputs,
          [id]: value,
        });
    }
   
    // 계산하기
    const calculate = (inputs) => {
        if((inputs.amount != 0)&&(inputs.period != 0)&&(inputs.rate != 0)) {
            setShowResult(true);
        }
        else {
            alert("숫자를 입력해주세요.");
        }
    }
     
    const reset = () => {
        setInputs({
            amount: "", 
            period: "",
            rate: "",
        })

        setShowResult(false);
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
                    min={0}
                />
                </Col>
                만원을
                <Col sm={2}>
                <Form.Control onChange={onChange}
                    size="sm"
                    type="number"
                    id="period"
                    value={inputs.period}
                    placeholder="기간"
                    min={0}
                />
                </Col>
                년 동안
                <Col sm={2}>
                <Form.Control onChange={onChange}
                    size="sm"
                    type="number"
                    id="rate"
                    value={inputs.rate}
                    placeholder="이자"
                    min={0}
                />
                </Col>
                %로 대출 받으면?&nbsp; &nbsp; &nbsp; &nbsp;       
                <Col sm={3}>
                    <Stack direction="horizontal" gap={3} >
                        <Button variant="dark" size="sm" onClick={() => calculate(inputs)}>계산하기</Button>
                        <Button variant="outline-dark" size="sm" onClick={reset}>초기화</Button>
                    </Stack>
                </Col>
            </Form.Group>
            {showResult && <WonriGuemCalc props = {inputs} />}
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
                    min={0}
                />
                </Col>
                만원을
                <Col sm={2}>
                <Form.Control onChange={onChange}
                    size="sm"
                    type="number"
                    id="period"
                    value={inputs.period}
                    placeholder="기간"
                    min={0}
                />
                </Col>
                년동안
                <Col sm={2}>
                <Form.Control onChange={onChange}
                    size="sm"
                    type="number"
                    id="rate"
                    value={inputs.rate}
                    placeholder="이자"
                    min={0}
                />
                </Col>
                %로 대출 받으면? &nbsp; &nbsp; &nbsp; &nbsp;       
                <Col sm={3}>
                <Stack direction="horizontal" gap={3} >
                    <Button variant="dark" size="sm" onClick={() => calculate(inputs)}>계산하기</Button>
                    <Button variant="outline-dark" size="sm" onClick={reset}>초기화</Button>
                </Stack>
                </Col>
            </Form.Group>
            {showResult && <WonriCalc props = {inputs} />}
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
                    min={0}
                />
                </Col>
                만원을
                <Col sm={2}> 
                <Form.Control onChange={onChange}
                    size="sm"
                    type="number"
                    id="period"
                    value={inputs.period}
                    placeholder="기간"
                    min={0}
                />
                </Col>
                년 동안
                <Col sm={2}>
                <Form.Control onChange={onChange}
                    size="sm"
                    type="number"
                    id="rate"
                    value={inputs.rate}
                    placeholder="이자"
                    min={0}
                />
                </Col>
                %로 대출 받으면? &nbsp; &nbsp; &nbsp; &nbsp;       
                <Col sm={3}>
                <Stack direction="horizontal" gap={3} >
                    <Button variant="dark" size="sm" onClick={() => calculate(inputs)}>계산하기</Button>
                    <Button variant="outline-dark" size="sm" onClick={reset}>초기화</Button>
                </Stack>
                </Col>
            </Form.Group>
            {showResult && <MangiCalc props = {inputs} />}
        </Tab> 
    </Tabs>
    </>
    )
}

export default Calculator;