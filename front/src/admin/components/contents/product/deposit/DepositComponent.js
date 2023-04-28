import { Table, TableHead, TableRow, TableCell, Button, TableBody } from "@mui/material";
import React, { useState,useEffect } from "react";
import {Link} from 'react-router-dom';
import AdminDepositService from "./AdminDepositService";
import { useNavigate } from "react-router-dom";

function DepositComponent(){
  const navigate = useNavigate();

  const [depositProducts,setDepositProduct]=useState([]);
  
    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 랜더링

    useEffect(() => {
      depositList();
    }, []);

    const depositList = () => {
      AdminDepositService.depositPdList()
            .then(res=>{
              setDepositProduct(res.data);
            })
            .catch(err=>{
                console.log('depositPdList() Error!!',err);
            });
      }

    const detailProduct = (dpdName)=>{
      window.localStorage.setItem("dpdName", dpdName);
      navigate('/admin/product/deposit/detail');
    }
                    
        return (
        
            <div className="component-div">
                <h1 style={{
                  textAlign:"center"
                }}>예금상품</h1>   
                <Button variant='contained' color='success' align="center" size="lg"><Link to="add" style={{color:"white"}}>상품등록</Link></Button>
                <div className="card-body">
                  <div style={{width:1300}}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{width:200, textAlign:'center'}}>예금상품이름</TableCell>
                          <TableCell style={{width:100, textAlign:'center'}}>가입기간</TableCell>
                          <TableCell style={{width:100, textAlign:'center'}}>예금상품금리</TableCell>
                          <TableCell style={{width:400, textAlign:'center'}}>예금상품설명</TableCell>
                          <TableCell style={{width:200, textAlign:'center'}}>예금최소금액</TableCell>
                          <TableCell style={{width:200, textAlign:'center'}}>예금최대금액</TableCell>
                          <TableCell style={{width:100, textAlign:'center'}}>중도해지시금리</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                         {depositProducts.map((product) => (
                          <TableRow key={product.dpdName}>
                            <TableCell style={{textAlign:'center'}} onClick={()=>detailProduct(product.dpdName)}>{product.dpdName}</TableCell>
                            <TableCell style={{textAlign:'center'}}>{product.dperiod}개월</TableCell>                            
                            <TableCell style={{textAlign:'center'}}>{product.drate}%</TableCell>
                            <TableCell style={{textAlign:'center'}}>{product.dcontent}</TableCell>
                            <TableCell style={{textAlign:'center'}}>{product.dmin}만원</TableCell>
                            <TableCell style={{textAlign:'center'}}>{product.dmax}만원</TableCell>
                            <TableCell style={{textAlign:'center'}}>{product.dcxlRate}%</TableCell>
                          </TableRow>
                        ))} 
                      </TableBody>
                    </Table>
                    
                </div>
            </div>
           </div>   

        );
      }
export default DepositComponent;