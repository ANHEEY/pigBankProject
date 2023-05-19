// 채팅상담
import React from "react";
import { Button,Card,Row,Col} from 'react-bootstrap';


function Chatting () {

    const iconStyle = {
        color: 'green',
        fontSize: '3rem',
    };


    const chat = ()=>{
        window.open('http://192.168.0.17:3003', '_blank', 'width=800,height=1000');
    }
    return (
        <div className="container">
            <br/>
            <br/>
            <br/>
            <Card>
            <Card.Header as="h2" style={{backgroundColor:"#dbe2d872" }}>
                고객상담
            </Card.Header>
            <br/>
            <Card.Body>
                <Row className="text-center">
                    <Col className="col-md-2 mx-auto">
                        <i className="bi bi-clock-history" style={iconStyle}></i><br/>
                        <Card.Title>상담시간</Card.Title>
                        <Card.Text>
                           영업일: 08:00 ~ 22:00 <br/>
                           공휴일: 09:00 ~ 18:00
                        </Card.Text>
                    </Col>
                    <Col className="col-md-2 mx-auto">
                        <i className="bi bi-telephone-fill"  style={iconStyle}></i><br/>
                        <Card.Title>전화상담</Card.Title>
                        <Card.Text>
                            업무상담: 1588-0000 <br />
                            불편사항접수: 1588-1111
                        </Card.Text>
                    </Col>
                </Row>
                <hr></hr>
                <Row className="text-center">
                    <Col className="col-md-12 mx-auto">
                        <Card.Title>상담유의사항</Card.Title>
                        <Card.Text>
                           - 상담전 거래번호, 계좌번호와 같은 상세정보를 준비하시면 보다 신속하게 편리하게 상담 서비스를 이용하실 수 있습니다. <br/>
                           - 돼지은행은 산업안전보건법에 따라 폭언 등으로부터 직원을 보호합니다.<br/>
                             상담내용은 상담품질관리를 위해 저장됩니다.
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
            <br/> 
            <Card.Footer style={{backgroundColor:"#dbe2d872", textAlign: "center" }}>
            <Button variant="success" size='lg' style={{background:"green", color:"white"}} onClick={chat}>채팅시작</Button>     
            <br/>
            </Card.Footer>
            </Card>
            <br/>
            <br/>
            <br/> 
        </div>
    )
}
export default Chatting;