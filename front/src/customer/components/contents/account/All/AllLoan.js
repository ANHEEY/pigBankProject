// 전체조회
import '../../../../resources/css/AllStyle.css';
import React, { useState, useEffect } from "react";
import {Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AllService from "./AllService";
import { getAuthToken } from '../../../helpers/axios_helper';
import axios from 'axios';

function AllLoan (){

  const [members, setMembers] = useState([]);
  

  useEffect(() => {
    if(getAuthToken() !== null){
      axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
    } else{
      axios.defaults.headers.common['Authorization'] = ``;
    }
      reloadMemberList(window.localStorage.getItem("id"));
  }, []);

  // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 랜더링

  const reloadMemberList = (id) => {
      AllService.fetchLoan(id)
        .then(res => {
          setMembers(res.data);
          console.log(res.data);
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

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    date.setTime(date.getTime() + (9 * 60 * 60 * 1000)); 
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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
              <TableRow key={member.lnum}>
                <TableCell style={{color:"navy"}}>{member.lpdName}</TableCell>
                <TableCell>{acNum(member.acNumber)}</TableCell>
                <TableCell>{formatDate(member.lreqDate)}</TableCell>
                <TableCell>{member.lincome}</TableCell>
                <TableCell>{member.acBalance === 0? "대출상환완료" : formatCurrency(member.acBalance)}</TableCell>
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