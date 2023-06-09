import React,{useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import AllService from "../All/AllService";
import "../../../../resources/css/product/saving.css";
import Pagination from "@mui/material/Pagination";
import {Table, TableCell,TableRow, TableHead, TableBody, Box, TableFooter}from "@mui/material";
import { getAuthToken } from "../../../helpers/axios_helper";
import axios from "axios";
import {Card,Button,Row,Col,Stack,Container} from 'react-bootstrap';
import DepositService from "../Deposit/DepositService";


function SavingDetail() {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const {acNumber} = useParams();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortColumn, setSortColumn] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [account,setAccount] = useState([]);

    const iconStyle = {
        color: 'green',
        fontSize: '2rem',
    };

    useEffect(() => {
        if(getAuthToken() !== null){
            axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`;
          } else{
            axios.defaults.headers.common['Authorization'] = ``;
          }
        reloadMemberList(acNumber);
        saDetailInfo(acNumber);
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

    const saDetailInfo = (acNumber) =>{
        DepositService.saDetailInfo(acNumber)
            .then(res=>{
                setAccount(res.data);
                console.log(res.data);
            })
            .catch(err=>{
                console.log('saDetailInfo() error!!!',err);
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

    // 계좌번호 => 문자열로 변환 후 slice
    const acNum = (e) => {
        console.log(e);
        if(!e) return "";       
        return e.toString().slice(0, 3) + '-' + e.toString().slice(3);
    }
       

    return(
        <main className="main">
        <Container>
        <Card>
            <Card.Header as="h2" style={{backgroundColor:"#dbe2d872" }}>{account.spdname}</Card.Header>
            <br/>
            <Card.Body>
                <Row className="text-center">
                    <Col className="col-md-2 mx-auto">
                        <i className="bi bi-coin" style={iconStyle}></i>
                        <Card.Title>통장 잔액</Card.Title>
                        <Card.Text>
                            {account.acBalance !== 0 ? formatCurrency(account.acBalance) : <h2 style={{color:'green',fontWeight:'bold'}}>해지완료</h2>}
                        </Card.Text>
                    </Col>
                    <Col className="col-md-2 mx-auto">
                        <i className="bi bi-calendar-check" style={iconStyle}></i>
                        <Card.Title>개설 날짜</Card.Title>
                        <Card.Text>
                            {new Date(account.sjoinDate).toLocaleDateString().slice(0,-1)}
                        </Card.Text>
                    </Col>
                    <Col className="col-md-2 mx-auto">
                        <i className="bi bi-cash-coin" style={iconStyle}></i>
                        <Card.Title>적금 정기 납입금액</Card.Title>
                        <Card.Text>
                            {formatCurrency(account.samount)}
                        </Card.Text>
                    </Col>
                    <Col className="col-md-2 mx-auto">
                        <i className="bi bi-bank" style={iconStyle}></i>
                        <Card.Title>적금계좌번호</Card.Title>
                        <Card.Text>
                            {acNum(account.acNumber)}
                        </Card.Text>
                    </Col>
                </Row>
                <br/><br/>
                <Row className="text-center">
                    <Col className="col-md-2 mx-auto">
                        <i className="bi bi-piggy-bank" style={iconStyle}></i>
                        <Card.Title>만기 예상 금액</Card.Title>
                        <Card.Text>
                            {formatCurrency(account.sexpAmount)}
                        </Card.Text>
                        </Col>
                    <Col className="col-md-2 mx-auto">
                        <i className="bi bi-calendar-check-fill" style={iconStyle}></i>
                        <Card.Title>만기 날짜</Card.Title>
                        <Card.Text>
                            {new Date(account.sendDate).toLocaleDateString().slice(0,-1)}
                        </Card.Text>
                    </Col>
                    <Col className="col-md-2 mx-auto">
                        <i className="bi bi-wallet2" style={iconStyle}></i>
                        <Card.Title>매월 납입 계좌번호</Card.Title>
                        <Card.Text>
                            {acNum(account.withdrawAcNumber)}
                        </Card.Text>
                    </Col>
                    <Col className="col-md-2 mx-auto">        
                        <i className="bi bi-bank2" style={iconStyle}></i>      
                        <Card.Title>만기시 입금계좌</Card.Title>
                        <Card.Text>
                            {acNum(account.sdeAccount)}
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
            <br/> 
            <Card.Footer style={{backgroundColor:"#dbe2d872" }}>
            <br/>  
            </Card.Footer>
        </Card>
        </Container>
        <br/><br/>
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
                            {/* <TableCell>받는통장메모</TableCell> */}
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
                                <TableCell>{member.ttype === '출금' ? member.myMemo:member.yourMemo}</TableCell>
                                {/* <TableCell>{member.yourMemo}</TableCell> */}
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