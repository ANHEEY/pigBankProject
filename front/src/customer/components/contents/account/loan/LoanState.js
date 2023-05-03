// 대출계좌조회
import React, { useState, useEffect } from "react";
import {Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AllService from "../All/AllService";
import {Link} from 'react-router-dom';
import "../../../../resources/css/product/saving.css";


function LoanState (){

  const [members, setMembers] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    reloadMemberList();
  }, []);
  



  const reloadMemberList = () => {
        AllService.fetchLoan()
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
      
      
       
        // members에서 selectedOption과 일치하는 항목만 필터링
      const filteredMembers = members.filter(
        (member) => member.lpdName.indexOf(selectedOption) !== -1
      );
      
      const tableHeadStyle={
          fontWeight: "bold",
          
      }

      return (
      

      <main className="main">
          <section className="section">
            
          </section>
          
          <section className="section" style={{textAlign:"center"}}>
          <div className="container">
              <h2>대출심사결과조회</h2>                

                  <p className="thead1">
                  <select value={selectedOption} onChange={handleChange}>
                  <option value="">계좌선택</option>
                      {members.map((member) => (
                  <option key={member.lpdName} value={member.lpdName}>{member.lpdName}</option>
                  ))}
                  </select>    
                  </p>  
                                      
              <div class="card text-center" style={{backgroundColor:"#dbe2d872" }}>
                  
                  <div class="card-header" >
                      <ul class="nav nav-tabs card-header-tabs" >
                      <li class="nav-item">
                          <a class="nav-link active" href="/customer/account/Loan"><Link to="/customer/account/Loan">대출계좌조회</Link></a>
                      </li>
                      </ul>
                  </div>
              </div>

              <div class="card-body" style={{textAlign:"center"}}>
                  <Table>
                    <TableHead style={{textAlign:"center"}}>
                      <TableRow >
                        <TableCell style={tableHeadStyle}>계좌명</TableCell>
                        <TableCell style={tableHeadStyle}>신청번호</TableCell>
                        <TableCell style={tableHeadStyle}>대출금액</TableCell>
                        <TableCell style={tableHeadStyle}>진행상황</TableCell>
                      </TableRow>
                    </TableHead>

                    {filteredMembers.map((member) => (
                    <TableBody key={member.lreqNum} style={{textAlign:"center"}}>
                        <TableRow >
                          <TableCell >{member.lpdName}</TableCell>
                          <TableCell>{member.lreqNum}</TableCell>
                          <TableCell >{formatCurrency(member.lprincipal)}</TableCell>
                          <TableCell style={{color:"green"}} >{member.lstate}</TableCell>
                        </TableRow>
                      
                    </TableBody>
                    ))}
                  </Table>
                  
              </div>
          </div>
            
          </section>
        </main>
      );
    
}

export default LoanState;