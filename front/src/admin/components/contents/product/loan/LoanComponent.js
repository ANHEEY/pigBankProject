import { Typography, Table, TableHead, TableRow, TableCell, Button, TableBody } from "@mui/material";
import React, { Component } from "react";
import {Link} from 'react-router-dom';

class LoanComponent extends Component{
    render(){
        return(
            <>
            <div className="component-div">
            <Typography variant='h4' align="center">대출상품</Typography>
            <Button variant='contained' color='primary' align="center"><Link to="add">상품등록</Link></Button>
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
                        <TableCell><Link to="detail">꿀꿀대출</Link></TableCell>
                        <TableCell>#돼지은행대표상품</TableCell>
                        <TableCell>조건없음</TableCell>
                        <TableCell>5년</TableCell>
                        <TableCell>5,000,000</TableCell>
                        <TableCell>3.04%</TableCell>
                        <TableCell>만기상환</TableCell>
                        <TableCell>11%</TableCell>
                    </TableRow>
                </TableBody>

                <TableBody>
                    <TableRow>
                    <TableCell>멧돼지대출</TableCell>
                        <TableCell>#높은금리,#높은대출금액</TableCell>
                        <TableCell>조건없음</TableCell>
                        <TableCell>1년</TableCell>
                        <TableCell>50,000,000</TableCell>
                        <TableCell>10.04%</TableCell>
                        <TableCell>만기상환,중도상환 가능</TableCell>
                        <TableCell>30%</TableCell>
                    </TableRow>
                </TableBody>

                <TableBody>
                    <TableRow>
                    <TableCell>황금돼지대출</TableCell>
                        <TableCell>우대고객대출상품</TableCell>
                        <TableCell>우대고객해당</TableCell>
                        <TableCell>3년</TableCell>
                        <TableCell>20,000,000</TableCell>
                        <TableCell>1.04%</TableCell>
                        <TableCell>만기상환</TableCell>
                        <TableCell>5%</TableCell>
                    </TableRow>
                </TableBody>
                
            </Table>    
            SELECT * FROM loan_product;<br/>
            </div>
        </>            
        )
    }
}
export default LoanComponent;