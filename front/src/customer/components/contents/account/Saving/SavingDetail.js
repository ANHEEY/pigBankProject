import React,{useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import AllService from "../All/AllService";

import Pagination from "@mui/material/Pagination";
import {Table, TableCell,TableRow, TableHead, TableBody, Box, TableFooter}from "@mui/material";
import { getAuthToken } from "../../../helpers/axios_helper";
import axios from "axios";



function SavingDetail() {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const {acNumber} = useParams();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortColumn, setSortColumn] = useState("");
    const [sortOrder, setSortOrder] = useState("");

    useEffect(() => {
        if(getAuthToken() !== null){
            axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
          } else{
            axios.defaults.headers.common['Authorization'] = ``;
          }
        reloadMemberList(acNumber);
    }, [acNumber]);


    const reloadMemberList = (acNumber) => {
        AllService.fetchSavingDetail(acNumber)
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
        date.setTime(date.getTime() + (9 * 60 * 60 * 1000)); 
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

    const handleSort = (column) => {
        let sortedItems = [...members];
      
        if (sortColumn === column) {
          sortedItems.reverse();
          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
          sortedItems.sort((a, b) => {
            const valueA = typeof a[column] === "string" ? a[column] : "";
            const valueB = typeof b[column] === "string" ? b[column] : "";
      
            if (sortOrder === "asc") {
              return valueA.localeCompare(valueB);
            } else {
              return valueB.localeCompare(valueA);
            }
          });
          setSortColumn(column);
          setSortOrder("asc");
        }
      
        setMembers(sortedItems);
    };

    let sortedItems = JSON.parse(JSON.stringify(currentItems));

    if (sortColumn !== "") {
        sortedItems.sort((a, b) => {
            const valueA = typeof a.tdate === "string" ? a.tdate : "";
            const valueB = typeof b.tdate === "string" ? b.tdate : "";

            if (sortOrder === "asc") {
                return valueA.localeCompare(valueB);
            } else {
                return valueB.localeCompare(valueA);
            }
        });
    }

    const handleSortColumnClick = (column) => {
        handleSort(column.toLowerCase());
    };

    return(
        <main className="main">
        
            <div className="container">
                <div className="title_div">
                    <div className="title_see">
                        적금 이체내역
                    </div>
                </div>                
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
                            <TableCell onClick={() => handleSortColumnClick("tdate")} style={{ cursor: "pointer" }}>
                                거래날짜
                                <span>
                                    {sortColumn === "tdate" ? (
                                    sortOrder === "desc" ? (
                                        "▲"
                                    ) : (
                                        "▼"
                                    )
                                    ) : (
                                        "▼" 
                                    )}
                                </span>
                            </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {sortedItems.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} style={{textAlign:"center"}}>이체결과없음</TableCell>
                            </TableRow>

                            ) : (
                            sortedItems.map((member) => (
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
                                    <Link to="/customer/account/saving">Back</Link>
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
export default SavingDetail;