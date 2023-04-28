import React, { Component } from "react"
import AgreeAccordion from "../product-application/AgreeAccordion"
import {Form,Button, Row, Col} from 'react-bootstrap'
import '../../../../resources/css/product/application-form.css'

class ProductApplication extends Component {
    
    constructor(props) {

        super(props);
        
        this.state = {
            acPwd: ''
        }
    }
        
    onChange = (e) => {
        this.setstate({
            [e.target.name] : e.target.value
            
        })
    }



    render() {
        return(
            <div className="applicaiton container">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" type = "text/css"/>
                <h1>입출금 상품 가입</h1>
                <br/>
                <AgreeAccordion/>
                <br/>
                <Form className="formArea">
                    <br/>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">상품명</Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                readOnly 
                                defaultValue={'꿀꿀 자유입출금'}
                                name=""  />
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">가입자명</Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                readOnly
                                defaultValue="이곳에 가입자명 입력"
                                name=""  />
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">계좌 비밀번호</Form.Label>
                        <Col sm="10">
                            <Form.Control 
                                type="password"
                                size="4" 
                                placeholder="비밀번호 4자리를 입력하세요."
                                name="acPwd"
                                value={this.state.acPwd}
                                onChange={this.onChange}
                            />
                        </Col>
                    </Form.Group>
                    <br/>
                    <h5>계좌 이체한도 안내 </h5>
                    <div className="limitInfo">
                        <p><b>1일 이체한도 </b> 2,000,000원</p>
                        <p><b>1회 이체한도 </b> 2,000,000원</p>
                    </div>
                    <div className="d-grid gap-2">
                        <Button style = {{background:'#9dc888',border:'#9dc888'}} size="lg" type="submit"> 가입하기 </Button>
                    </div>
                </Form>
            </div>
        )
    }
}
export default ProductApplication