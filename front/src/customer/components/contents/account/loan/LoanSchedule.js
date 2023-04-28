// 대출 상환 스케쥴
import React from "react";
import {Table, TableHead, TableRow, TableCell,  TableBody } from "@mui/material";
import "../../../../resources/css/product/saving.css";
import {Link} from 'react-router-dom';
import { Button, Stack } from 'react-bootstrap'; // npm install react-bootstrap bootstrap

const tableHeadStyle= {
    fontWeight: "bold",
}

const LoanSchedule = () => {
    return(
        <main className="main">
            <section className="section">
            <div className="container">
                <h2>대출상환스케쥴</h2>               
                <div class="card text-center">
                    <div class="card-header" style={{backgroundColor:"#dbe2d872" }}>
                        <ul class="nav nav-tabs card-header-tabs">
                        <li class="nav-item">
                            <a class="nav-link disabled" href="/customer/account/Loan">대출계좌</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="/customer/account/Saving" ><Link to="/customer/account/Saving">적금계좌</Link></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="/customer/account/Deposit"><Link to="/customer/account/Deposit">예금계좌</Link></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="/customer/account/LoanState"><Link to="/customer/account/LoanState">대출심사결과조회</Link></a>
                        </li>
                        </ul>
                    </div>
                </div>

                <div class="card-body">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={tableHeadStyle}>계좌명</TableCell>
                          <TableCell style={tableHeadStyle}>계좌번호</TableCell>
                          <TableCell style={tableHeadStyle}>가입기간</TableCell>
                          <TableCell style={tableHeadStyle}>용도</TableCell>
                          <TableCell style={tableHeadStyle}>한도</TableCell>
                          <TableCell style={tableHeadStyle}>상환잔액</TableCell>
                          <TableCell style={tableHeadStyle}>업무</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                          <TableRow >
                            <TableCell style={{color:"purple"}}>{}</TableCell>
                            <TableCell>{}</TableCell>
                            <TableCell>{}</TableCell>
                            <TableCell>{}</TableCell>
                            <TableCell>{this.formatCurrency()}</TableCell>
                            <TableCell>{this.formatCurrency()}</TableCell>
                            <TableCell>
                                <Stack gap={2} className="col-md-8">
                                <Button variant="outline-secondary" type="submit">상환스케쥴</Button>
                                <Button variant="outline-secondary" type="button">상환내역</Button>
                                </Stack>
                            </TableCell>
                           </TableRow>
                      </TableBody>
                    </Table>
                </div>
            </div> 
            </section>
            <br />
            <br />
            <br />
          </main>
    )
}
export default LoanSchedule;