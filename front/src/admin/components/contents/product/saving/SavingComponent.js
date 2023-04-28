import { Table, TableHead, TableRow, TableCell, Button, TableBody } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { BiListCheck } from "react-icons/bi";
import SavingApiService from "./SavingApiService";


function SavingComponent() {

    const [pdSavingList, setPdSavingList] = useState([]);

    useEffect(() => {
        reloadPdSavingList();
    }, []);

    const reloadPdSavingList = () => {
        SavingApiService.fetchPdSaving()
        .then((res) => {
            setPdSavingList(res.data)
        })
        .catch((err) => {
            console.log('reloadPdSavingList() Error!!', err);
        })
    }

    const navigator = useNavigate();

    const goRegister = (spdname) => {

        window.localStorage.setItem("spdname", spdname);
        navigator('/admin/product/saving/detail');
    }

    return (
        <>
        <div className="component-div">
            <div className="admin-title">
            <BiListCheck /> 적금상품
            </div>
            <Button variant='primary' align="left"><Link to="add">상품등록</Link></Button>
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
                <TableCell>버튼</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {pdSavingList.map(pdSaving =>
                <TableRow key={pdSaving.spdname}>
                    <TableCell>{pdSaving.spdname}</TableCell>
                    <TableCell>{pdSaving.speriod}</TableCell>
                    <TableCell>{pdSaving.srate}</TableCell>
                    <TableCell>{pdSaving.scontent}</TableCell>
                    <TableCell>{pdSaving.smin}</TableCell>
                    <TableCell>{pdSaving.smax}</TableCell>
                    <TableCell>{pdSaving.scxlrate}</TableCell>
                    <TableCell>
                        <Button onClick={() => goRegister(pdSaving.spdname)}>상세페이지</Button>
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
        </>
    )
}

export default SavingComponent;