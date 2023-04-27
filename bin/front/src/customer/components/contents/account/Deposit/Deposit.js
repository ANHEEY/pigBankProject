// 예금조회
import React, { Component } from "react"
import {Form,Button, Row, Col,InputGroup} from 'react-bootstrap'
import '../../../../resources/css/product/chu.css';
import AllService from "../All/AllService";
import {Link} from 'react-router-dom';

class Deposit extends Component {

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
        AllService.fetchDeposit()
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
          (member) => member.dpdName.indexOf(this.state.selectedOption) !== -1
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
                                    <option key={member.dpdName} value={member.dpdName}>{member.dpdName}</option>
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
                                <Form.Control readOnly defaultValue={member.dpdName} />
                            </Col>
                        </Form.Group>
                        <br/>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">계좌번호</Form.Label>
                            <Col sm="10">
                                <Form.Control readOnly defaultValue={member.dnum} />
                            </Col>
                        </Form.Group>
                        <br/>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">잔액</Form.Label>
                            <Col sm="10">
                                <Form.Control readOnly defaultValue={member.damount} />
                            </Col>
                        </Form.Group>
                        <br/>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">가입날짜</Form.Label>
                            <Col sm="10">
                            <Form.Control readOnly defaultValue={member.djoinDate}/>
                            </Col>
                        </Form.Group>
                        <br/>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">만기날짜</Form.Label>
                            <Col sm="10">
                            <Form.Control readOnly defaultValue={member.dendDate}/>
                            </Col>
                        </Form.Group>
                        <br/>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">예상금리금액</Form.Label>
                            <Col sm="10">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>₩</InputGroup.Text>
                                    <Form.Control placeholder={member.dexpAmount}/> 
                                </InputGroup>
                            </Col>
                        </Form.Group>
                    </Form>
                   
                    ))}
                    <div className="d-grid gap-2">
                        <Button as={Link} to="/customer/account/All" type="submit" style={{ background: '#9dc888', border: '#9dc888' }} size="lg">
                            HOME
                        </Button>
                    </div>
                </div>

                SELECT a.id, da.acNumber, da.d_pdName, da.d_amount, da.d_expAmount, da.d_joinDate, da.d_endDate, da.d_deAccount<br/>
                FROM d_account_tbl da, deposit_product d, account_tbl a<br/>
                WHERE da.d_pdName = d.d_pdName<br/>
                AND da.acNumber = a.acNumber<br/>
                AND a.id='hong1234'; -- 예금계좌 리스트<br/>
            </div>
        )
    }
}
export default Deposit;