import React,{useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import AllService from "../All/AllService";

import Pagination from "@mui/material/Pagination";
import {Table, TableCell,TableRow, TableHead, TableBody, Box, TableFooter}from "@mui/material";



function AccountDetail() {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const {acNumber, id} = useParams();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        reloadMemberList(acNumber);
    }, [acNumber]);


    const reloadMemberList = (acNumber) => {
        AllService.fetchAccountDetail(acNumber)
          .then(res => {
            setMembers(res.data);
            setLoading(false);
          })
          .catch(err => {
            console.log('reloadMemberList() Error!!',err);
          });
    }

    const formatCurrency = (value) => {
        const formatter = new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
        });
        return formatter.format(value);
    }

    
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = members.slice(indexOfFirstItem, indexOfLastItem);
   
    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return(
        <main className="main">
        
            <div className="container">
                <h2>입출금이체내역</h2>
                <div className="card-body">

                {loading ? (
                    <p style={{textAlign:"center"}}>Loading...</p>
                ) : (
                    <Table>
                        <TableHead style={{backgroundColor:"#dbe2d872" }}>
                            <TableRow >
                            <TableCell >거래번호</TableCell>
                            <TableCell >계좌번호</TableCell>
                            <TableCell>거래종류</TableCell>
                            <TableCell>금액</TableCell>
                            <TableCell>내통장메모</TableCell>
                            <TableCell>받는통장메모</TableCell>
                            <TableCell>거래날짜</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {currentItems.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} style={{textAlign:"center"}}>이체결과없음</TableCell>
                            </TableRow>

                            ) : (
                            currentItems.map((member) => (
                            <TableRow key={member.tnum}>
                                <TableCell >{member.tnum}</TableCell>
                                <TableCell>{member.tdepositBank}</TableCell>
                                <TableCell>{member.ttype}</TableCell>
                                <TableCell>{formatCurrency(member.tamount)}</TableCell>
                                <TableCell>{member.myMemo}</TableCell>
                                <TableCell>{member.yourMemo}</TableCell>
                                <TableCell>{formatDate(member.tdate)}</TableCell>
                            </TableRow>
                            ))
                            )}
                        </TableBody>
                        <TableFooter >
                            <TableRow >
                            <TableCell colSpan={7} style={{textAlign:"center"}}>
                                <Box display="flex" justifyContent="center">
                                <Pagination 
                                count={Math.ceil(members.length / itemsPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                                />
                                </Box>
                            </TableCell>
                            </TableRow>

                            <TableRow>
                            <TableCell colSpan={7} style={{textAlign:"center"}}>
                                    <Box display="flex" justifyContent="center">
                                    <Link to="/customer/account/account">Back</Link>
                                    </Box>
                            </TableCell>
                            </TableRow>

                            
                        </TableFooter>
                    </Table>
                    
                )}

                </div>
            </div>
        </main>
    )
}
export default AccountDetail;