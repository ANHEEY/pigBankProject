// 장수영_ 대출 상세 페이지(대출 계좌 정보 및 납부 내역)
import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import {Table, TableCell,TableRow, TableHead, TableBody, Box, TableFooter}from "@mui/material";
import {Card,Row,Col,Container} from 'react-bootstrap';
import AllService from "../All/AllService";
import Pagination from "@mui/material/Pagination";


function AccountDetail() {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const {acNumber, id} = useParams();
    
    // 이체내역 리스트
    const [paidList, setPaidList] = useState([]);
    // 상세조회 
    const [accountDetail, setAccountDetail] = useState("");
    // 로딩
    const [loading, setLoading] = useState(true);
    
    // 아이콘 스타일
    const iconStyle = {
        color: 'green',
        fontSize: '2rem',
    };

    useEffect(() => {
        reloadAccountDetail(acNumber);
        reloadPaidList(acNumber);
    }, [acNumber]);


    // 계좌 상세 정보를 불러온다.
    const reloadAccountDetail = (acNumber) => {
        AllService.fetchLoanDetail(acNumber)
          .then(res => {
            setAccountDetail(res.data);
            setLoading(false);
          })
          .catch(err => {
            console.log('reloadAccountDetail() Error!!',err);
          });
    }

    // 거래 이체내역을 불러온다.
    const reloadPaidList = (acNumber) => {
        AllService.fetchPaidList(acNumber)
          .then(res => {
            setPaidList(res.data);
            setLoading(false);
          })
          .catch(err => {
            console.log('reloadMemberList() Error!!',err);
          });
    }

    // 계좌번호 => 문자열로 변환 후 slice
    const acNum = (e) => {
        if (!e) return "";  // acNumber가 undefined면 빈 문자열 반환
        return e.toString().slice(0, 3) + '-' + e.toString().slice(3);
    }

    // 화폐표시
    const formatCurrency = (value) => {
        const formatter = new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
        });
        return formatter.format(value);
    }
   
    // 날짜형식
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // 페이징 처리
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = paidList.slice(indexOfFirstItem, indexOfLastItem);
   
    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return(
        <main className="main">
        <Container>
        <Card>
            <Card.Header as="h2" style={{backgroundColor:"#dbe2d872" }}>{accountDetail.lpdName}</Card.Header>
            <br/>
            <Card.Body>
            <Row className="text-center">
                <Col>
                <i className="bi bi-calendar-check" style={iconStyle}></i>
                <Card.Title className="mt-3">시작일</Card.Title>
                <Card.Text>
                {formatDate(accountDetail.lstartDate)}
                </Card.Text>
                </Col>
                <Col>
                <i className="bi bi-calendar-check-fill" style={iconStyle}></i>
                <Card.Title className="mt-3">만기일</Card.Title>
                <Card.Text>
                {formatDate(accountDetail.lendDate)}
                </Card.Text>
                </Col>
                <Col>
                <i className="bi bi-bank" style={iconStyle}></i>
                <Card.Title className="mt-3">대출상환종류</Card.Title>
                <Card.Text>
                {accountDetail.ltype}
                </Card.Text>
                </Col>
            </Row>
            <br/>
            <Row className="text-center">
                <Col>
                <i className="bi bi-piggy-bank" style={iconStyle}></i>
                <Card.Title className="mt-3">대출이자</Card.Title>
                <Card.Text>
                {accountDetail.lrate}%    
                </Card.Text>
                </Col>
                <Col>
                <i className="bi bi-cash" style={iconStyle}></i>
                <Card.Title className="mt-3">중도상환수수료율</Card.Title>
                <Card.Text>
                {accountDetail.lcxlRate}% 
                </Card.Text>
                </Col>
                <Col>
                <i className="bi bi-coin" style={iconStyle}></i>
                <Card.Title className="mt-3">대출잔액</Card.Title>
                <Card.Text>
                {formatCurrency(accountDetail.acBalance)}
                </Card.Text>
                </Col>
            </Row>
            </Card.Body>
            <Card.Footer style={{backgroundColor:"#dbe2d872" }}>
            <br/>  
        </Card.Footer>
        </Card>
        </Container>
        <br/><br/> 
            <div className="container">
                <h2>상환내역</h2>
                <div className="card-body">

                {loading ? (
                    <p style={{textAlign:"center"}}>Loading...</p>
                ) : (
                    <Table>
                        <TableHead style={{backgroundColor:"#dbe2d872" }}>
                            <TableRow >
                            <TableCell>계좌번호</TableCell>
                            <TableCell>납부회차</TableCell>
                            <TableCell>납부원금</TableCell>
                            <TableCell>납부이자</TableCell>
                            <TableCell>총납부금액</TableCell>
                            <TableCell>거래날짜</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {currentItems.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} style={{textAlign:"center"}}>이체결과없음</TableCell>
                            </TableRow>

                            ) : (
                            currentItems.map((paidInfo) => (
                            <TableRow key={paidInfo.lpaidNum}>
                                <TableCell>{acNum(paidInfo.acNumber)}</TableCell>
                                <TableCell>{paidInfo.lpayTurn}회차</TableCell>
                                <TableCell>{formatCurrency(paidInfo.lmonPrice)}</TableCell>
                                <TableCell>{formatCurrency(paidInfo.lmonRate)}</TableCell>
                                <TableCell>{formatCurrency(paidInfo.lmonTotal)}</TableCell>
                                <TableCell>{formatDate(paidInfo.lpayDate)}</TableCell>
                            </TableRow>
                            ))
                            )}
                        </TableBody>
                        <TableFooter >
                            <TableRow >
                            <TableCell colSpan={7} style={{textAlign:"center"}}>
                                <Box display="flex" justifyContent="center">
                                <Pagination 
                                count={Math.ceil(paidList.length / itemsPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                                />
                                </Box>
                            </TableCell>
                            </TableRow>

                            <TableRow>
                            <TableCell colSpan={7} style={{textAlign:"center"}}>
                                    <Box display="flex" justifyContent="center">
                                    <Link to="/customer/account/Loan">Back</Link>
                                    </Box>
                            </TableCell>
                            </TableRow>

                            
                        </TableFooter>
                    </Table>
                )}
                <br /><br />
                </div>
            </div>
        </main>
    )
}
export default AccountDetail;