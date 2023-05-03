 // 예금 상품
 import React, { useEffect,useState } from "react";
 import {Table, TableHead, TableRow, TableCell,  TableBody } from "@mui/material";
 import AllService from "./AllService";
 
 
  
 function AllDeposit() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchDepositList();
  }, []);

  const fetchDepositList = async () => {
    try {
      const res = await AllService.fetchDeposit();
      setMembers(res.data);
    } catch (err) {
      console.log('fetchDepositList() Error!!',err);
    }
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
                <TableRow key={member.dnum}>
                  <TableCell style={{color:"navy"}}>{member.dpdName}</TableCell>
                  <TableCell>{acNum(member.acNumber)}</TableCell>
                  <TableCell>{member.djoinDate}</TableCell>
                  <TableCell>{member.dendDate}</TableCell>
                  <TableCell>{formatCurrency(member.damount)}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
}

export default AllDeposit;
 
 