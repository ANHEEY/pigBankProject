// 적금조회
import React, { useState, useEffect } from "react";
import {Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AllService from "../All/AllService";
import {Link, useNavigate} from 'react-router-dom';
import "../../../../resources/css/product/saving.css";
import { getAuthToken } from "../../../helpers/axios_helper";
import axios from "axios";

function Account() {

  const navigate = useNavigate();

  const handleDpdNameClick = (acNumber) => {
    const id = window.localStorage.getItem("id");
    navigate(`/customer/account/account/accountdetail/${acNumber}/${id}`);
  };

  const [members, setMembers] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if(getAuthToken() !== null){
      axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
    } else{
      axios.defaults.headers.common['Authorization'] = ``;
    }
    reloadMemberList(window.localStorage.getItem("id"));
  }, []);

  const reloadMemberList = (id) => {
    AllService.fetchAccount(id)
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
    (member) => member.acType.indexOf(selectedOption) !== -1
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
              <h2>입출금계좌조회</h2>                

                  <p className="thead1">
                  <select value={selectedOption} onChange={handleChange}>
                  <option value="">전체선택</option>
                      {members.map((member) => (
                  <option key={member.acNumber} value={member.bankName}>{member.bankName}</option>
                  ))}
                  </select>    
                  </p>  
                                      
              <div className="card text-center">
                  
                  <div className="card-header" style={{backgroundColor:"#dbe2d872" }}>
                      <ul className="nav nav-tabs card-header-tabs">
                      <li className="nav-item">
                          <a className="nav-link disabled" href="/customer/account/Account">입출금계좌</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link active" href="/customer/account/Deposit">예금계좌</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link active" href="/customer/account/Saving">적금계좌</a>
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
                        <TableCell style={tableHeadStyle}>은행</TableCell>
                        <TableCell style={tableHeadStyle}>계좌명</TableCell>
                        <TableCell style={tableHeadStyle}>계좌번호</TableCell>
                        <TableCell style={tableHeadStyle}>가입날짜</TableCell>
                        <TableCell style={tableHeadStyle}>이체한도</TableCell>
                        <TableCell style={tableHeadStyle}>잔액</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredMembers.map((member) => (
                        <TableRow key={member.acNumber} >
                          <TableCell onClick={() => handleDpdNameClick(member.acNumber)} >
                            <Link to={`/customer/account/account/accountdetail/${member.acNumber}/${member.id}`}>
                              {member.bankName}
                            </Link>
                          </TableCell>
                          <TableCell>{member.acType}</TableCell>
                          <TableCell>{acNum(member.acNumber)}</TableCell>
                          <TableCell>{formatDate(member.newDate)}</TableCell>
                          <TableCell>{formatCurrency(member.trsfLimit)}</TableCell>
                          <TableCell>{formatCurrency(member.acBalance)}</TableCell>
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
export default Account;