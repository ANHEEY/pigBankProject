// 적금조회
import React, { useState, useEffect } from "react";
import {Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AllService from "../All/AllService";
import {Link} from 'react-router-dom';
import "../../../../resources/css/product/saving.css";

function Deposit() {
  const [members, setMembers] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    reloadMemberList();
  }, []);

  const reloadMemberList = () => {
    AllService.fetchDeposit()
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

  const filteredMembers = members.filter(
    (member) => member.dpdName.indexOf(selectedOption) !== -1
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
          <h2>예금계좌조회</h2>
          <p className="thead1">
            <select value={selectedOption} onChange={handleChange}>
              <option value="">전체선택</option>
              {members.map((member) => (
                <option key={member.dpdName} value={member.dpdName}>{member.dpdName}</option>
              ))}
            </select>
          </p>
          <div className="card text-center">
            <div className="card-header" style={{backgroundColor:"#dbe2d872" }}>
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <a className="nav-link disabled" href="/customer/account/Deposit">예금계좌</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="/customer/account/Saving" ><Link to="/customer/account/Account">입출금</Link></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="/customer/account/Deposit"><Link to="/customer/account/Deposit">예금계좌</Link></a>
                </li>
                </ul>
                    </div>
                </div>

                <div class="card-body">
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
                          <TableRow key={member.dpdName}>
                            <TableCell style={{color:"navy"}}>{member.dpdName}</TableCell>
                            <TableCell>{acNum(member.acNumber)}</TableCell>
                            <TableCell>{member.djoinDate}</TableCell>
                            <TableCell>{member.dendDate}</TableCell>
                            <TableCell>{formatCurrency(member.dexpAmount)}</TableCell>
                            <TableCell>{formatCurrency(member.damount)}</TableCell>
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

export default Deposit;