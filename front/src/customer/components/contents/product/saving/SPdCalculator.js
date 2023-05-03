import { Row, Col, Button, Stack, Form } from 'react-bootstrap';
import React,{useState} from "react";
import SPdResultCalculator from './SPdResultCalculator';

function SPdCalculator(){

    const [showResult, setShowResult] = useState(false);

    const [inputs,setInputs]=useState({
        amount:"",
        period:"",
        rate:"",
    });

    const onChange=(e)=>{
        const {value,name}=e.target;

        setInputs({
            ...inputs,
            [name]:value
        });
    }

    const calculator=(inputs)=>{
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
        <div>
            <br/>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Col sm={2}>
                <Form.Control onChange={onChange}
                    size="sm"
                    type="number"
                    name="amount"
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
                    name="period"
                    value={inputs.period}
                    placeholder="기간"
                    min={0}
                />
                </Col>
                개월 동안
                <Col sm={2}>
                <Form.Control onChange={onChange}
                    size="sm"
                    type="number"
                    name="rate"
                    value={inputs.rate}
                    placeholder="이자"
                    min={0}
                />
                </Col>
                %의 예금 상품에 저축하면?   
                <Col sm={3}>
                <Stack direction="horizontal" gap={3} >
                    <Button variant="success" size="sm" onClick={()=>calculator(inputs)}>계산하기</Button>
                    <Button variant="outline-success" size="sm" onClick={reset}>초기화</Button>
                </Stack>
                </Col>
                </Form.Group>
                {showResult && <SPdResultCalculator props={inputs} />}
        </div>
    );

}

export default SPdCalculator;