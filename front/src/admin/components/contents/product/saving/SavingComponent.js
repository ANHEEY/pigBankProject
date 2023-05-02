import { Button, Table, Form } from 'react-bootstrap';
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
            <BiListCheck size={50}/> 적금상품
            </div><br/>
            <div style={{width:1000}}>
                <div className="card-body" style={{marginTop: "20px"}}>
                    <Table responsive striped style={{textAlign:"center"}}>
                        <thead>
                            <tr>
                                <th>상품명</th>
                                <th>상품금리</th>
                                <th>가입기간</th>
                                <th>최소금액</th>
                                <th>최대금액</th>
                                <th>중도해지시금리</th>
                                <th>상품등록일</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {pdSavingList.map(pdSaving =>
                                <tr key={pdSaving.spdname}>
                                    <td>{pdSaving.spdname}</td>
                                    <td>{pdSaving.srate}%</td>
                                    <td>{pdSaving.speriod}개월</td>
                                    <td>{pdSaving.smin}만원</td>
                                    <td>{pdSaving.smax}만원</td>
                                    <td>{pdSaving.scxlrate}%</td>
                                    <td>{pdSaving.sregdate}</td>
                                    <td>
                                        <button className="customerinfoBtn" onClick={() => goRegister(pdSaving.spdname)}>상세페이지</button>
                                    </td>
                                </tr>
                            )}  
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-end">
                    <Button variant="dark"><Link to="add" style={{color:"white"}}>상품등록</Link></Button>
                    </div>
                </div>
            </div><br /><br /><br />
        </div>
        </>
    )
}

export default SavingComponent;