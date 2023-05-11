// 대출 심사결과 조회
import React, { useState, useEffect } from "react";
import {Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AllService from "../All/AllService";
import {Link} from 'react-router-dom';
import "../../../../resources/css/product/saving.css";

const LoanState = () => {

  // const [id, setId] = useState('');
  const tableHeadStyle={
    fontWeight: "bold",
  }

  let id = window.localStorage.getItem('id');
  console.log("window.localStorage : " + id);
  
  const [loanStateList, setLoanStateList]= useState([])

  useEffect(() => {
      // setId(getId());
      console.log("useEffect : " + id);
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
            <select value={selectedOption} onChange={handleChange}>
                <option value="">전체선택</option>
                {members.map((member) => (
                <option key={member.lnum} value={member.lpdName}>{member.lpdName}</option>
                ))}
            </select>    
          </p>   */}
                                  
          <div className="card text-center" style={{backgroundColor:"#dbe2d872" }}>
              <div className="card-header" >
                  <ul className="nav nav-tabs card-header-tabs" >
                  <li className="nav-item">
                      <a className="nav-link active" href="/customer/account/Loan">대출계좌조회</a>
                  </li>
                  </ul>
              </div>
          </div>

          <div className="card-body" style={{textAlign:"center"}}>
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
                
                <TableBody style={{textAlign:"center"}}>
                {loanStateList.map((product) => (
                    <TableRow key={product.lreqNum}>
                      <TableCell style={{color:"navy"}}>{product.lreqNum}</TableCell>
                      <TableCell>{product.lpdName}</TableCell>
                      <TableCell>{comma(product.lprincipal/10000)}만원</TableCell>
                      <TableCell>{product.lrate}%</TableCell>
                      <TableCell>{new Date(product.lreqDate).toLocaleDateString().slice(0,-1)}</TableCell>
                      <TableCell>{product.lstate}[{product.lreason}]</TableCell>
                    </TableRow>
                ))}
                </TableBody>
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