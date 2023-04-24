import { Typography, Table, TableHead, TableRow, TableCell, Button, TableBody } from "@mui/material";
import React, { Component } from "react";
import {Link} from 'react-router-dom';


class DepositComponent extends Component{
    render(){
        return(
            <>
                <div>
                <Typography variant='h4' align="center">예금상품</Typography>
                <Button variant='contained' color='primary' align="center"><Link to="add">상품등록</Link></Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>예금상품이름</TableCell>
                            <TableCell>가입기간</TableCell>
                            <TableCell>예금상품금리</TableCell>
                            <TableCell>예금상품설명</TableCell>
                            <TableCell>예금최소금액</TableCell>
                            <TableCell>예금최대금액</TableCell>
                            <TableCell>중도해지시금리</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell><Link to="detail">든든예금</Link></TableCell>
                            <TableCell>1년만기</TableCell>
                            <TableCell>3.05%</TableCell>
                            <TableCell>든든한예금상품</TableCell>
                            <TableCell>100,000</TableCell>
                            <TableCell>1,000,000</TableCell>
                            <TableCell>0.02</TableCell>
                        </TableRow>
                    </TableBody>

                    <TableBody>
                        <TableRow>
                            <TableCell>목돈마련예금</TableCell>
                            <TableCell>2년만기</TableCell>
                            <TableCell>23%</TableCell>
                            <TableCell>목돈마련예금상품</TableCell>
                            <TableCell>100,000</TableCell>
                            <TableCell>5,000,000</TableCell>
                            <TableCell>0.05</TableCell>
                        </TableRow>
                    </TableBody>

                    <TableBody>
                        <TableRow>
                            <TableCell>내집마련예금</TableCell>
                            <TableCell>5년만기</TableCell>
                            <TableCell>17%</TableCell>
                            <TableCell>내집마련예금상품</TableCell>
                            <TableCell>10,000,000</TableCell>
                            <TableCell>50,000,000</TableCell>
                            <TableCell>0.03</TableCell>
                        </TableRow>
                    </TableBody>
                    
                    <TableBody>
                        <TableRow>
                            <TableCell>결혼준비예금</TableCell>
                            <TableCell>6개월만기</TableCell>
                            <TableCell>7%</TableCell>
                            <TableCell>결혼준비예금상품</TableCell>
                            <TableCell>10,000,000</TableCell>
                            <TableCell>20,000,000</TableCell>
                            <TableCell>0.02</TableCell>
                        </TableRow>
                    </TableBody>

                    <TableBody>
                        <TableRow>
                            <TableCell>2세계획예금</TableCell>
                            <TableCell>10개월만기</TableCell>
                            <TableCell>50%</TableCell>
                            <TableCell>2세계획예금상품</TableCell>
                            <TableCell>1,000,000</TableCell>
                            <TableCell>50,000,000</TableCell>
                            <TableCell>0.01</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>    
                SELECT * FROM  deposit_product;
                </div>
            </>            
        )
    }
}
export default DepositComponent;