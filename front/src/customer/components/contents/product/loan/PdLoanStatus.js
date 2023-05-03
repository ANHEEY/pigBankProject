// 대출 심사결과 조회
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import '../../../../resources/css/AllStyle.css';
import PdLoanService from "./PdLoanService";

const PdLoanStatus = () => {

    const tableHeadStyle={
        fontWeight: "bold",
    }

    const [listPdReqList, setListPdReqList]= useState([])

    useEffect(() => {
        PdLoanService.fetchPdReqList
            .then(res => {
                setListPdReqList(res.data);
            })
            .catch(err => {
                console.log('fetchPdReqList Error', err);
            });
    }, []);

    // 금액 콤마 찍기
    const comma = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    return(
        <main>
            <section className="section">
              <div className="container">
              <Table>
                  <TableHead >
                    <TableRow>
                      <TableCell style={tableHeadStyle}>대출신청번호</TableCell>
                      <TableCell style={tableHeadStyle}>대출상품명</TableCell>
                      <TableCell style={tableHeadStyle}>대출금액</TableCell>
                      <TableCell style={tableHeadStyle}>대출이자</TableCell>
                      <TableCell style={tableHeadStyle}>신청날짜</TableCell>
                      <TableCell style={tableHeadStyle}>심사결과</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                  {listPdReqList.map((product) => (
                     <TableRow key={product.lreqNum}>
                        <TableCell style={{color:"navy"}}>{product.lreqNum}</TableCell>
                        <TableCell>{product.lpdName}</TableCell>
                        <TableCell>{comma(product.lprincipal)}만원</TableCell>
                        <TableCell>{product.lrate}%</TableCell>
                        <TableCell>{product.lreqDate}</TableCell>
                        <TableCell>{product.lStatus[product.lreason]}</TableCell>
                   </TableRow>
                  ))}
                </TableBody>
               </Table>     
              </div>
            </section>
          </main>
    )
}
export default PdLoanStatus;