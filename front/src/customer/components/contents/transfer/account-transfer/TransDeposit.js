// 계좌이체
import React, {Component} from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ApiService from "../transfer-service/ApiService";

class TransDeposit extends Component {

    constructor(props){
        super(props);

        this.state={
            acounts:[],
            message: null,
            selectedacount: '',
        };
        this.onSelectedAccount = this.onSelectedAccount.bind(this);
    }

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 랜더링

    componentDidMount(){
        this.reloadAccountList();
    }

    reloadAccountList = () => {
       ApiService.fetchAccountList()    
            .then(res=>{
                this.setState({
                    acounts:res.data
                })
            })
            .catch(err=>{
                console.log('fetchAccountList() Error!!',err);
            });
      }

    onSelectedAccount(acount) {
        this.setState({
            selectedacount: acount,
        })
    }

    render (){
    return (
            <Container >
            <h3>출금정보</h3>
            <hr />
            <Table align="center">
                <tbody>
                    <tr>
                        <td>
                        <InputGroup.Text id="basic-addon1"  >출금 계좌번호</InputGroup.Text>
                        </td>
                        <td>
                        <Form.Control
                            value={this.state.selectedacount}
                            placeholder="-없이 입력해주세요"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            />  
                        </td>    
                             <td>
                             <Form.Select aria-label="Default select example" >
                                        <option>계좌선택</option>
                                    {this.state.acounts.map((acount) => (
                                       <option key={acount.acNumber} onClick={this.onSelectedAccount}>{acount.acNumber}</option>
                                       ))}
                                </Form.Select> 
                                
                             </td>
                             <td><Button variant="light">잔액조회</Button>{' '} </td>
                    </tr>
                    <tr>
                <       td>
                        <InputGroup.Text id="basic-addon1">계좌 비밀번호</InputGroup.Text>
                        </td>
                        <td>
                        <Form.Control
                            placeholder="숫자 4자리"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            />  
                        </td>    
                    </tr>
                     
                </tbody>
                </Table>
                <br/>
                <hr/>
                <h3>입금정보</h3>
                <hr />
                <Table align="center">
                    <tbody>
                        <tr>
                            <td>
                            <InputGroup.Text id="basic-addon1" >입금 계좌번호</InputGroup.Text>
                            </td>
                            <td>
                            <Form.Control
                                placeholder="-없이 입력해주세요"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                />  
                            </td>    
                                <td><Form.Select aria-label="Default select example">
                                    <option>본인계좌조회</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select> </td>
                        </tr>
                        <tr>
                    <       td>
                            <InputGroup.Text id="basic-addon1" >이체금액</InputGroup.Text>
                            </td>
                            <td>
                            <Form.Control
                                placeholder="원(KRW)"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                />  
                                
                            </td>    
                        </tr>
                        <tr>
                        <       td>
                            <InputGroup.Text id="basic-addon1" >내통장 메모</InputGroup.Text>
                            </td>
                            <td>
                            <Form.Control
                                placeholder="(선택)"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                />  
                            </td>
                        </tr>   
                        <tr>
                        <       td>
                            <InputGroup.Text id="basic-addon1" >받는통장 메모</InputGroup.Text>
                            </td>
                            <td>
                            <Form.Control
                                placeholder="받는 통장(계좌) 명의"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                />  
                            </td>   
                        
                        </tr>     
                    </tbody>
                </Table>
                <div className="mb-2" align='center'>
                    <Button variant="secondary" size="lg">
                    추가이체
                    </Button>{' '}
                    <a href="/customer/transfer/trans_reConfirm"><Button variant="primary" size="lg">
                    다음
                    </Button></a>
                </div>
                <br/>
                <div >
                </div>
            </Container>
        )
    }
}
export default TransDeposit;