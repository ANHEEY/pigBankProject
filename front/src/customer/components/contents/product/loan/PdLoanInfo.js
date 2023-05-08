import { Container, Row, Col } from 'react-bootstrap'

function PdLoanInfo({props}) {
    
  const style = {
        fontWeight: 'bold',
        color: 'black',
    }

    return(
        <Container>
          <hr />
          <Row className="justify-content-md-center"> 
            <Col style={style} lg={2}>
              상품특징
            </Col>
            <Col>
                  <p>
                    - {props.lsubTitle}<br/>
                    - {props.lcontent}
                  </p>
            </Col>
          </Row>

          <hr />
          <Row className="justify-content-md-center"> 
            <Col style={style} lg={2}>
              대출신청자격
            </Col>
            <Col>
                  <p>
                    - {props.lgrade} <br />
                    - 회원 등급에 대한 자세한 사항은 문의바랍니다.
                  </p>
            </Col>
          </Row> 

          <hr />
          <Row className="justify-content-md-center"> 
            <Col style={style} lg={2}>
              대출금액
            </Col>
            <Col>
                <p>
                - 최대{' '}
                  {props.lmaxPrice && (
                    <span>{(props.lmaxPrice).toLocaleString()}</span>
                  )}만원 이내
                </p>
            </Col>
          </Row>

          <hr />
          <Row className="justify-content-md-center"> 
            <Col style={style} lg={2}>
              대출기간 및 상환방법
            </Col>
            <Col>
                  <p>
                  - {props.ltype} : 최장 {props.lmaxPeriod}년가능
                  </p>
            </Col>
          </Row>
      </Container>
    );      
}

export default PdLoanInfo;