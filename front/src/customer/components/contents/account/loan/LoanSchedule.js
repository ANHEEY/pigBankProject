// 대출 상환 스케쥴
import { React, useState } from "react";
import {Table, TableHead, TableRow, TableCell,  TableBody } from "@mui/material";
import { Button } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import "../../../../resources/css/product/saving.css";
import PayLoan from './PayLoan.js';

const LoanSchedule = () => {
    
    const tableHeadStyle={
        fontWeight: "bold",
    }
    
    const tableCellStyle={
        fontWeight: "bold",
        color:"green",
    }
    
    
    const [isChildVisible, setIsChildVisible] = useState(false);
    
      const handlePayButton = () => {
        setIsChildVisible(true);
    };

    return(
        <main className="main">
            <section className="section">
            <div className="container">
                <h2>대출상환스케쥴</h2>              
                <div class="card-body">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={tableHeadStyle}>회차</TableCell>
                          <TableCell style={tableHeadStyle}>월납입원금</TableCell>
                          <TableCell style={tableHeadStyle}>월납입이자</TableCell>
                          <TableCell style={tableHeadStyle}>월납입상환금</TableCell>
                          <TableCell style={tableHeadStyle}>상환예정일</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                          <TableRow >
                            <TableCell>1</TableCell>
                            <TableCell>1,000원</TableCell>
                            <TableCell>1,000원</TableCell>
                            <TableCell>1,000원</TableCell>
                            <TableCell>2023-02-03</TableCell>
                           </TableRow>
                      </TableBody>
                    </Table>
                    <br />
                    <div style={{ position: "relative" }}>
                        <Button variant="success" style={{ position: "absolute", right: 0 }} onClick={handlePayButton}>
                            납부하기
                        </Button>
                        { isChildVisible && < PayLoan />}
                    </div>
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