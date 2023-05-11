import React, { useEffect, useState } from 'react';
import { Table, Tab, Tabs, Row, Col, Container, Button, Card, Stack } from 'react-bootstrap';
import {MdOutlineDateRange, MdOutlineMoney, MdAutoGraph} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import PdSavingService from './PdSavingService';
import SPdCalculator from './SPdCalculator';

function PdsavingDetail () {
    
    const [selectBySProduct, setSelectBySProduct] = useState([]);

    useEffect(() => {
        console.log(window.localStorage.getItem("spdname"));
        PdSavingService.custSPdDetail(window.localStorage.getItem("spdname"))
            .then((res) => {
                setSelectBySProduct(res.data)
            })
            .catch((err) => {
                console.log('PdSavingService.custSPdDetail Error!!', err);
            })

    }, []);


    const navigate = useNavigate();

    const goRegister = () => { 
        /* window.localStorage.setItem(); */
        navigate('/customer/product/saving/application');
    }
    const savingList = () => {
        navigate('/customer/product/pdSaving');
    }

    return (
        <div className="container">
            <br/><br/><br/>
            <Container style={{width: "100%"}}>
                <Card>
                    <Card.Header as="h2">{selectBySProduct.spdname}</Card.Header>
                    <br/><br/>
                    <Card.Body style={{textAlign:"center"}}>
                    <Row>
                        <Col>
                        <MdOutlineDateRange size="50" color="#009000"/>
                        <Card.Title className="mt-3">가입기간</Card.Title>
                        <Card.Text>
                            {selectBySProduct.speriod}개월
                        </Card.Text>
                        </Col>
                        <Col>
                        <MdOutlineMoney size="50" color="#009000" />
                        <Card.Title className="mt-3">금액</Card.Title>
                        <Card.Text>
                            {selectBySProduct.smin}만원 ~ {selectBySProduct.smax}만원
                        </Card.Text>
                        </Col>
                        <Col>
                        <MdAutoGraph size="50" color="#009000"/>
                        <Card.Title className="mt-3">최고</Card.Title>
                        <Card.Text>
                            연 {selectBySProduct.srate}%({selectBySProduct.speriod}개월)
                        </Card.Text>
                        </Col>
                    </Row>
                    <br/><br/>
                    <Stack direction="horizontal" gap={2} className="col-md-3 mx-auto">
                        <Button className="button" variant="success" size="lg" onClick={goRegister}>상품신청</Button>
                        <Button variant="outline-secondary" size="lg" onClick={savingList}>상품목록</Button>
                    </Stack>
                    <br/>
                    </Card.Body>
                    <Card.Footer>
                        <Card.Title className="mt-3" as="h4">적금 계산기</Card.Title>
                        <br/>
                        <SPdCalculator/>
                    </Card.Footer>
                </Card>
                <br />
                <br />
                <br />

                <Tabs
                defaultActiveKey="profile"
                id="fill-tab-example"
                className="mb-3"
                fill 
                >

                <Tab eventKey="home" title="상품안내">
                    <Container>
                        <hr />
                        <Row className="justify-content-md-center">
                            <Col className="style" lg={2}>
                                상품설명
                            </Col>
                            <Col>
                                <p>
                                    {selectBySProduct.scontent}
                                </p>
                            </Col>
                        </Row>

                        <hr />
                        <Row className="justify-content-md-center">
                            <Col className="style" lg={2}>
                                가입기간
                            </Col>
                            <Col>
                                <p>
                                    {selectBySProduct.speriod}개월 <br />
                                    ※ 모든 적금은 최소 12개월부터 가입이 가능합니다.
                                </p>
                            </Col>
                        </Row>

                        <hr />
                        <Row className="justify-content-md-center">
                            <Col className="style" lg={2}>
                                가입금액
                            </Col>
                            <Col>
                                <p>
                                    월 {selectBySProduct.smin} ~ {selectBySProduct.smax}만원
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Tab>

                <Tab eventKey="profile" title="금리및이율">
                    <Container>
                        <hr />
                        <Row className="justify-content-md-center"> 
                        <Col className="style" lg={2} >
                            기본금리(자유)
                        </Col>
                        <Col>
                            <Table bordered style={{textAlign:"center"}}>
                                <thead>
                                <tr>
                                    <th>계약기간</th>
                                    <th>금리</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>6개월이상 ~ 12개월미만</td>
                                    <td>2.30</td>
                                </tr>
                                <tr>
                                    <td>12개월이상 ~ 24개월미만</td>
                                    <td>2.60</td>
                                </tr>
                                <tr>
                                    <td>24개월이상 ~ 36개월미만</td>
                                    <td>2.90</td>
                                </tr>
                                <tr>
                                    <td>36개월</td>
                                    <td>3.10</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                        </Row>

                        <hr />
                        <Row className="justify-content-md-center"> 
                        <Col className="style" lg={2} >
                            기본금리(정액)
                        </Col>
                        <Col>
                            <Table bordered style={{textAlign:"center"}}>
                                <thead>
                                <tr>
                                    <th>계약기간</th>
                                    <th>금리</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>6개월이상 ~ 12개월미만</td>
                                    <td>2.35</td>
                                </tr>
                                <tr>
                                    <td>12개월이상 ~ 24개월미만</td>
                                    <td>2.65</td>
                                </tr>
                                <tr>
                                    <td>24개월이상 ~ 36개월미만</td>
                                    <td>2.95</td>
                                </tr>
                                <tr>
                                    <td>36개월</td>
                                    <td>3.15</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey="longer-tab" title="유의사항">
                <Container>
                    <hr />
                    <Row className="justify-content-md-center"> 
                        <Col className="style" lg={2}>
                        거래방법
                        </Col>
                        <Col>
                            <p>
                                - 신규: PIGBANK<br/>
                                - 해지: PIGBANK<br/>
                                - 만기 자동해지 신청가능<br/>
                                ※ 만기 자동해지를 신청하는 경우 만기자동 해지 및 지정계좌로 입금
                            </p>
                        </Col>
                    </Row>

                    <hr />
                    <Row className="justify-content-md-center"> 
                        <Col className="style" lg={2}>
                        예금유의사항
                        </Col>
                        <Col>
                            <p>
                                - 이 상품은 공동명의로 가입할 수 없습니다.<br/>
                                - 이 상품은 전자금융거래 제한계좌 등록 불가하며, 원칙적으로 통장발행이 되지 않습니다. 통장발행을 원하는 경우 영업점에 방문하셔야 하며 수수료가 부과됩니다.<br/>
                                - 급여이체 계약에 의하지 않은 일반 이체거래에 의한 입금 건은 급여이체실적으로 인정되지 않으니 유의하시기 바랍니다.<br/>
                                - 이 금융상품을 가입하시기 전에 상품설명서 및 약관을 읽어보시기 바랍니다.<br/>
                                - 금융소비자는 해당 상품 또는 서비스에 대하여 설명받을 권리가 있습니다.<br/>
                                - 만기 전 해지할 경우 계약에서 정한 이율보다 낮은 중도해지이율이 적용됩니다.<br/>
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

                    <hr />
                    <Row className="justify-content-md-center"> 
                        <Col className="style" lg={2}>
                        위법계약해지권
                        </Col>
                        <Col>
                        <p>
                        금융소비자 보호에 관한 법률 제47조에 따른 위법계약해지 사유가 발생한 경우, 계약체결일로부터 5년 이내 범위에서 위반사실을 안 날로부터 1년 이내에 서면 등으로 해당 계약의 해지를 요구할 수 있습니다. 
                        이 경우 금융회사는 해지를 요구받은 날부터 10일 이내에 금융소비자에게 수락 여부를 통지하여야 하며, 거절할 때에는 거절사유를 함께 통지하여야 합니다. 
                        만약 금융소비자의 요구가 정당한 것으로 판단될 경우 수수료 등 계약해지와 관련한 추가 비용 부담없이 계약해지가 가능합니다.
                        </p>
                    </Col>
                    </Row>

                    <hr />
                    <Row className="justify-content-md-center"> 
                        <Col className="style" lg={2}>
                        상품 가입채널
                        </Col>
                        <Col>
                        <p>
                        - 영업점, 고객센터 (1588-0000 - 0 - 2)
                        </p>
                    </Col>
                    </Row>

                    <hr />
                    <Row className="justify-content-md-center"> 
                        <Col className="style" lg={2}>
                        필요서류
                        </Col>
                        <Col>
                            <p>
                            - 본인신분증 (주민등록증, 자동차운전면허증,국내에서 발행한 여권 등)<br />
                            - 재직확인서류 (재직증명서 등)<br />
                            - 소득확인서류 (근로소득원천징수영수증 등)<br />
                            </p>
                    </Col>
                    </Row>
                    </Container>
                </Tab>
                </Tabs>
            </Container>
            <br/><br/><br/>
        </div>
    )
    
}
export default PdsavingDetail;
