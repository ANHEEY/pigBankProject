 // 예금 상품
 import React, { useState, useEffect } from "react";
 import {Table, TableHead, TableRow, TableCell,  TableBody } from "@mui/material";
 import AllService from "./AllService";
 
 
  
 function AllAccount (){


  const [members, setMembers] = useState([]);
  
    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 랜더링

    useEffect(() => {
      reloadMemberList();
    }, []);
  
    const reloadMemberList = () => {
      AllService.fetchAccount()
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
    
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
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
                    <TableCell style={tableHeadStyle}>만기날짜</TableCell>
                    <TableCell style={tableHeadStyle}>잔액</TableCell>
                  </TableRow>
                </TableHead> 
              

                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.acType}>
                      <TableCell style={{color:"navy"}}>{member.acType}</TableCell>
                      <TableCell>{acNum(member.acNumber)}</TableCell>
                      <TableCell>{formatDate(member.newDate)}</TableCell> 
                      <TableCell>{formatDate(member.lastDate)}</TableCell>
                      <TableCell>{formatCurrency(member.acBalance)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
            </div>
          </section>
        </main>
      );
}
 
  export default AllAccount;
 
 