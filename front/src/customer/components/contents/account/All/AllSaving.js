// 전체조회
import React, { Component } from "react";
import '../../../../resources/css/AllStyle.css';
import AllService from "./AllService";
import {Table, TableHead, TableRow, TableCell,  TableBody } from "@mui/material";

class AllSaving extends Component{
    
        
        constructor(props){
            super(props);
    
            this.state={
                members:[],
                message: null,
                
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
        const tableHeadStyle={
            fontWeight: "bold",
        }
        
          return (
            <main className="main">
              <section className="section">
               
              </section>
              
              <section className="section">
                <div className="container">

                <Table>
                  <TableHead >
                    <TableRow >
                      <TableCell style={tableHeadStyle}>계좌명</TableCell>
                      <TableCell style={tableHeadStyle}>계좌번호</TableCell>
                      <TableCell style={tableHeadStyle}>가입날짜</TableCell>
                      <TableCell style={tableHeadStyle}>만기날짜</TableCell>
                      <TableCell style={tableHeadStyle}>잔액</TableCell>
                      
                    </TableRow>
                  </TableHead>
                

                <TableBody>
                  {this.state.members.map((member) => (
                    <TableRow key={member.snum}>
                      <TableCell style={{color:"navy"}}>{member.spdName}</TableCell>
                      <TableCell>{this.acNum(member.acNumber)}</TableCell>
                      <TableCell>{member.sendDate}</TableCell>
                      <TableCell>{member.sjoinDate}</TableCell>
                      <TableCell>{this.formatCurrency(member.samount)}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>


                  </div>
                  </section>
                </main>
                );
          }
        
    
}

export default AllSaving;