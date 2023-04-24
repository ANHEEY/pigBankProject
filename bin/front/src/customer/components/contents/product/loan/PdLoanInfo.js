import { Container, Row, Col } from 'react-bootstrap'

function PdLoanInfo() {
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
                    - 직장인이라면 신청 가능
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
                    - yellow <br />
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
                - 최대 3억원 이내
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
                  - 일시상환(종합통장자동대출 포함) : 1년(최장 10년이내 기한연장 가능)
                  </p>
            </Col>
          </Row>
      </Container>
    );      
}

export default PdLoanInfo;