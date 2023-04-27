// 적금조회
import React, { Component } from "react";
import {Table, TableHead, TableRow, TableCell,  TableBody } from "@mui/material";
import AllService from "../All/AllService";

import {Link} from 'react-router-dom';
import "../../../../resources/css/product/saving.css";

class Account extends Component{
    
    
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
        AllService.fetchAccount()
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
        const filteredMembers = this.state.members.filter(
          (member) => member.acType.indexOf(this.state.selectedOption) !== -1
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
                <h2>입출금계좌조회</h2>                

                    <p className="thead1">
                    <select value={this.state.selectedOption} onChange={this.handleChange}>
                    <option value="">전체선택</option>
                        {this.state.members.map((member) => (
                    <option key={member.acType} value={member.acType}>{member.acType}</option>
                    ))}
                    </select>    
                    </p>  
                                        
                <div class="card text-center">
                    
                    <div class="card-header" style={{backgroundColor:"#dbe2d872" }}>
                        <ul class="nav nav-tabs card-header-tabs">
                        <li class="nav-item">
                            <a class="nav-link disabled" href="/customer/account/Saving">입출금</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="/customer/account/Loan"><Link to="/customer/account/Saving">적금계좌</Link></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="/customer/account/Loan"><Link to="/customer/account/Loan">대출계좌</Link></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="/customer/account/Deposit" ><Link to="/customer/account/Deposit">예금계좌</Link></a>
                        </li>
                        </ul>
                    </div>
                </div>

                <div class="card-body">
                    <Table>
                      <TableHead >
                        <TableRow >
                          <TableCell style={tableHeadStyle}>은행</TableCell>
                          <TableCell style={tableHeadStyle}>계좌명</TableCell>
                          <TableCell style={tableHeadStyle}>계좌번호</TableCell>
                          <TableCell style={tableHeadStyle}>가입날짜</TableCell>
                          <TableCell style={tableHeadStyle}>이체한도</TableCell>
                          <TableCell style={tableHeadStyle}>잔액</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredMembers.map((member) => (
                          <TableRow key={member.acType}>
                            <TableCell >{member.bankName}</TableCell>
                            <TableCell>{member.acType}</TableCell>
                            <TableCell>{this.acNum(member.acNumber)}</TableCell>
                            <TableCell>{member.newDate}</TableCell>
                            <TableCell>{this.formatCurrency(member.trsfLimit)}</TableCell>
                            <TableCell>{this.formatCurrency(member.acBalance)}</TableCell>
                           </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                </div>
            </div>
              
            </section>
          </main>
        );
      }
}
export default Account;