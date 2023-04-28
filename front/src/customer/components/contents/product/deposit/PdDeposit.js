// 예금 상품
import { Typography } from "@mui/material";
import React,{useState,useEffect} from "react";
import {Form, Col, Row, Button, InputGroup, ListGroup, Stack } from 'react-bootstrap';
import { useNavigate,Link } from "react-router-dom";
import PdDepositService from "./PdDepositService";


function PdDeposit () {
    const style = {
        color: "green",
    }

    const label = {
        textAlign: "center",
    }

    const navigate = useNavigate();

    const [depositProducts,setDepositProducts]=useState([]);

    useEffect(()=>{
        PdDepositService.pdDepositList()
            .then(res=>{
                setDepositProducts(res.data);
                console.log(res.data);
            })
            .catch(err=>{
                console.log('pdDepositList() 오류!!!!',err);
            });
    },[]);
    
    const dPdDetail=(dpdName)=> { 
        /* window.localStorage.setItem(); */
        window.localStorage.setItem("dpdName", dpdName);
        navigate('/customer/product/deposit/pdDepositDetail');
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
                    검색
                    </Button>
                </InputGroup>
            </Col>
            </Form.Group>
        </Form>
        
        <br/>
        <br/>
        <br/>
        <br/>
        {depositProducts.map(product=>
            
            <ListGroup variant="flush" key={product.dpdName}>
                <ListGroup.Item style={{borderTop:'1px solid gray'}}>
                <Row>
                    <Stack direction="horizontal" gap={3}>
                    <div>
                            <p>인터넷뱅킹 | 피그뱅크 | 예금상품</p>
                            <Typography variant="h4" style={{ fontWeight: 'bold'}}>{product.dpdName}</Typography><br />
                            <p>{product.dcontent}</p>
                            <p>금리 <span style={style}>{product.drate}%</span></p>
                    </div>
                    <div className="ms-auto">
                    <Button variant="success" onClick={()=>dPdDetail(product.dpdName)}>신청하기</Button>
                    </div>
                    </Stack>
                </Row>
    
                </ListGroup.Item>
            </ListGroup>
        )}
        <hr/>
        </div>
      
)

}
export default PdDeposit;
 
