import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Table, TableHead, TableRow, TableCell, TableBody, TableFooter, Box } from "@mui/material";
import AllService from "../../../../customer/components/contents/account/All/AllService";
import axios from "axios";
import { getAuthToken } from "../../../../customer/components/helpers/axios_helper";
import Pagination from "@mui/material/Pagination";

function DormantComponent (){


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        if(getAuthToken() !== null){
            axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
          } else{
            axios.defaults.headers.common['Authorization'] = ``;
          }
        reloadMemberList(window.localStorage.getItem("id"));
    }, []);


    const reloadMemberList = () => {
        AllService.fetchadminSleep()
          .then(res => {
            setMembers(res.data);
            setLoading(false);
          })
          .catch(err => {
            console.log('reloadMemberList() Error!!',err);
          });
    }

    const acNum = (acNumber) => {
        const acNum = acNumber.toString().slice(0, 3) + '-' + acNumber.toString().slice(3);
        return acNum;
    }
    
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        date.setTime(date.getTime() + (9 * 60 * 60 * 1000)); 
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const formatCurrency = (value) => {
        const formatter = new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
        });
        return formatter.format(value);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = members.slice(indexOfFirstItem, indexOfLastItem);
   
    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSleepRelease = (acNumber) => {
        const confirmResult = window.confirm('휴면해제를 하시겠습니까?');
        if (confirmResult) {
            AllService.fetchAdminSleepRelease(acNumber)
            .then(res => {
              setMembers(res.data);
            })
            .catch(err => {
              console.log('reloadMemberList() Error!!', err);
            });

           
        }
    };

    const tableHeadStyle = {
        fontWeight: "bold",
    };

    return(
        <div className="component-div">
            <h1><FontAwesomeIcon icon={faSearch}/> 휴면계좌조회</h1>
            <ul>
                
            </ul>
            {loading ? (
                    <p style={{textAlign:"center"}}>Loading...</p>
            ) : (
            <Table>
                <TableHead style={{backgroundColor:"#dbe2d872"}}>
                    <TableRow>
                        <TableCell style={tableHeadStyle}>은행</TableCell>
                        <TableCell style={tableHeadStyle}>계좌명</TableCell>
                        <TableCell style={tableHeadStyle}>계좌번호</TableCell>
                        <TableCell style={tableHeadStyle}>가입날짜</TableCell>
                        <TableCell style={tableHeadStyle}>잔액</TableCell>
                        <TableCell style={tableHeadStyle}>상태</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>


                <TableBody>
                    {currentItems.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={7} style={{textAlign:"center"}}>휴면계좌없음</TableCell>
                    </TableRow>

                    ) : (
                        currentItems.map((member) => (
                    <TableRow key={member.acNumber}>
                        <TableCell >{member.bankName}</TableCell>
                        <TableCell>{member.acType}</TableCell>
                        <TableCell>{acNum(member.acNumber)}</TableCell>
                        <TableCell>{formatDate(member.newDate)}</TableCell>
                        <TableCell>{formatCurrency(member.acBalance)}</TableCell>
                        <TableCell>{member.acState}</TableCell>
                        <TableCell>
                            <button onClick={() => handleSleepRelease(member.acNumber)}>휴면해제</button>
                        </TableCell>
                    </TableRow>
                    ))

                    )}
                </TableBody>

                <TableFooter>
                  <TableRow>
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
                </TableFooter>

            </Table>
            )}

        </div>            
    )
    
}
export default DormantComponent;