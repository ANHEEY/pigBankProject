import { Typography, Table, TableHead, TableRow, TableCell, Button, TableBody } from "@mui/material";
import React, { Component } from "react";
import {Link} from 'react-router-dom';

class DepositComponent extends Component{

    constructor(props){
        super(props);

        this.state={
            members:[],
            message: null,
            selectedOption: ""
        }
    }
  
    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 랜더링

    // componentDidMount(){
    //     this.reloadMemberList();
    // }

    // reloadMemberList = () => {
    //     PdSavingService.fetchMembers()
    //         .then(res=>{
    //             this.setState({
    //                 members:res.data
    //             })
    //         })
    //         .catch(err=>{
    //             console.log('reloadMemberList() Error!!',err);
    //         });
    //   }
      
      handleChange = (event) => {
        this.setState({
          selectedOption: event.target.value
        });
      }
      
      render() {
        // members에서 selectedOption과 일치하는 항목만 필터링
        const filteredMembers = this.state.members.filter(
          (member) => member.spdName.indexOf(this.state.selectedOption) !== -1
        );
        
        return (
        <main className="main">
            <section className="section">
             
            </section>
            
            <section className="section">
            <div className="container">
                <h2>예금상품</h2>
                
                {/* <select value={this.state.selectedOption} onChange={this.handleChange}>
                  <option value="">예금상품이름</option>
                  {this.state.members.map((member) => (
                    <option key={member.spdName} value={member.spdName}>{member.spdName}</option>
                  ))}
                </select> */}


              
                <div class="card text-center">
                    
                    <div class="card-header">
                        <ul class="nav nav-tabs card-header-tabs">
                        <li class="nav-item">
                            <a class="nav-link disabled">예금</a>
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
                          <TableRow key={member.spdName}>
                            <TableCell>{member.spdName}</TableCell>
                            <TableCell>{member.scontent}</TableCell>
                            <TableCell>{member.speriod}</TableCell>
                            <TableCell>{member.srate}</TableCell>
                            <TableCell>{member.smin}</TableCell>
                            <TableCell>{member.smax}</TableCell>
                            <TableCell>{member.scxlrate}</TableCell>
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
export default DepositComponent;
