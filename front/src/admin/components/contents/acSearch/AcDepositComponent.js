import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import AllService from "../../../../customer/components/contents/account/All/AllService";
import SearchBar from "../../../../customer/components/contents/cscenter/SearchBar";
import ReactPaginate from "react-paginate";

function AcDepositComponent() {
    const [members1, setMembers1] = useState([]);

    const [pageNumber, setPageNumber] = useState(0);
    const [Search, setSearch] = useState('');

    const countlist = members1.length;
    
    useEffect(() => {
        reloadMemberList();
    }, []);

    const reloadMemberList = () => {
        AllService.fetchTransfer()
        .then((res) => {
            setMembers1(res.data);
            console.log(res.data)
        })
        .catch((err) => {
            console.log("reloadMemberList() Error!!", err);
        });
    };

    const handleSearchChange = (newSearch) => {
        setSearch(newSearch);
    };

    const handlePageClick = (data) => {
        const { selected } = data;
        setPageNumber(selected);
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
                <li><SearchBar value={Search} onSearchChange={handleSearchChange}  /> </li>
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
                {members1
                    .filter(item => {
                        const acNumber = item.acNumber && item.acNumber.toString();
                        return acNumber.includes(Search.toLowerCase()) || 
                        item.tdepositBank.toLowerCase().includes(Search.toLowerCase()) 
                    })
                    .slice(pageNumber * 10, (pageNumber + 1) * 10)
                    .map((member) => (
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
                <div>
                <ReactPaginate
                    previousLabel={"이전"}
                    nextLabel={"다음"}
                    pageCount={countlist / 10}  // 전체 페이지 수
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={10}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                />
                </div>
                
                SELECT * FROM transfer_tbl ORDER BY t_num DESC;
            </div>
    );
};

export default AcDepositComponent;