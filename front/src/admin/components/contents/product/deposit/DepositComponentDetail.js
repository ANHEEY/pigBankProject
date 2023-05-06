import React, { useState,useEffect } from "react";
import {Link} from 'react-router-dom';
import {Button, Stack } from 'react-bootstrap';
import '../../../../resources/css/savingProduct/detail_sPd.css';
import AdminDepositService from "./AdminDepositService";
import { useNavigate } from "react-router-dom";

function DepositComponentDetail(){
    const navigate = useNavigate();

    const [depositProduct,setDepositProduct] = useState({
        dpdName:"",
        dcontent:"",
        dperiod:"",
        dmin:"",
        dmax:"",
        drate:"",
        dcxlRate:""
    });

    useEffect(()=>{
        AdminDepositService.depositPdDetail(window.localStorage.getItem("dpdName"))
            .then(res=>{
                setDepositProduct(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log('depositPdDetail() Error!!!', err);
            })
    },[]);

    const depositPdEdit=(dpdName)=>{
        window.localStorage.setItem("dpdName", dpdName);
        navigate('/admin/product/deposit/edit');
    }

    const deletePd=(dpdName)=>{
        AdminDepositService.depositPdDelete(dpdName)
            .then(res=>{
                alert(dpdName+' 상품의 삭제가 완료되었습니다!');
                navigate('/admin/product/deposit');
            })
            .catch(err => {
                console.log('depositPdDelete() Error!!!', err);
            })
    }
        return(
            <>
            <div className="component-div">
            <div className="admin-title">
                    예금상품 상세페이지
                </div>
                <div className="sPd-detailTable"><br/><br/>
                    <table className="sPd-detailTable-info" style={{width: 900}}>
                        <thead className="sPd-detailTable-title">
                            <tr><th colSpan={2}>Product</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th style={{width: '30%'}}>상품명</th>
                                <td style={{width: '70%', textAlign: 'center'}} value={depositProduct.dpdName}>{depositProduct.dpdName}</td>
                            </tr>
                            <tr>
                                <th>상품설명</th>
                                <td value={depositProduct.dcontent}>{depositProduct.dcontent}</td>
                            </tr>
                            <tr>
                                <th>예금 가입기간</th>
                                <td value={depositProduct.dperiod}>{depositProduct.dperiod}</td>
                            </tr>
                            <tr>
                                <th>예금가입 최소금액</th>
                                <td value={depositProduct.dmin}>{depositProduct.dmin}</td>
                            </tr>
                            <tr>
                                <th>예금가입 최대금액</th>
                                <td value={depositProduct.dmax}>{depositProduct.dmax}</td>
                            </tr>
                            <tr>
                                <th>적용금리</th>
                                <td value={depositProduct.drate}>{depositProduct.drate}%</td>
                            </tr>
                            <tr>
                                <th>중도해지시금리</th>
                                <td value={depositProduct.dcxlRate}>{depositProduct.dcxlRate}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div><br/><br/>
                <Stack direction="horizontal" gap={2} className="col-md-3 mx-auto">
                <Button variant="secondary" size="medium"><Link to="/admin/product/deposit"  style={{color:"white"}}>목록</Link></Button>
                <Button variant="success" type="submit" size="medium" onClick={()=>depositPdEdit(depositProduct.dpdName)}>수정</Button>
                <Button variant="outline-secondary" type="reset" size="medium" onClick={()=>deletePd(depositProduct.dpdName)}>삭제</Button>
                </Stack><br/><br/><br/> 
            </div>
            </>            
        )
    }

export default DepositComponentDetail;