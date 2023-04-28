// 대출계좌조회
import React, { Component } from "react";
import {Table, TableHead, TableRow, TableCell,  TableBody } from "@mui/material";
import AllService from "../All/AllService";
import "../../../../resources/css/product/saving.css";
import {Link} from 'react-router-dom';
import { Button, Stack } from 'react-bootstrap'; // npm install react-bootstrap bootstrap


class Loan extends Component{

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
        AllService.fetchLoan()
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
          
     formatCurrency=(value) => {
        const formatter = new Intl.NumberFormat("ko-KR", {
            style: "currency",
            currency: "KRW",
        });
        return formatter.format(value);
     }

    acNum(acNumber) {
        const acNum = acNumber.toString().slice(0, 3) + '-' + acNumber.toString().slice(3);
        return acNum;
    }
     

    render() {
        // members에서 selectedOption과 일치하는 항목만 필터링
        const filteredMembers = this.state.members.filter
            ((member) =>
            member.lpdName.indexOf(this.state.selectedOption) !== -1
          );
        

        const tableHeadStyle={
            fontWeight: "bold",
        }

        return (
        <main className="main">
            <section className="section">
             
            </section>
            
            <section className="section">
            <div className="container">
                <h2>대출계좌조회</h2>                

                    <p className="thead1">
                    <select value={this.state.selectedOption} onChange={this.handleChange}>
                    <option value="">계좌선택</option>
                        {this.state.members.map((member) => (
                    <option key={member.lpdName} value={member.lpdName}>{member.lpdName}</option>
                    ))}
                    </select>    
                    </p>  
                                        
                <div class="card text-center">
                    
                    <div class="card-header" style={{backgroundColor:"#dbe2d872" }}>
                        <ul class="nav nav-tabs card-header-tabs">
                        <li class="nav-item">
                            <a class="nav-link disabled" href="/customer/account/Loan">대출계좌</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="/customer/account/Saving" ><Link to="/customer/account/Saving">적금계좌</Link></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="/customer/account/Deposit"><Link to="/customer/account/Deposit">예금계좌</Link></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="/customer/account/LoanState"><Link to="/customer/account/LoanState">대출심사결과조회</Link></a>
                        </li>
                        </ul>
                    </div>
                </div>

                <div class="card-body">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={tableHeadStyle}>계좌명</TableCell>
                          <TableCell style={tableHeadStyle}>계좌번호</TableCell>
                          <TableCell style={tableHeadStyle}>가입기간</TableCell>
                          <TableCell style={tableHeadStyle}>용도</TableCell>
                          <TableCell style={tableHeadStyle}>한도</TableCell>
                          <TableCell style={tableHeadStyle}>상환잔액</TableCell>
                          <TableCell style={tableHeadStyle}>업무</TableCell>
                        </TableRow>
                      </TableHead>

                      {filteredMembers.map((member) => (
                      <TableBody key={member.lreqNum}>
                          <TableRow >
                            <TableCell style={{color:"purple"}}>{member.lpdName}</TableCell>
                            <TableCell>{this.acNum(member.acNumber)}</TableCell>
                            <TableCell>{member.lperiod}</TableCell>
                            <TableCell>{member.lpurpose}</TableCell>
                            <TableCell>{this.formatCurrency(member.trsfLimit)}</TableCell>
                            <TableCell>{this.formatCurrency(member.lamount)}</TableCell>
                            <TableCell>
                                <Stack gap={2} className="col-md-8">
                                <Button variant="outline-secondary"><Link to="/LoanSchedule" style={{color:"black"}}>상환스케쥴</Link></Button>
                                <Button variant="outline-secondary" type="button">상환내역</Button>
                                </Stack>
                            </TableCell>
                           </TableRow>
                      </TableBody>
                      ))}
                    </Table>
                </div>
            </div> 
            </section>
            <br />
            <br />
            <br />
          </main>
        );
      }
}

export default Loan;