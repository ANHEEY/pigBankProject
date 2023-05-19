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
                    - 급여(연금) 실적이 없어도, 카드대금, 공과금 실적, 청약통장 저축 등으로 수수료를 아낄 수 있는 통장
                  </p>
            </Col>
          </Row>

          <hr />
          <Row className="justify-content-md-center"> 
            <Col style={style} lg={2}>
              가입대상
            </Col>
            <Col>
                  <p>
                    - 실명의 개인 (1인 1계좌)
                    ※ 개인사업자 및 서류 미제출 임의단체 포함
                    ※ 공동명의 가입 불가
                  </p>
            </Col>
          </Row> 

          <hr />
          <Row className="justify-content-md-center"> 
            <Col style={style} lg={2}>
              상품유형
            </Col>
            <Col>
                <p>
                - 입출금이 자유로운 예금 (보통예금, 저출예금)
                </p>
            </Col>
          </Row>
      </Container>
    );      
}

export default PdLoanInfo;