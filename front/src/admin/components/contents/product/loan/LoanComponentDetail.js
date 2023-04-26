import React, { Component } from "react";
import { Typography, Table, TableRow, TableCell, TableBody, TableHead } from "@mui/material";
import {Link} from 'react-router-dom';

class LoanComponentDetail extends Component{
    render(){
        return(
            <>
            <div className="component-div">
            <Typography variant='h4' align="center">대출상품상세</Typography>
            <Table>
            <TableHead>
                    <TableRow>
                        <TableCell>대출상품이름</TableCell>
                        <TableCell>대출상품설명</TableCell>
                        <TableCell>대출신청자격</TableCell>
                        <TableCell>대출가능최장기간</TableCell>
                        <TableCell>대출가능최고금액</TableCell>
                        <TableCell>대출이자</TableCell>
                        <TableCell>대출상환방법</TableCell>
                        <TableCell>중도상환수수료율</TableCell>
                    </TableRow>
                </TableHead>
            
                <TableBody>
                    <TableRow>
                        <TableCell>꿀꿀대출</TableCell>
                        <TableCell>#돼지은행대표상품</TableCell>
                        <TableCell>조건없음</TableCell>
                        <TableCell>5년</TableCell>
                        <TableCell>5,000,000</TableCell>
                        <TableCell>3.04%</TableCell>
                        <TableCell>만기상환</TableCell>
                        <TableCell>11%</TableCell>
                        <TableCell><button color="light"><Link to="edit">상품수정</Link></button></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            SELECT * FROM loan_product WHERE l_pdName='';
            </div>
            </>            
        )
    }
}
export default LoanComponentDetail;