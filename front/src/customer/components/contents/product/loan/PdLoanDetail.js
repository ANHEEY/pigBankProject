import React from 'react';
import { Table, Tab, Tabs, Row, Col, Container, Button, Card, Stack } from 'react-bootstrap';
import { SlCalender, SlGraph } from "react-icons/sl";
import { BsCash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import '../../../../resources/css/PdLoanStyle.css';
import PdLoanInfo from './PdLoanInfo';
import Calculator from './Calculator';

function PdLoanDetail() {

  const navigate = useNavigate();

  const goRegister = () => { 

    /* window.localStorage.setItem(); */
    navigate('/customer/product/loan/pdLoanApplication');
  }

  return (
    <Container>
      <Card>
        <Card.Header as="h2">든든한 행복 대출</Card.Header>
        <br/><br/>
        <Card.Body>
          <Row>
            <Col>
              <SlCalender size="30" color="#009000"/>
              <Card.Title className="mt-3">가입기간</Card.Title>
              <Card.Text>
                최대 3년
              </Card.Text>
            </Col>
            <Col>
              <SlGraph size="30" color="#009000" />
              <Card.Title className="mt-3">대출 금리</Card.Title>
              <Card.Text>
                3%
              </Card.Text>
            </Col>
            <Col>
              <BsCash size="30" color="#009000"/>
              <Card.Title className="mt-3">대출 금액</Card.Title>
              <Card.Text>
                최소 1만원부터 최대 100만원까지
              </Card.Text>
            </Col>
          </Row>
        <br/><br/>
        <Stack direction="horizontal" gap={2} className="col-md-3 mx-auto">
          <Button className="button" size="lg" onClick={goRegister}>대출신청</Button>
          <Button variant="outline-dark" size="lg"> 상품목록</Button>
        </Stack>
        <br/>
        </Card.Body>
        <Card.Footer>
        
        <Card.Title className="mt-3" as="h4">대출 계산기</Card.Title>
          <br/>
          { /*원리(금), 만기상환 tabs 시작 */}
          <Calculator /> 
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
        <PdLoanInfo /> 
    </Tab>

      <Tab eventKey="profile" title="금리및이율">
          <Container>
            <hr />
            <Row className="justify-content-md-center"> 
              <Col className="style" lg={2} >
                대출금리
              </Col>
              <Col>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>기준</th>
                        <th>기준금리</th>
                        <th>최저금리</th>
                        <th>최고금리</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>6개월</td>
                        <td>3.48</td>
                        <td>5.21</td>
                        <td>6.11</td>
                      </tr>
                      <tr>
                        <td>12개월</td>
                        <td>3.53</td>
                        <td>5.15</td>
                        <td>6.05</td>
                      </tr>
                    </tbody>
                </Table>
              </Col>
            </Row>

            <hr />
            <Row className="justify-content-md-center"> 
              <Col className="style" lg={2}>
                금리인하요구권 
              </Col>
              <Col>
                    <p>
                      - 본 상품은 금리인하요구권 신청이 가능합니다. 단, 은행의 심사결과에 따라 금리인하 요청이 반영되지 않을 수도 있습니다.
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
                      - 은행이 「금융소비자 보호에 관한 법률」에서 정하는 적합성, 적정성 및 설명의무를 위반하였거나, 불공정거래행위 혹은 부당권유를 하여 대출계약을 체결한 경우, 
                            법 위반사실을 안 날부터 1년 또는 계약서류 수령일·계약체결일·대출금 수령일로부터 5년 중 먼저 도달한 기간 이내에 서면, 전화, 컴퓨터 통신으로 해당 계약의 
                            해지를 요구할 수 있습니다. 해지를 요구받은 날부터 10일 이내에 고객에게 수락여부 및 그 사유를 고객에게 통지합니다.
                    </p>
              </Col>
            </Row> 
        </Container>
     </Tab>
     <Tab eventKey="longer-tab" title="이용안내">
       <Container>
          <hr />
          <Row className="justify-content-md-center"> 
            <Col className="style" lg={2}>
              담보
            </Col>
            <Col>
                  <p>
                    - 무보증
                  </p>
            </Col>
          </Row>

        <hr />
          <Row className="justify-content-md-center"> 
            <Col className="style" lg={2}>
              기한연장 관련 안내
            </Col>
            <Col>
                  <p>
                    - 일시상환방식 대출의 기한연장은 대출만기일 1개월 이전부터 가능하며, 만기일 전까지 영업점을 방문하셔서 필요한 절차(기한연장, 재대출, 대출상환 등)를 진행하셔야 
                  대출금에 대한 연체이자 발생 등 불이익이 발생하지 않습니다. 단, 은행이 정한 기준에 따라 자동기한연장 대상으로 선정 시 자동기한연장에 대해 동의하는 경우 자동기한연장 처리됩니다.
                  자동기한연장의 동의는 인터넷뱅킹, 콜센터, 영업점을 통하여 등록 가능합니다.
                  ※ 분할상환을 선택하는 경우 기한연장은 불가합니다.
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
  );
}

export default PdLoanDetail;