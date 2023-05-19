// 적금 상품d
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {Form, Col, Row, Button, InputGroup, ListGroup, Stack } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import PdSavingService from './PdSavingService';
import SearchItem from "./SearchItem";

function PdSaving () {

    // SavingProduct 
    const [pdSavingList, setPdSavingList] = useState([]);
    // search
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchVisible, setSearchVisible] = useState(false);

    // onClick → searchProduct
    const searchProduct = () => {
        console.log('검색버튼 클릭');
        setSearchVisible(!searchVisible);
    }

    const style = {
        color: "green",
    }

    const label = {
        textAlign: "center",
    }

    const navigator = useNavigate();

    // PdSavingService를 통해서 상품정보 불러오기
    useEffect(() => {
        reloadPdSavingList();
    }, []);

    const reloadPdSavingList = () => {
        PdSavingService.custSavingList()
        .then((res) => {
            setPdSavingList(res.data)
        })
        .catch((err) => {
            console.log('reloadPdSavingList() Error!!', err);
        })
    }

    // onClick → goDetail 해당 상품 상세페이지로 이동
    const goDetail = (spdname) => {
        window.localStorage.setItem("spdname", spdname);
        navigator('/customer/product/saving/pdSavingDetail');
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
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={searchProduct}>
                     검색 
                    </Button>
                </InputGroup>
                </Col>
            </Form.Group>
        </Form>
        {searchVisible && <SearchItem inputs={searchKeyword}/>}
        <br/>
        <br/>

        {!searchVisible && pdSavingList.map(pdSaving =>
            <div key={pdSaving.spdname}>
                <hr />
                <ListGroup variant="flush" key={pdSaving.spdname}>
                    <ListGroup.Item>
                    <Row>
                        <Stack direction="horizontal" gap={3} >
                        <div>
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
        <hr/>
        </div>
    );

}
export default PdSaving;