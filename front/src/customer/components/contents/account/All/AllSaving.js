// 전체조회
import React, { useState, useEffect } from "react";
import '../../../../resources/css/AllStyle.css';
import AllService from "./AllService";
import {Table, TableHead, TableRow, TableCell,  TableBody } from "@mui/material";
import { getAuthToken } from "../../../helpers/axios_helper";
import axios from "axios";

function AllSaving() {
        
    const [members, setMembers] = useState([]);
    
    useEffect(() => {
      if(getAuthToken() !== null){
        axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
      } else{
        axios.defaults.headers.common['Authorization'] = ``;
      }
      reloadMemberList(window.localStorage.getItem("id"));
    }, []);

    const reloadMemberList = (id) => {
      AllService.fetchSaving(id)
        .then(res => {
          setMembers(res.data);
        })
        .catch(err => {
          console.log('reloadMemberList() Error!!',err);
        });
    }

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      date.setTime(date.getTime() + (9 * 60 * 60 * 1000)); 
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
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
    const acTypeStyle ={
      fontWeight:'bold',
      color:'#35396b',
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
                    <TableCell style={acTypeStyle}>{member.spdname}</TableCell>
                    <TableCell>{acNum(member.acNumber)}</TableCell>
                    <TableCell>{formatDate(member.sjoinDate)}</TableCell>
                    <TableCell>{formatDate(member.sendDate)}</TableCell>
                    <TableCell>{member.acBalance === 0 ? "적금해지완료" : formatCurrency(member.acBalance) }</TableCell>
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