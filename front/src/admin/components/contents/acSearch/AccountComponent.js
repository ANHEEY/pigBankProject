import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AllService from "../../../../customer/components/contents/account/All/AllService";

function AccountComponent() {

  const [members1, setMembers1] = useState([]);
  const [members2, setMembers2] = useState([]);
  const [members3, setMembers3] = useState([]);
  const [members4, setMembers4] = useState([]);
  

  useEffect(() => {
    reloadMemberList();
  }, []);

  const reloadMemberList = () => {
    AllService.fetchAccount()
      .then(res => {
        setMembers1(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log('reloadMemberList() Error!!', err);
      });

    AllService.fetchSaving()
      .then(res => {
        setMembers2(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log('reloadMemberList() Error!!', err);
      });

    AllService.fetchDeposit()
      .then(res => {
        setMembers3(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log('reloadMemberList() Error!!', err);
      });

    AllService.fetchLoan()
      .then(res => {
        setMembers4(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log('reloadMemberList() Error!!', err);
      });
  };

  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    });
    return formatter.format(value);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const acNum = (acNumber) => {
    const acNum = acNumber.toString().slice(0, 3) + '-' + acNumber.toString().slice(3);
    return acNum;
  };

  const tableHeadStyle = {
    fontWeight: "bold",
  };
        

    return(
        <div className="component-div">
            <h1><FontAwesomeIcon icon={faSearch}/> 계좌목록 </h1>
            <ul>
                <li>1. 전체계좌 출력 (최신순) </li>
                <li>2. 검색조건 검색(항목 : 회원별, 계좌번호, 가입날짜 ) 후 선택조건 출력 </li>
            </ul>
            <Table>
                <TableHead style={{backgroundColor:"#dbe2d872"}}>
                    <TableRow>
                        <TableCell style={tableHeadStyle}>계좌명</TableCell>
                        <TableCell style={tableHeadStyle}>계좌번호</TableCell>
                        <TableCell style={tableHeadStyle}>가입날짜</TableCell>
                        <TableCell style={tableHeadStyle}>만기날짜</TableCell>
                        <TableCell style={tableHeadStyle}>잔액</TableCell>
                    </TableRow>
                </TableHead>


                <TableBody>
                    {members1.map((member) => (
                        <TableRow key={member.acType}>
                            <TableCell style={{color:"navy"}}>{member.acType}</TableCell>
                            <TableCell>{acNum(member.acNumber)}</TableCell>
                            <TableCell>{formatDate(member.newDate)}</TableCell> 
                            <TableCell>{formatDate(member.lastDate)}</TableCell>
                            <TableCell>{formatCurrency(member.acBalance)}</TableCell>
                        </TableRow>
                    ))}



                    {members2.map((member) => (
                        <TableRow key={member.snum}>
                            <TableCell style={{color:"navy"}}>{member.spdName}</TableCell>
                            <TableCell>{acNum(member.acNumber)}</TableCell>
                            <TableCell>{member.sendDate}</TableCell>
                            <TableCell>{member.sjoinDate}</TableCell>
                            <TableCell>{formatCurrency(member.samount)}</TableCell>
                        </TableRow>
                    ))}

                    {members3.map((member) => (
                        <TableRow key={member.dnum}>
                            <TableCell style={{color:"navy"}}>{member.dpdName}</TableCell>
                            <TableCell>{acNum(member.acNumber)}</TableCell>
                            <TableCell>{member.djoinDate}</TableCell>
                            <TableCell>{member.dendDate}</TableCell>
                            <TableCell>{formatCurrency(member.damount)}</TableCell>
                        </TableRow>
                    ))}

                    {members4.map((member) => (
                        <TableRow key={member.lreqNum}>
                            <TableCell style={{color:"navy"}}>{member.lpdName}</TableCell>
                            <TableCell>{acNum(member.acNumber)}</TableCell>
                            <TableCell>{member.lreqDate}</TableCell>
                            <TableCell>{member.lendDate}</TableCell>
                            <TableCell>{formatCurrency(member.lprincipal)}</TableCell>
                        </TableRow>
                    ))}

                    <tr>
                        <td colSpan={4}>
                            <button></button>
                        </td>
                    </tr>
                
                </TableBody>
            </Table>
            SELECT * FROM account_tbl ORDER BY newDate DESC;
        </div>                
    )

}
export default AccountComponent;