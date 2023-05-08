// 대출 상환 스케쥴
import { React, useState, useEffect } from "react";
import {Table, TableHead, TableRow, TableCell,  TableBody } from "@mui/material";
import { Button } from 'react-bootstrap'; // npm install react-bootstrap bootstrap
import { useParams, useNavigate } from 'react-router-dom';
import PayLoan from './PayLoan.js';
import AllService from "../All/AllService";

const LoanSchedule = () => {
    
    const tableHeadStyle={
        fontWeight: "bold",
        textAlign: "center",
    }

    const tableCellStyle={
        textAlign: "center",
    }
    
    // url에서 lnum값을 받아오는 useParams
    const { lnum } = useParams();
    // 대출 상환스케쥴
    const[LoanScheduleList, setLoanScheduleList] = useState([])
    // 납부하기 버튼 
    const [isChildVisible, setIsChildVisible] = useState(false);
    
    useEffect(() => {
      AllService.fetchLoanSchedule(lnum)
          .then(res => {
              setLoanScheduleList(res.data);
              console.log(res.data);
          })
          .catch(err => {
              console.log('fetchLoanSchedule Error', err);
          });
    }, [lnum]);
    
    // 납부하기 버튼을 눌렀을 때 상태 변경
    const handlePayButton = () => {
      setIsChildVisible(!isChildVisible);
    };

    // 금액 콤마 찍기
    const comma = (number) => {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    // 상환 대상 상태 표시
    const formattedLoanScheduleList = LoanScheduleList.map((schedule, index) => {
      const formattedPaystatus = index === 0 ? '상환대상' : '상한예정';
      return {
        ...schedule,
        formattedPaystatus,
      };
    });

    return(
        <main className="main">
             <br />
            <section className="section">
            <div className="container"> 
                <h2>대출상환스케쥴</h2> 
                <br />    
                <br />          
                <div class="card-body">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={tableHeadStyle}>회차</TableCell>
                          <TableCell style={tableHeadStyle}>월납입원금</TableCell>
                          <TableCell style={tableHeadStyle}>월납입이자</TableCell>
                          <TableCell style={tableHeadStyle}>월납입상환금</TableCell>
                          <TableCell style={tableHeadStyle}>상환상태</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                          {formattedLoanScheduleList.filter(schedule => schedule.lwillPayNum !== 0).map((schedule, index) => 
                          <TableRow key={schedule.lwillPayNum}>
                            <TableCell style={tableCellStyle}>{schedule.lpayTurn}회차</TableCell>
                            <TableCell style={tableCellStyle}>{comma(schedule.lmonPrice)}원</TableCell>
                            <TableCell style={tableCellStyle}>{comma(schedule.lmonRate)}원</TableCell>
                            <TableCell style={tableCellStyle}>{comma(schedule.lmonTotal)}원</TableCell>
                            <TableCell style={{ ...tableCellStyle,
                                                fontWeight: index === 0 ? 'bold' : 'normal', 
                                                color: index === 0 ? 'green' : 'black' }}>
                            {schedule.formattedPaystatus}
                            </TableCell>
                          </TableRow>
                          )}
                      </TableBody>
                    </Table>
                    <br />
                    <div style={{ position: "relative" }}>
                        <Button variant="success" style={{ position: "absolute", right: 0 }} onClick={handlePayButton}>
                            바로납부
                        </Button>
                        {isChildVisible && <PayLoan lwillPayNum={formattedLoanScheduleList[0].lwillPayNum}/>}
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