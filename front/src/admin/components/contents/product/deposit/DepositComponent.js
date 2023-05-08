import { Form,Button,Table } from 'react-bootstrap';
import React, { useState,useEffect } from "react";
import {Link} from 'react-router-dom';
import AdminDepositService from "./AdminDepositService";
import { useNavigate } from "react-router-dom";
import { BiListCheck } from "react-icons/bi";
import '../../../../resources/css/customer/detail_customer.css';


function DepositComponent(){
  const navigate = useNavigate();

  const [depositProducts,setDepositProduct]=useState([]);
  
    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 랜더링

    useEffect(() => {
      AdminDepositService.depositPdList()
            .then(res=>{
              setDepositProduct(res.data);
            })
            .catch(err=>{
                console.log('depositPdList() Error!!',err);
            });
    }, []);

    const detailProduct = (dpdName)=>{
      window.localStorage.setItem("dpdName", dpdName);
      navigate('/admin/product/deposit/detail');
    }
    return (
      <>
      <div className="component-div">
          <div className="admin-title">
          <BiListCheck /> 예금상품
          </div>
          <div style={{width:1000}}>
              <div className="card-body" style={{marginTop: "20px"}}>
                  <Table responsive striped style={{textAlign:"center"}}>
                      <thead>
                          <tr>
                              <th>예금상품명</th>
                              <th>예금상품금리</th>
                              <th>가입기간</th>
                              <th>예금최소금액</th>
                              <th>예금최대금액</th>
                              <th>중도해지시금리</th>
                              <th>상품등록일</th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                          {depositProducts.map(product =>
                              <tr key={product.dpdName}>
                                  <td>{product.dpdName}</td>
                                  <td>{product.drate}%</td>
                                  <td>{product.dperiod}개월</td>
                                  <td>{product.dmin}만원</td>
                                  <td>{product.dmax}만원</td>
                                  <td>{product.dcxlRate}%</td>
                                  <td>{new Date(product.dregDate).toLocaleDateString().slice(0,-1)}</td>
                                  <td>
                                      <button className="customerinfoBtn" onClick={()=>detailProduct(product.dpdName)}>상세페이지</button>
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
export default DepositComponent;