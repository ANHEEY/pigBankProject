// 전체조회
import '../../../../resources/css/AllStyle.css';
import React, { useState, useEffect } from "react";
import {Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AllService from "./AllService";

function AllLoan (){

  const [members, setMembers] = useState([]);
  

  useEffect(() => {
      reloadMemberList();
  }, []);

  // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 랜더링

  const reloadMemberList = () => {
      AllService.fetchLoan()
        .then(res => {
          setMembers(res.data);
        })
        .catch(err => {
          console.log('reloadMemberList() Error!!',err);
        });
  }
      
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    });
    return formatter.format(value);
  }

  const acNum = (acNumber) => {
    const acNum = acNumber.toString().slice(0, 3) + '-' + acNumber.toString().slice(3);
    return acNum;
  }
       
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
                <TableCell style={tableHeadStyle}>이체한도</TableCell>
                <TableCell style={tableHeadStyle}>잔액</TableCell>              
              </TableRow>
            </TableHead>

            <TableBody>
            {members.map((member) => (
              <TableRow key={member.lreqNum}>
                <TableCell style={{color:"navy"}}>{member.lpdName}</TableCell>
                <TableCell>{acNum(member.acNumber)}</TableCell>
                <TableCell>{member.lreqDate}</TableCell>
                <TableCell>{member.lincome}</TableCell>
                <TableCell>{formatCurrency(member.lprincipal)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>     
        </div>
      </section>
    </main>
  );
      
    

}

export default AllLoan;