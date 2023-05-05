// 입출금 상품(일반계좌)
import React from "react";
import { Table, Tab, Tabs, Row, Col, Container, Button, Card, Stack } from 'react-bootstrap';
import { GiPresent } from "react-icons/gi";
import { BiUserCheck } from "react-icons/bi";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PdAccountInfo from './PdAccountInfo';

function PdAccount () {

    const navigate = useNavigate();

    const goRegister = () => { 
  
      /* window.localStorage.setItem(); */
      navigate('/customer/product/account/application');
    }

    return (
        <Container style={{width: "90%"}}>
            <br/>
            <br/>
            <br/>
            <Card>
                <Card.Header as="h2">꿀꿀 자유입출금</Card.Header>
                <br/><br/>
                <Card.Body style={{textAlign:"center"}}>
                    <Row>
                        <Col>
                        <BiUserCheck size="60" color="#009000"/>
                        <Card.Title className="mt-3">대상</Card.Title>
                        <Card.Text>
                            실명의 개인
                        </Card.Text>
                        </Col>
                        <Col>
                        <GiPresent size="60" color="#009000" />
                        <Card.Title className="mt-3">혜택</Card.Title>
                        <Card.Text>
                            수수료 면제
                        </Card.Text>
                        </Col>
                    </Row>
                    <br/><br/>
                    <Stack direction="horizontal" gap={2} className="col-md-3 mx-auto justify-content-center">
                        <Button className="button " variant="success" size="lg" onClick={goRegister}>상품신청</Button>
                    </Stack>
                    <br/>
                </Card.Body>
            </Card>
            <br />
            <br />
            <br />

            <Tabs
            defaultActiveKey="longer-tab"
            id="fill-tab-example"
            className="mb-3"
            fill 
            >

            <Tab eventKey="home" title="상품안내">
                <PdAccountInfo /> 
            </Tab>

            {/* <Tab eventKey="profile" title="금리및이율">
                <Container>
                    <hr />
                    <Row className="justify-content-md-center"> 
                    <Col className="style" lg={2} >
                        금리
                    </Col>
                    <Col>
                        <Table bordered style={{textAlign:"center"}}>
                            <thead>
                            <tr>
                                <th>분류</th>
                                <th>금리(연율,세전)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>-</td>
                                <td>0.1%</td> 
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                    </Row>
                </Container>
            </Tab> */}
            <Tab eventKey="longer-tab" title="유의사항">
                <Container>
                <hr />
                <Row className="justify-content-md-center"> 
                    <Col className="style" lg={2}>
                    예금 유의사항
                    </Col>
                    <Col>
                        <p>
                            - 이 금융상품을 가입(계약)하시기 전에 상품설명 및 약관을 읽어보시기 바랍니다.<br/>
                            - 금융소비자는 해당 상품 또는 서비스에 대하여 설명받을 권리가 있습니다.<br/>
                            - 전월 입금 실적 산정 시 당행 본인 명의 계좌에서 이체된 건 및 본인의 주민등록번호로 입금된 건은 제외됩니다.<br/>
                            - 통장이 '전기통신금융사기피해방지 및 피해금 환급에 관한 특별법'에서 정의한 피해의심거래계좌 및 사기이용계좌로 이용될 경우 이체, 송금지연, 지급정지 등의 금융거래 제한조치를 할 수 있습니다.<br/>
                            - 계좌에 압류, 기압류 등이 등록될 경우 원금 및 이자 지급이 제한될 수 있습니다.<br/>
                            - 이 상품은 PIGBANK가 관리하는 상품입니다. 기타 상품에 대한 자세한 사항은 고객센터로 문의하시기 바랍니다.
                        </p>
                    </Col>
                </Row>

                <hr />
                <Row className="justify-content-center"> 
                    <Col className="style" lg={2} >
                    거래방법
                    </Col>
                    <Col>
                        <p>
                            - 신규: PIGBANK<br/>
                            - 해지: PIGBANK<br/>
                            - 전환: PIGBANK<br/>
                        </p>
                    </Col>
                </Row> 

                <hr />
                <Row className="justify-content-md-center"> 
                    <Col className="style" lg={2}>
                    예금자보호여부
                    </Col>
                    <Col>
                    <p>
                    - 이 예금은 예금자보호법에 따라 예금보험공사가 보호하되, 보호 한도는 본 은행에 있는 귀하의 모든 예금보호 대상 금융상품의 원금과 소정의 이자를 합하여 1인당 "최고 5천만원"이며, 5천만원을 초과하는 나머지 금액은 보호하지 않습니다.<br/>
                    * 준법감시인 심의필 제2023-1295-2호(2023.04.04)<br/>
                    * 본 공시내용의 유효기간 : 2023.04.17~2025.01.25까지
                    </p>
                    </Col>
                </Row>
                </Container>
            </Tab>
            </Tabs>
            <br/>
            <br/>
            <br/>
        </Container>
    )
}
export default PdAccount;