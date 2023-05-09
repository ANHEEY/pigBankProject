// 적금조회
import React, { useState, useEffect } from "react";
import {Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AllService from "../All/AllService";
import {Link} from 'react-router-dom';
import "../../../../resources/css/product/saving.css";

function Saving() {    
  const [members, setMembers] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
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

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
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
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const filteredMembers = members.filter(
    (member) => member.spdname.indexOf(selectedOption) !== -1
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
              <h2>적금계좌조회</h2>                

                  <p className="thead1">
                  <select value={selectedOption} onChange={handleChange}>
                  <option value="">전체선택</option>
                      {members.map((member) => (
                  <option key={member.snum} value={member.spdname}>{member.spdname}</option>
                  ))}
                  </select>    
                  </p>  
                                      
              <div className="card text-center">
                  
                  <div className="card-header" style={{backgroundColor:"#dbe2d872" }}>
                      <ul className="nav nav-tabs card-header-tabs">
                      <li className="nav-item">
                          <a className="nav-link active" href="/customer/account/Account">입출금계좌</a>
                      </li>

                      <li className="nav-item">
                          <a className="nav-link active" href="/customer/account/Deposit">예금계좌</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link disabled" href="/customer/account/Loan">적금계좌</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link active" href="/customer/account/Loan" >대출계좌</a>
                      </li>
                      </ul>
                  </div>
              </div>

              <div className="card-body">
                  <Table>
                    <TableHead >
                      <TableRow >
                        <TableCell style={tableHeadStyle}>계좌명</TableCell>
                        <TableCell style={tableHeadStyle}>계좌번호</TableCell>
                        <TableCell style={tableHeadStyle}>가입날짜</TableCell>
                        <TableCell style={tableHeadStyle}>만기날짜</TableCell>
                        <TableCell style={tableHeadStyle}>예상금리금액</TableCell>
                        <TableCell style={tableHeadStyle}>잔액</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredMembers.map((member) => (
                        <TableRow key={member.snum}>
                          <TableCell >{member.spdname}</TableCell>
                          <TableCell>{acNum(member.acNumber)}</TableCell>
                          <TableCell>{formatDate(member.sjoinDate)}</TableCell>
                          <TableCell>{formatDate(member.sendDate)}</TableCell>
                          <TableCell>{formatCurrency(member.sexpAmount)}</TableCell>
                          <TableCell>{formatCurrency(member.samount)}</TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
              </div>
          </div>
            
          </section>
          <br/><br/><br/>
        </main>
        );
      
    }
export default Saving;