import React, { useState, useEffect } from "react";
import {Button, Stack } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import '../../../../resources/css/savingProduct/detail_sPd.css';
import SavingApiService from "./SavingApiService";

function SavingComponentDetail () {
    
    const [selectByPdName, setSelectByPdName] = useState([]); 

    useEffect(() => {
        console.log(window.localStorage.getItem("spdname"));
        SavingApiService.selectByPdName( window.localStorage.getItem("spdname"))
        .then((res) => {
            setSelectByPdName(res.data)
        })
        .catch((err) => {
            console.log('loadPdSavingByPdName() Error!!', err);
        })

    }, []);

    const navigate = useNavigate();

    // 수정버튼
    const edit = (spdname) => {
        window.localStorage.setItem("spdname", spdname);
        navigate("/admin/product/saving/edit");
    }

    // 삭제버튼
    const sPdDelete = (spdname) => {
        SavingApiService.deleteSaving(spdname)
            .then(res => {
                window.alert('상품이 삭제되었습니다.');
                navigate("/admin/product/saving");
            })
            .catch(err => {
                console.log('deleteSaving Error!!', err);
            })
    }

    return(
        <>
          <div className="component-div">
           <div className="admin-title">
               상품 상세페이지
           </div>
           <div className="sPd-detailTable">
               <table className="sPd-detailTable-info" style={{width: 900}}>
                   <thead className="sPd-detailTable-title">
                       <tr><th colSpan={2}>Product</th></tr>
                   </thead>
                        <tbody key={selectByPdName.spdname}>
                            <tr>
                                <th style={{width: '30%'}}>상품명</th>
                                <td style={{width: '70%', textAlign: 'center'}}>{selectByPdName.spdname}</td>
                            </tr>
                            <tr>
                                <th>상품설명</th>
                                <td>{selectByPdName.scontent}</td>
                            </tr>
                            <tr>
                                <th>가입기간</th>
                                <td>{selectByPdName.speriod}개월</td>
                            </tr>
                            <tr>
                                <th>적금가입 최소금액</th>
                                <td>{selectByPdName.smin}만원</td>
                            </tr>
                            <tr>
                                <th>적금가입 최대금액</th>
                                <td>{selectByPdName.smax}만원</td>
                            </tr>
                            <tr>
                                <th>적용금리</th>
                                <td>{selectByPdName.srate}%</td>
                            </tr>
                            <tr>
                                <th>중도해지시금리</th>
                                <td>{selectByPdName.scxlrate}%</td>
                            </tr>
                            <tr>
                                <th>상품등록일</th>
                                <td>{selectByPdName.sregdate}</td>
                            </tr>
                        </tbody>
               </table>
           </div><br/><br/>
           <Stack direction="horizontal" gap={2} className="col-md-3 mx-auto">
            <Button variant="success" ><Link to="/admin/product/saving" style={{color:"white"}}>목록</Link></Button>
            <Button variant="success" size="medium" onClick={() => edit(selectByPdName.spdname)}>수정</Button>
            <Button variant="outline-secondary"  size="medium" style={{color:"black"}} onClick={() => sPdDelete(selectByPdName.spdname)}>삭제</Button>
           </Stack><br/><br/><br/> 
       </div>  
       </>             
   )
}
export default SavingComponentDetail;