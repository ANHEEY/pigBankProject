// 예금 상품
import { Typography } from "@mui/material";
import React from "react";
import {Form, Col, Row, Button, InputGroup, ListGroup, Stack } from 'react-bootstrap';
import { useNavigate,Link } from "react-router-dom";


function PdDeposit () {
    const style = {
        color: "green",
    }

    const label = {
        textAlign: "center",
    }

    const navigate = useNavigate();
    
    const goDetail=(dpdName)=> { 

        /* window.localStorage.setItem(); */
        window.localStorage.setItem("dpdName", dpdName);
        navigate('/customer/product/deposit/pdDepositDetail');
        // PdDepositService.pdDepositDetailInfo(dpdName)
        //     .then(res=>{

        // });
    }

    return (
       <div className="container">
        <br/><br/><br/><br/>
        <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2" style={label}>
            * 상품명
            </Form.Label>
            <Col sm="10">
                <InputGroup className="mb-3">
                    <Form.Control
                    placeholder="찾으시는 예금상품명을 입력하세요."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                    Button
                    </Button>
                </InputGroup>
            </Col>
            </Form.Group>
        </Form>
        
        <br/>
        <br/>
        <br/>
        <br/>
        <hr />
        <ListGroup variant="flush">
            <ListGroup.Item>
            <Row>
                <Stack direction="horizontal" gap={3}>
                <div>
                        <p>인터넷뱅킹 | 피그뱅크 | 예금상품</p>
                        <Typography variant="h4" style={{ fontWeight: 'bold'}}>예금상품명</Typography><br />
                        <p>상품설명</p>
                        <p>금리 <span style={style}>5%</span></p>
                </div>
                <div className="ms-auto">
                <Button variant="success" onClick={goDetail}>신청하기</Button>
                </div>
                </Stack>
            </Row>

            </ListGroup.Item>
        </ListGroup>

        <hr />
        <ListGroup variant="flush">
            <ListGroup.Item>
            <Row>
                <Stack direction="horizontal" gap={3}>
                <div>
                        <p>인터넷뱅킹 | 피그뱅크 | 예금상품</p>
                        <Typography variant="h4" style={{ fontWeight: 'bold'}}>예금상품명</Typography><br />
                        <p>상품설명</p>
                        <p>금리 <span style={style}>5%</span></p>
                </div>
                <div className="ms-auto">
                <Button variant="success" onClick={goDetail}>신청하기</Button>
                </div>
                </Stack>
            </Row>

            </ListGroup.Item>
        </ListGroup>

        <hr />
        <ListGroup variant="flush">
            <ListGroup.Item>
            <Row>
                <Stack direction="horizontal" gap={3}>
                <div>
                        <p>인터넷뱅킹 | 피그뱅크 | 예금상품</p>
                        <Typography variant="h4" style={{ fontWeight: 'bold'}}>예금상품명</Typography><br />
                        <p>상품설명</p>
                        <p>금리 <span style={style}>5%</span></p>
                </div>
                <div className="ms-auto">
                <Button variant="success" onClick={goDetail}>신청하기</Button>
                </div>
                </Stack>
            </Row>

            </ListGroup.Item>
        </ListGroup>
        <Link to = '/customer/product/deposit/application'><h5>이곳을 클릭하면 상품 가입 페이지로 이동합니다 </h5></Link>
        </div>
      
)

}
export default PdDeposit;
 
