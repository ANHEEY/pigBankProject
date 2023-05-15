import React,{useEffect, useState} from "react";
import { useParams , Link} from "react-router-dom";
import AllService from "../All/AllService";
import "../../../../resources/css/product/saving.css";
import Pagination from "@mui/material/Pagination";
import {Table, TableCell,TableRow, TableHead, TableBody, Box, TableFooter}from "@mui/material";
import {Card,Row,Col,Container} from 'react-bootstrap';
import DepositService from "../Deposit/DepositService";


function DepositDetail() {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const {acNumber, id} = useParams();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [account,setAccount] = useState([]);

    const iconStyle = {
        color: 'green',
        fontSize: '2rem',
    };

    useEffect(() => {
        reloadMemberList(acNumber);
        deDetailInfo(acNumber);
    }, [acNumber]);


    const reloadMemberList = (acNumber) => {
        AllService.fetchDepositDetail(acNumber)
          .then(res => {
            setMembers(res.data);
            setLoading(false);
          })
          .catch(err => {
            console.log('reloadMemberList() Error!!',err);
          });
    }

    const deDetailInfo = (acNumber) =>{
        DepositService.deDetailInfo(acNumber)
            .then(res=>{
                setAccount(res.data);
                console.log(res.data);
            })
            .catch(err=>{
                console.log('deDetailInfo() error!!!',err);
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
            <Card.Header as="h2" style={{backgroundColor:"#dbe2d872" }}>{account.dpdName}</Card.Header>
            <br/>
            <Card.Body>
                <Row className="text-center">
                    <Col className="col-md-2 mx-auto">
                        <i className="bi bi-coin" style={iconStyle}></i>
                        <Card.Title>통장 잔액</Card.Title>
                        <Card.Text>
                            {account.damount !== 0 ? formatCurrency(account.damount) : <h2 style={{color:'green',fontWeight:'bold'}}>해지완료</h2>}
                        </Card.Text>
                    </Col>
                    <Col className="col-md-2 mx-auto">
                        <i className="bi bi-calendar-check" style={iconStyle}></i>
                        <Card.Title>개설 날짜</Card.Title>
                        <Card.Text>
                            {new Date(account.djoinDate).toLocaleDateString().slice(0,-1)}
                        </Card.Text>
                    </Col>
                    <Col className="col-md-2 mx-auto">
                        <i className="bi bi-bank" style={iconStyle}></i>
                        <Card.Title>예금계좌번호</Card.Title>
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
                            {formatCurrency(account.dexpAmount)}
                        </Card.Text>
                        </Col>
                    <Col className="col-md-2 mx-auto">
                        <i className="bi bi-calendar-check-fill" style={iconStyle}></i>
                        <Card.Title>만기 날짜</Card.Title>
                        <Card.Text>
                            {new Date(account.dendDate).toLocaleDateString().slice(0,-1)}
                        </Card.Text>
                    </Col>
                    <Col className="col-md-2 mx-auto">        
                        <i className="bi bi-cash" style={iconStyle}></i>        
                        <Card.Title>만기시 입금계좌</Card.Title>
                        <Card.Text>
                            {acNum(account.ddeAccount)}
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
                <h2>예금이체내역</h2>
                <div className="card-body">
                    
                {loading ? (
                    <p style={{textAlign:"center"}}>Loading...</p>
                ) : (
                    <Table>
                    <TableHead style={{ backgroundColor: "#dbe2d872" }}>
                        <TableRow>
                        <TableCell>거래번호</TableCell>
                        <TableCell>계좌번호</TableCell>
                        <TableCell>거래종류</TableCell>
                        <TableCell>금액</TableCell>
                        <TableCell>내통장메모</TableCell>
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
                            <TableCell>{member.tnum}</TableCell>
                            <TableCell>{member.tdepositBank}</TableCell>
                            <TableCell>{member.ttype}</TableCell>
                            <TableCell>
                                {formatCurrency(member.tamount)}
                            </TableCell>
                            <TableCell>{member.ttype === '출금' ? member.myMemo:member.yourMemo}</TableCell>
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
                                    <Link to="/customer/account/deposit">Back</Link>
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
export default DepositDetail;