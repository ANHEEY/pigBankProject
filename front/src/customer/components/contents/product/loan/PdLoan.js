// 고객 대출 상품 리스트
import { Typography } from "@mui/material";
import React from "react";
import {Form, Col, Row, Button, InputGroup, ListGroup, Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import PdLoanService from "./PdLoanService";

function PdLoan() {
    // 스타일 적용
    const style = {
        color: "green",
    }

    const label = {
        textAlign: "center",
    }

    const [listPdLoan, setListPdLoan]= useState([])
    const navigate = useNavigate();

    useEffect(() => {
        PdLoanService.fetchProduct()
            .then(res => {
                setListPdLoan(res.data);
            })
            .catch(err => {
                console.log('fetchProductList Error', err);
            });
    }, []);

    const goDetail = (lpdName) => { 
        console.log(lpdName);
        window.localStorage.setItem("lpdName", lpdName);
        navigate('/customer/product/loan/pdLoanDetail');
    }

    return (
        <>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="container">
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2" style={label}>
                * 상품명
                </Form.Label>
                <Col sm="10">
                    <InputGroup className="mb-3">
                        <Form.Control
                        placeholder="찾으시는 대출상품명을 입력하세요."
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
            {listPdLoan.map(product =>
            <ListGroup variant="flush" key={product.lpdName}>
                <ListGroup.Item style={{ borderTop: '1px solid gray' }}>
                <br/>
                <Row>
                    <Stack direction="horizontal" gap={3}>
                    <div>   
                        <p>인터넷뱅킹 | 피그뱅크 | 대출상품</p>
                        <Typography variant="h4" style={{ fontWeight: 'bold'}}>{product.lpdName}</Typography><br />
                        <div>
                            <pre>{product.lsubTitle}</pre>
                        </div>
                        <p>최고 <span style={style}>{product.lmaxPrice.toLocaleString()}만원</span></p>
                    </div>
                    <div className="ms-auto">
                    <Button variant="success" onClick={() => goDetail(product.lpdName)}>신청하기</Button>
                    </div>
                    </Stack>
                </Row>
                </ListGroup.Item>
            </ListGroup>
            )}
            </div>
            </>
        )
    }
export default PdLoan;