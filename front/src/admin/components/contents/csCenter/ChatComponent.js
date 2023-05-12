import React, { Component } from "react";
import { Button,Card,Row,Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset} from "@fortawesome/free-solid-svg-icons";



class ChatComponent extends Component{
    
    render(){
        const chat = ()=>{
            window.location.href = "http://192.168.0.17:3003";
        }
        return(
            <div className="component-div">
                <div style={{ width: "1200px" }}>
                <Card>
                <Card.Header as="h2" style={{backgroundColor:"#dbe2d872" }}>
                <h1><FontAwesomeIcon icon={faHeadset}/> 채팅상담</h1>
                </Card.Header>
                <br/>
                <Card.Body>
                    <Row className="text-center">
                        <Col className="col-md-12 mx-auto">
                            <Card.Text style={{color: "green", fontWeight:"bold"}}>
                            서비스 정신이 조직 내에 깊이 배어 있지 않으면 서비스 품질 향상은 결코 이루어지지 않는다.
                            </Card.Text>
                            <br/>
                        </Col>
                        <Col className="col-md-2 mx-auto">
                            <Card.Title>상담시간</Card.Title>
                            <Card.Text>
                            영업일: 08:00 ~ 22:00 <br/>
                            공휴일: 09:00 ~ 18:00
                            </Card.Text>
                        </Col>
                        <Col className="col-md-12 mx-auto">
                        <br/>
                        <br/>
                        <Button variant="success" size='lg' style={{background:"green", color:"white"}} onClick={chat}>채팅 상담 시작하기</Button>     
                        </Col>
                    </Row>
                </Card.Body>
                </Card>
                <br/><br/>
                </div>
            </div>            
        )
    }
}
export default ChatComponent;