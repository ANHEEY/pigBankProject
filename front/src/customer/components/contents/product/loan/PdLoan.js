// 고객 대출 상품 리스트
import React from "react";
import {Form, Col, Row, Button, InputGroup, ListGroup, Stack } from 'react-bootstrap';
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import PdLoanService from "./PdLoanService";
import SearchItem from "./SearchItem";

function PdLoan() {
    // 스타일 적용
    const style = {
        color: "green",
    }

    const label = {
        textAlign: "center",
    }

    const [listPdLoan, setListPdLoan]= useState([]);
    const [searchItem,setSearchItem]=useState('');
    const [searchVisible,setSearchVisible]=useState(false);
    
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

    // 검색 버튼 누름
    const searchPd=()=>{
        console.log("검색 누름!!!");
        setSearchVisible(!searchVisible);
    }

    // 상세보기 버튼
    const goDetail = (lpdName, lmaxPrice) => { 
        console.log(lpdName);
        window.localStorage.setItem("lpdName", lpdName);
        window.localStorage.setItem("lmaxPrice", lmaxPrice);
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
                        name="searchItem" 
                        value={searchItem}
                        onChange={(e)=>setSearchItem(e.target.value)}
                        />
                        <Button variant="outline-secondary" id="button-addon2" onClick={searchPd}>
                        검색
                        </Button>
                    </InputGroup>
                </Col>
                </Form.Group>
                {searchVisible && <SearchItem inputs={searchItem}/>}
            </Form>
            
            <br/>
            <br/>
            <br/>
            {!searchVisible && listPdLoan.map(product =>
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
                        <p>최고 <span style={style}>{product.lmaxPrice ? (product.lmaxPrice).toLocaleString() : ''}만원</span></p>
                    </div>
                    <div className="ms-auto">
                    <Button variant="success" onClick={() => goDetail(product.lpdName, product.lmaxPrice)}>신청하기</Button>
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