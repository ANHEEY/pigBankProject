// 대출계좌조회
import React, { Component } from "react";
import {Table, TableHead, TableRow, TableCell,  TableBody } from "@mui/material";
import AllService from "../All/AllService";
import "../../../../resources/css/product/saving.css";
import {Link} from 'react-router-dom';


class LoanState extends Component{

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
            
            <section className="section" style={{textAlign:"center"}}>
            <div className="container">
                <h2>대출심사결과조회</h2>                

                    <p className="thead1">
                    <select value={this.state.selectedOption} onChange={this.handleChange}>
                    <option value="">계좌선택</option>
                        {this.state.members.map((member) => (
                    <option key={member.lpdName} value={member.lpdName}>{member.lpdName}</option>
                    ))}
                    </select>    
                    </p>  
                                        
                <div class="card text-center" style={{backgroundColor:"#dbe2d872" }}>
                    
                    <div class="card-header" >
                        <ul class="nav nav-tabs card-header-tabs" >
                        <li class="nav-item">
                            <a class="nav-link active" href="/customer/account/Loan"><Link to="/customer/account/Loan">대출계좌조회</Link></a>
                        </li>
                        </ul>
                    </div>
                </div>

                <div class="card-body" style={{textAlign:"center"}}>
                    <Table>
                      <TableHead style={{textAlign:"center"}}>
                        <TableRow >
                          <TableCell style={tableHeadStyle}>계좌명</TableCell>
                          <TableCell style={tableHeadStyle}>신청번호</TableCell>
                          <TableCell style={tableHeadStyle}>대출금액</TableCell>
                          <TableCell style={tableHeadStyle}>진행상황</TableCell>
                        </TableRow>
                      </TableHead>

                      {filteredMembers.map((member) => (
                      <TableBody key={member.lreqNum} style={{textAlign:"center"}}>
                          <TableRow >
                            <TableCell >{member.lpdName}</TableCell>
                            <TableCell>{member.lreqNum}</TableCell>
                            <TableCell >{this.formatCurrency(member.lamount)}</TableCell>
                            <TableCell style={{color:"green"}} >{member.lstate}</TableCell>
                          </TableRow>
                        
                      </TableBody>
                      ))}
                    </Table>
                    
                </div>
            </div>
              
            </section>
          </main>
        );
      }
}

export default LoanState;