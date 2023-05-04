// 대출 심사결과 조회
import React, { useState, useEffect } from "react";
import {Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AllService from "../All/AllService";
import {Link} from 'react-router-dom';
import "../../../../resources/css/product/saving.css";

const LoanState = () => {

  const tableHeadStyle={
    fontWeight: "bold",
  }

  // 고객아이디
  const id = 'hong1234'

  const [loanStateList, setLoanStateList]= useState([])

  useEffect(() => {
      AllService.fetchLoanState(id)
          .then(res => {
            setLoanStateList(res.data);
            console.log(res.data);
          })
          .catch(err => {
              console.log('fetchLoanState Error', err);
          });
  }, [id]);

  // 금액 콤마 찍기
  const comma = (number) => {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (

  <main className="main">
      <section className="section">
        
      </section>
      
      <section className="section" style={{textAlign:"center"}}>
      <div className="container">
          <h2>대출심사결과조회</h2>    
          <br />
          <br />            

              {/* <p className="thead1">
              <select value={this.state.selectedOption} onChange={this.handleChange}>
              <option value="">계좌선택</option>
                  {this.state.members.map((member) => (
              <option key={member.lpdName} value={member.lpdName}>{member.lpdName}</option>
              ))}
              </select>    
              </p>   */}
                                  
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
                  <TableCell style={tableHeadStyle}>대출신청번호</TableCell>
                      <TableCell style={tableHeadStyle}>대출상품명</TableCell>
                      <TableCell style={tableHeadStyle}>대출금액</TableCell>
                      <TableCell style={tableHeadStyle}>대출이자</TableCell>
                      <TableCell style={tableHeadStyle}>신청날짜</TableCell>
                      <TableCell style={tableHeadStyle}>심사결과</TableCell>
                  </TableRow>
                </TableHead>

                {loanStateList.map((product) => (
                <TableBody style={{textAlign:"center"}}>
                    <TableRow key={product.lreqNum}>
                      <TableCell style={{color:"navy"}}>{product.lreqNum}</TableCell>
                      <TableCell>{product.lpdName}</TableCell>
                      <TableCell>{comma(product.lprincipal)}만원</TableCell>
                      <TableCell>{product.lrate}%</TableCell>
                      <TableCell>{product.lreqDate}</TableCell>
                      <TableCell>{product.lstate}[{product.lreason}]</TableCell>
                    </TableRow>
                </TableBody>
                ))}
              </Table>
          </div>
          <br />
          <p style={{textAlign: "left"}}>*심사결과에 대한 자세한 사항은 피그뱅크로 문의해주시면 자세히 안내해드리겠습니다.</p>
      </div>
      </section>
      <br />
      <br />
      <br />
    </main>
  );
}
export default LoanState;