import React, { Component } from "react";
import { Typography, Table, TableRow, TableCell, TableBody,TableHead } from "@mui/material";
import {Link} from 'react-router-dom';

class SavingComponentDetail extends Component{
    render(){
        return(
            <>
            <div className="component-div">
            <Typography variant='h4' align="center">상품상세</Typography>
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
                        <TableCell>든든한적금</TableCell>
                        <TableCell>22.02.14</TableCell>
                        <TableCell>3.05%</TableCell>
                        <TableCell>든든한적금</TableCell>
                        <TableCell>100,000</TableCell>
                        <TableCell>1,000,000</TableCell>
                        <TableCell>0.02%</TableCell>
                        <TableCell><button color="light"><Link to="edit">상품수정</Link></button></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            SELECT * FROM savings_product where s_pdName = ''; 
            </div>
            </>            
        )
    }
}
export default SavingComponentDetail;