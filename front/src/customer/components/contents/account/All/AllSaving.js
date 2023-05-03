// 전체조회
import React, { useState, useEffect } from "react";
import '../../../../resources/css/AllStyle.css';
import AllService from "./AllService";
import {Table, TableHead, TableRow, TableCell,  TableBody } from "@mui/material";


function AllSaving() {
        
    const [members, setMembers] = useState([]);
    

    useEffect(() => {
      reloadMemberList();
    }, []);

    const reloadMemberList = () => {
      AllService.fetchSaving()
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
                    <TableCell style={tableHeadStyle}>만기날짜</TableCell>
                    <TableCell style={tableHeadStyle}>잔액</TableCell>
                    
                  </TableRow>
                </TableHead>
              

              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.snum}>
                    <TableCell style={{color:"navy"}}>{member.spdName}</TableCell>
                    <TableCell>{acNum(member.acNumber)}</TableCell>
                    <TableCell>{member.sendDate}</TableCell>
                    <TableCell>{member.sjoinDate}</TableCell>
                    <TableCell>{formatCurrency(member.samount)}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>


                </div>
                </section>
              </main>
        );
        
      
    
}

export default AllSaving;