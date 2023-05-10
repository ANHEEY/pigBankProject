import  React, {useState, useEffect} from "react";
import {Button, Stack } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import '../../../../resources/css/savingProduct/detail_sPd.css';
import LoanApiService from './LoanApiService.js';


const LoanComponentDetail = () => {
    const [product, setProduct] = useState({});

    useEffect(() => {
        LoanApiService.fetchProductByName(window.localStorage.getItem("lpdName"))
          .then(res => {
            let product = res.data;
            setProduct(product)
            window.localStorage.removeItem("lpdName");
          })
          .catch(err => {
            console.log('fetchProdcutList Error!', err);
          });
    }, []);
    
    const navigate = useNavigate();

    // edit 버튼
    const edit = (lpdName) => {
        window.localStorage.setItem("lpdName", lpdName);
        navigate("/admin/product/loan/edit");
    }

    // delete 버튼
    const deleteProduct = (lpdName) => {
        LoanApiService.deleteProduct(lpdName)
        .then(res => {
            navigate("/admin/product/loan");
        })
        .catch(err => {
            console.log('deleteMember() 에러!', err);
        });
    }
    
    return(
        <>
        <div className="component-div">
        <div className="admin-title">
            대출상품 상세페이지
        </div>
        <div className="sPd-detailTable"><br/><br/>
            <table className="sPd-detailTable-info" style={{width: 900}}>
                <thead className="sPd-detailTable-title">
                    <tr><th colSpan={2}>Product</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <th style={{width: '30%'}}>상품명</th>
                        <td style={{width: '70%', textAlign: 'center'}}>{product.lpdName}</td>
                    </tr>
                    <tr>
                        <th>대출설명 한줄요약</th>
                        <td>{product.lsubTitle}</td>
                    </tr>
                    <tr>
                        <th>대출상품설명</th>
                        <td>{product.lcontent}</td>
                    </tr>
                    <tr>
                        <th>대출신청자격</th>
                        <td>{product.lgrade}</td>
                    </tr>
                    <tr>
                        <th>대출가능 최장기간</th>
                        <td>{product.lmaxPeriod}년</td>
                    </tr>
                    <tr>
                        <th>대출가능 최고금액</th>
                        <td>{product && product.lmaxPrice ? (product.lmaxPrice).toLocaleString(): ''}만원</td>
                    </tr>
                    <tr>
                        <th>대출이자</th>
                        <td>{product.lrate}%</td>
                    </tr>
                    <tr>
                        <th>대출상환방법</th>
                        <td>{product.ltype}</td>
                    </tr>
                    <tr>
                        <th>중도상환수수료율</th>
                        <td>{product.lcxlRate}%</td>
                    </tr>
                    <tr>
                        <th>상품등록날짜</th>
                        <td>{new Date(product.lregDate).toLocaleDateString().slice(0,-1)}</td>
                    </tr>
                </tbody>
            </table>
        </div><br/><br/>
        <Stack direction="horizontal" gap={2} className="col-md-3 mx-auto">
        <Button variant="success" size="medium" onClick={() => edit(product.lpdName)}>수정</Button>
        <Button variant="outline-secondary" size="medium" style={{color:"black"}} onClick={() => deleteProduct(product.lpdName)}>삭제</Button>
        <Button variant="secondary" size="medium"><Link to="/admin/product/loan" style={{color:"white"}}>목록</Link></Button>
        </Stack><br/><br/><br/> 
    </div>  
    </>             
    )
}
export default LoanComponentDetail;