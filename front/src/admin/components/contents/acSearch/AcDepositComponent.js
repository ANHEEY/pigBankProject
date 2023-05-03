import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AllService from "../../../../customer/components/contents/account/All/AllService";

function AcDepositComponent() {
    const [members1, setMembers1] = useState([]);
    
    useEffect(() => {
        reloadMemberList();
    }, []);

    const reloadMemberList = () => {
        AllService.fetchTransfer()
        .then((res) => {
            setMembers1(res.data);
        })
        .catch((err) => {
            console.log("reloadMemberList() Error!!", err);
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
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const acNum = (acNumber) => {
        const acNum = acNumber.toString().slice(0, 3) + "-" + acNumber.toString().slice(3);
        return acNum;
    };

    const tableHeadStyle = {
        fontWeight: "bold",
    };

        return(
            <div className="component-div">
                <h1>
                <FontAwesomeIcon icon={faSearch} /> 이체내역
                </h1>
                <ul>
                <li>1. 이체내역 출력 (당일날짜기준) </li>
                </ul>
                <Table>
                <TableHead style={{ backgroundColor: "#dbe2d872" }}>
                    <TableRow>
                    <TableCell style={tableHeadStyle}>은행명</TableCell>
                    <TableCell style={tableHeadStyle}>계좌번호</TableCell>
                    <TableCell style={tableHeadStyle}>입출금</TableCell>
                    <TableCell style={tableHeadStyle}>금액</TableCell>
                    <TableCell style={tableHeadStyle}>mymemo</TableCell>
                    <TableCell style={tableHeadStyle}>yourmemo</TableCell>
                    <TableCell style={tableHeadStyle}>날짜</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {members1.map((member) => (
                    <TableRow key={member.tnum}>
                        <TableCell style={{ color: "navy" }}>{member.tdepositBank}</TableCell>
                        <TableCell>{acNum(member.acNumber)}</TableCell>
                        <TableCell>{member.ttype}</TableCell>
                        <TableCell>{formatCurrency(member.tamount)}</TableCell>
                        <TableCell>{member.myMemo}</TableCell>
                        <TableCell>{member.yourMemo}</TableCell>
                        <TableCell>{formatDate(member.tdate)}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
                SELECT * FROM transfer_tbl ORDER BY t_num DESC;
            </div>
    );
};

export default AcDepositComponent;