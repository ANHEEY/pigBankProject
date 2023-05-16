//고객 예금 상품 상세 페이지
import { Tab, Tabs, Row, Col, Container, Button, Card, Stack } from 'react-bootstrap';
import { SlCalender, SlGraph } from "react-icons/sl";
import { BsCash } from "react-icons/bs";
import '../../../../resources/css/PdLoanStyle.css';
import React,{useState,useEffect} from 'react';
import PdDepositService from './PdDepositService';
import { useNavigate } from "react-router-dom";
import DeCalculator from './DeCalculator';


function PdDepositDetail() {
  const navigate = useNavigate();

  const [depositProduct,setDepositProduct] = useState({
      dpdName:"",
      dcontent:"",
      dperiod:"",
      dmin:"",
      dmax:"",
      drate:"",
      dcxlRate:""
  });

  useEffect(()=>{
    depositDetail();
  },[]);

  const depositDetail = () =>{
    PdDepositService.pdDepositDetailInfo(window.localStorage.getItem("dpdName"))
      .then(res=>{
        setDepositProduct(res.data);
        console.log(res.data);
        localStorage.removeItem("dpdName");
      })
      .catch(err => {
        console.log('depositPdDetail() Error!!!', err);
     })
  }

  const pdJoin=(dpdName)=>{
    window.localStorage.setItem("dpdName",dpdName);
    navigate("/customer/product/deposit/application");
  }

  const move=()=>{
    navigate("/customer/product/pdDeposit");
  }

  return (
    <Container>
    <Card>
        <Card.Header as="h2">{depositProduct.dpdName}</Card.Header>
        <br/><br/>
        <Card.Body className="text-center">
          <Row>
            <Col>
              <SlCalender size="30" color="#009000"/>
              <Card.Title className="mt-3">가입기간</Card.Title>
              <Card.Text>
                최소 1개월부터 최대 {depositProduct.dperiod}개월까지
              </Card.Text>
            </Col>
            <Col>
              <SlGraph size="30" color="#009000" />
              <Card.Title className="mt-3">예금 금리</Card.Title>
              <Card.Text>
              {depositProduct.drate}%
              </Card.Text>
            </Col>
            <Col>
              <BsCash size="30" color="#009000"/>
              <Card.Title className="mt-3">예금 금액</Card.Title>
              <Card.Text>
                최소 {depositProduct.dmin && (<span>{depositProduct.dmin.toLocaleString()}</span>)}만원부터 최대 {depositProduct.dmax && (<span>{depositProduct.dmax.toLocaleString()}</span>)}만원까지
              </Card.Text>
            </Col>
          </Row>
        <br/><br/>
        <Stack direction="horizontal" gap={2} className="col-md-3 mx-auto">
          <Button className="button" variant="success" size="lg" onClick={()=>pdJoin(depositProduct.dpdName)} style={{background:"green", color:"white"}}>상품가입</Button>
          <Button variant="outline-dark" size="lg" onClick={move}>상품목록</Button>
        </Stack>
        <br/>
        </Card.Body>
        <Card.Footer>
        
        <Card.Title className="mt-3" as="h3"><span style={{color:"green"}}>예금 계산기</span></Card.Title>
          <br/>
          <DeCalculator/>         
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
      <Tab eventKey="profile" title="상품안내">
          <Container>
            <hr />
            <Row className="justify-content-md-center"> 
              <Col className="style" lg={2} >
                예금 예치 가능 금액
              </Col>
              <Col>
                    <p>
                    - 최소 {depositProduct.dmin && (<span>{depositProduct.dmin.toLocaleString()}</span>)}만원<br/>
                    - 최대 {depositProduct.dmax && (<span>{depositProduct.dmax.toLocaleString()}</span>)}만원
                    </p>
              </Col>
            </Row>
            <hr />
            <Row className="justify-content-md-center"> 
              <Col className="style" lg={2} >
                예금금리
              </Col>
              <Col>
                    <p>
                       {depositProduct.drate}%
                    </p>
              </Col>
            </Row>

            <hr />
            <Row className="justify-content-md-center"> 
              <Col className="style" lg={2}>
                중도 해지시 예금 금리 
              </Col>
              <Col>
                    <p>
                       {depositProduct.dcxlRate}%
                    </p>
              </Col>
            </Row>

            <hr />
            <Row className="justify-content-md-center"> 
              <Col className="style" lg={2}>
                상품설명
              </Col>
              <Col>
                    <p>
                      {depositProduct.dcontent}
                    </p>
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
                  - 신규 : 온라인 피그뱅크<br/>
                  - 해지 : 온라인 피그뱅크
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
                  이 예금은 예금자보호법에 따라 예금보험공사가 보호하되,
                    보호 한도는 본 은행에 있는 귀하의 모든 예금보호 대상 금융상품의<br/> 
                    원금과 소정의 이자를 합하여 1인당 “최고 5천만원”이며, 
                    5천만원을 초과하는 나머지 금액은 보호하지 않습니다
                </p>
          </Col>
        </Row> 

        <hr />
        <Row className="justify-content-md-center"> 
          <Col className="style" lg={2}>
          세제혜택
          </Col>
          <Col>
              <p>
               비과세종합저축으로 가입 불가
              </p>
          </Col>
        </Row>

        <hr />
      </Container>
    </Tab>
  </Tabs>
  </Container>
  );
}

export default PdDepositDetail;