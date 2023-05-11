import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Table, TableHead, TableRow, TableCell, TableBody, TableFooter, Box } from "@mui/material";
import AllService from "../../../../customer/components/contents/account/All/AllService";
import axios from "axios";
import { getAuthToken } from "../../../../customer/components/helpers/axios_helper";
import Pagination from "@mui/material/Pagination";

function AccountComponent() {

  const [combinedMembers, setCombinedMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    if(getAuthToken() !== null){
      axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
    } else{
      axios.defaults.headers.common['Authorization'] = ``;
    }
    reloadMemberList();
  }, []);

  const reloadMemberList = () => {
    Promise.all([
      AllService.fetchAdminAccount(),
      AllService.fetchAdminSaving(),
      AllService.fetchAdminDeposit(),
      AllService.fetchAdminLoan()
    ])
    .then((responses) => {
      const [accountData, savingData, depositData, loanData] = responses;
      const members  = [
        ...accountData.data,
        ...savingData.data,
        ...depositData.data,
        ...loanData.data,
      ];
      setCombinedMembers(members);
        console.log(members);
        setLoading(false);
    })
    .catch((err) => {
      console.log("reloadMemberList() Error!!", err);
    });
  };

  const formatCurrency = (value) => {
    if (isNaN(value)) {
      return "₩0";
    }
    
    if (value === 0) {
      return "₩0";
    }
  
    const formatter = new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    });
  
    return formatter.format(value);
  };

  const formatDate = (dateStr) => {
    if (isNaN(dateStr)) {
      return "null";
    }

    const date = new Date(dateStr);
    date.setTime(date.getTime() + (9 * 60 * 60 * 1000)); 
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const acNum = (acNumber) => {
    const acNum = acNumber.toString().slice(0, 3) + '-' + acNumber.toString().slice(3);
    return acNum;
  };

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const getItemsByPage = (items, page) => {
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  };

  const totalItemCount = combinedMembers.length;
  const currentItems = getItemsByPage(combinedMembers, currentPage);

  

  const tableHeadStyle = {
    fontWeight: "bold",
  };

  const handleSort = (column) => {
    let sortedItems = [...combinedMembers];
  
    if (sortColumn === column) {
      sortedItems.reverse();
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      sortedItems.sort((a, b) => {
        const valueA = parseFloat(a[column] || a.acBalance || a.samount || a.damount || a.lprincipal || 0);
        const valueB = parseFloat(b[column] || b.acBalance || b.samount || b.damount || b.lprincipal || 0);
  
        if (column === "잔액") {
          if (sortOrder === "asc") {
            return valueA - valueB;
          } else {
            return valueB - valueA;
          }
        } else {
          return 0; // 다른 열은 정렬하지 않음
        }
      });
      setSortColumn(column);
      setSortOrder("asc");
    }
  
    setCombinedMembers(sortedItems);
  };
  
  const handleSortColumnClick = (column) => {
    handleSort(column.toLowerCase());
  };
        

    return(
        <div className="component-div">
            <h1><FontAwesomeIcon icon={faSearch}/> 계좌목록 </h1>
            <ul>
               
            </ul>
            {loading ? (
                    <p style={{textAlign:"center"}}>Loading...</p>
            ) : (
            
            <Table>
                <TableHead style={{backgroundColor:"#dbe2d872"}}>
                    <TableRow>
                        <TableCell style={tableHeadStyle}>가입자</TableCell>
                        <TableCell style={tableHeadStyle}>계좌명</TableCell>
                        <TableCell style={tableHeadStyle}>계좌번호</TableCell>
                        <TableCell style={tableHeadStyle}>가입날짜</TableCell>
                        <TableCell style={tableHeadStyle}>만기날짜</TableCell>
                        <TableCell style={tableHeadStyle}>상태</TableCell>
                        <TableCell onClick={() => handleSortColumnClick("잔액")} style={{ cursor: "pointer" }}>
                            잔액
                            <span>
                                {sortColumn === "잔액" ? (
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
                {currentItems.map((member, index) => {
                  return (
                    <TableRow key={`member${index}`}>
                      <TableCell>{member.id}</TableCell>
                      <TableCell>{member.acType || member.spdName || member.dpdName || member.lpdName}</TableCell>
                      <TableCell>{acNum(member.acNumber)}</TableCell>
                      <TableCell>{formatDate(member.newDate || member.sendDate || member.djoinDate || member.lreqDate)}</TableCell>
                      <TableCell>{formatDate(member.lastDate || member.sjoinDate || member.dendDate || member.lendDate)}</TableCell>
                      <TableCell>{member.acState}</TableCell>
                      <TableCell>{formatCurrency(member.acBalance || member.samount || member.damount || member.lprincipal)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>

                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={7} style={{textAlign:"center"}}>
                        <Box display="flex" justifyContent="center">
                        <Pagination 
                          count={Math.ceil(totalItemCount / itemsPerPage)}
                          page={currentPage}
                          onChange={handlePageChange}
                        />
                        </Box>
                    </TableCell>
                  </TableRow>
                </TableFooter>

            </Table>
            )}   
        </div>                
    )

}
export default AccountComponent;