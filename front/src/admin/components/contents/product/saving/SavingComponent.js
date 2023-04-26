import { Typography, Table, TableHead, TableRow, TableCell, Button, TableBody } from "@mui/material";
import React, { Component } from "react";
import {Link} from 'react-router-dom';


class SavingComponent extends Component{
    render(){
        return(
            <>
                <div className="component-div">
                <Typography variant='h4' align="center">적금상품</Typography>
                <Button variant='contained' color='primary' align="center"><Link to="add">상품등록</Link></Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>적금상품이름</TableCell>
                            <TableCell>가입기간</TableCell>
                            <TableCell>적금상품금리</TableCell>
                            <TableCell>적금상품설명</TableCell>
                            <TableCell>적금최소금액</TableCell>
                            <TableCell>적금최대금액</TableCell>
                            <TableCell>중도해지시금리</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell><Link to="detail">든든한적금</Link></TableCell>
                            <TableCell>1년만기</TableCell>
                            <TableCell>3.05%</TableCell>
                            <TableCell>든든한적금상품</TableCell>
                            <TableCell>100,000</TableCell>
                            <TableCell>1,000,000</TableCell>
                            <TableCell>0.02</TableCell>
                        </TableRow>
                    </TableBody>

                    
                </Table>    
                SELECT * FROM savings_product;
                </div>
            </>            
        )
    }
}
export default SavingComponent;