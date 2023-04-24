 // 예금 상품
 import React, { Component } from "react";
 import {Table, TableHead, TableRow, TableCell,  TableBody } from "@mui/material";
 import {Link} from 'react-router-dom';
 import PdDepositService from './PdDepositService';
 
 
  
 class PdDeposit extends Component{


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
        PdDepositService.fetchMembers()
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
      
      render() {
        // members에서 selectedOption과 일치하는 항목만 필터링
        const filteredMembers = this.state.members.filter(
          (member) => member.dpdName.indexOf(this.state.selectedOption) !== -1
        );
        
        return (
        <main className="main">
            <section className="section">
             
            </section>
            
            <section className="section">
            <div className="container">
                <h2>예금상품</h2>
                
                <select value={this.state.selectedOption} onChange={this.handleChange}>
                  <option value="">예금상품이름</option>
                  {this.state.members.map((member) => (
                    <option key={member.dpdName} value={member.dpdName}>{member.dpdName}</option>
                  ))}
                </select>
              

              
              
                <div class="card text-center">
                    
                    <div class="card-header">
                        <ul class="nav nav-tabs card-header-tabs">
                        <li class="nav-item">
                            <a class="nav-link disabled">예금</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" ><Link to="/customer/product/pdLoan">대출</Link></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" ><Link to="/customer/product/pdSaving">적금</Link></a>
                        </li>
                        </ul>
                    </div>
                </div>

                <div class="card-body">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>예금상품이름</TableCell>
                          <TableCell>가입기간</TableCell>
                          <TableCell>예금상품금리</TableCell>
                          <TableCell>예금상품설명</TableCell>
                          <TableCell>예금최소금액</TableCell>
                          <TableCell>예금최대금액</TableCell>
                          <TableCell>중도해지시금리</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredMembers.map((member) => (
                          <TableRow key={member.dpdName}>
                            <TableCell>{member.dpdName}</TableCell>
                            <TableCell>{member.dperiod}</TableCell>
                            <TableCell>{member.drate}</TableCell>
                            <TableCell>{member.dcontent}</TableCell>
                            <TableCell>{member.dmin}</TableCell>
                            <TableCell>{member.dmax}</TableCell>
                            <TableCell>{member.dcxlRate}</TableCell>
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
 
  export default PdDeposit;
 
 