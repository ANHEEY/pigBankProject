// 적금 상품d
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {Form, Col, Row, Button, InputGroup, ListGroup, Stack } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";

import PdSavingService from './PdSavingService';

function PdSaving () {

    const [pdSavingList, setPdSavingList] = useState([]);

    useEffect(() => {
        reloadPdSavingList();
    }, []);

    const reloadPdSavingList = () => {
        PdSavingService.fetchMembers()
        .then((res) => {
            setPdSavingList(res.data)
        })
        .catch((err) => {
            console.log('reloadPdSavingList() Error!!', err);
        })
    }

    const navigator = useNavigate();

    const goDetail = (spdname) => {

        window.localStorage.setItem("spdname", spdname);
        navigator('/customer/product/saving/pdSavingDetail');
    }

    const style = {
        color: "green",
    }

    const label = {
        textAlign: "center",
    }

    return (
    <div className="container">
        <br/><br/><br/><br/>
        <Form style={{width: "90%"}}>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2" style={label}>
            * 상품명
            </Form.Label>
            <Col sm="10">
                <InputGroup className="mb-3">
                    <Form.Control
                    placeholder="찾으시는 적금상품명을 입력하세요."
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

        {pdSavingList.map(pdSaving =>
                <div key={pdSaving.spdname}>
                    <hr />
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                        <Row >
                            <Stack direction="horizontal" gap={3} >
                            <div >
                                <p>인터넷뱅킹 | 피그뱅크 | 적금상품</p>
                                <Typography variant="h4" style={{ fontWeight: 'bold'}}>{pdSaving.spdname}</Typography><br />
                                <p>{pdSaving.scontent}</p>
                                <p>금리 <span style={style}>{pdSaving.srate}%</span></p>
                            </div>
                            <div className="ms-auto">
                            <Button variant="success" onClick={() => goDetail(pdSaving.spdname)}>신청하기</Button>
                            </div>
                            </Stack>
                        </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            )}
        </div>
    );

}
export default PdSaving;