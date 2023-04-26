// 적금조회
import React, { Component } from "react";
import {Form,Button, Row, Col,InputGroup} from 'react-bootstrap';
import AllService from "../All/AllService";
import '../../../../resources/css/product/chu.css';
import {Link} from 'react-router-dom';

class Saving extends Component{
    
    
        constructor(props){
            super(props);
    
            this.state={
                members:[],
                message: null,
                selectedOption: ""
            }
        }
    
        // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 랜더링
    
        componentDidMount(){
            this.reloadMemberList();
        }
    
        reloadMemberList = () => {
            AllService.fetchSaving()
                .then(res=>{
                    this.setState({
                        members:res.data
                    })
                })
                .catch(err=>{
                    console.log('reloadMemberList() Error!!',err);
                });
        }
        
        handleChange = (event) => {
            this.setState({
            selectedOption: event.target.value
            });
        }
    
    
        render(){
            const filteredMembers = this.state.members.filter(
            (member) => member.spdName.indexOf(this.state.selectedOption) !== -1
            );
    
            return (
                <div>
                    <div className="applicaiton">
                        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" type = "text/css"/>
                        <h1>예금 계좌 조회</h1><br/>
                        
                        
                        
                        <Form className="formArea">
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">계좌선택</Form.Label>
                                <Col sm="5" value={this.state.selectedOption} onChange={this.handleChange}>
                                    <Form.Select>
                                        <option value="">계좌선택</option>
                                            {this.state.members.map((member) => (
                                        <option key={member.spdName} value={member.spdName}>{member.spdName}</option>
                                        ))}  
                                    </Form.Select>                                     
                                </Col>
                            </Form.Group>
                            
                        </Form>
                    
                        
                        {filteredMembers.map((member) => (
                        <Form className="formArea" >
                            
                            <hr/>
                            <br />
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">계좌명</Form.Label>
                                <Col sm="10">
                                    <Form.Control readOnly defaultValue={member.spdName} />
                                </Col>
                            </Form.Group>
                            <br/>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">계좌번호</Form.Label>
                                <Col sm="10">
                                    <Form.Control readOnly defaultValue={member.snum} />
                                </Col>
                            </Form.Group>
                            <br/>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">잔액</Form.Label>
                                <Col sm="10">
                                    <Form.Control readOnly defaultValue={member.samount} />
                                </Col>
                            </Form.Group>
                            <br/>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">가입날짜</Form.Label>
                                <Col sm="10">
                                <Form.Control readOnly defaultValue={member.sjoinDate}/>
                                </Col>
                            </Form.Group>
                            <br/>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">만기날짜</Form.Label>
                                <Col sm="10">
                                <Form.Control readOnly defaultValue={member.sendDate}/>
                                </Col>
                            </Form.Group>
                            <br/>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">예상금리금액</Form.Label>
                                <Col sm="10">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>₩</InputGroup.Text>
                                        <Form.Control placeholder={member.sexpAmount}/> 
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                        </Form>
                    
                        ))}
                         <Button as={Link} to="/customer/account/All" type="submit" style={{ background: '#9dc888', border: '#9dc888' }} size="lg">
                            HOME
                        </Button>
                    
                    </div>

                        SELECT *  <br/>
                        FROM s_account_tbl s, ACCOUNT_TBL a  <br/>
                        WHERE s.ACNUMBER = a.ACNUMBER  <br/>
                        AND id='hong1234'; <br/>

                        <br/>
                        <br/>
                </div>
    )           
    }
                        
}
export default Saving;