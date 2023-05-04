// 대출상품
import  React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import { Button, Table, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import  LoanApiService from "./LoanApiService";
import '../../../../resources/css/customer/detail_customer.css'


const LoanComponent = () => {
    const [listPdLoan, setListPdLoan]= useState([])
    const navigate = useNavigate();
    
    // 상세화면 페이지 이동
    const goDetail = (lpdName) => {
        //navigate(`/admin/product/loan/detail/${id}`);
        window.localStorage.setItem("lpdName", lpdName);
        navigate("/admin/product/loan/detail");
    }

    // class 컴포넌트에서의 라이프사이클 역할과 같음
    useEffect(() => {
        LoanApiService.fetchProduct()
          .then(res => {
            setListPdLoan(res.data);
          })
          .catch(err => {
            console.log('fetchProdcutList Error!', err);
          });
    }, []);

     return(
        <div className="component-div">
        <div className="admin-title" style={{width:1000}}>
            대출상품목록
        </div>
            <div style={{width:1000}}>
                <div className="card-body" style={{marginTop: "15px"}}>
                    <Table responsive striped style={{textAlign:"center"}}>
                    <thead>
                        <tr>
                            <th>
                            <Form>
                            {['checkbox'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                <Form.Check
                                    inline
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                />
                                </div>
                            ))}
                            </Form>
                            </th>
                            <th>대출상품이름</th>
                            <th>대출상품금리</th>
                            <th>대출가입기간</th>
                            <th>대출최대금액</th>
                            <th>중도해지이자율</th>
                            <th>상품등록날짜</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listPdLoan.map(product =>
                        <tr key={product.lpdname}>
                            <td>
                            <Form>
                            {['checkbox'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                <Form.Check
                                    inline
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                />
                                </div>
                            ))}
                            </Form>
                            </td>
                            <td>{product.lpdName}</td>
                            <td>{product.lrate}%</td>
                            <td>{product.lmaxPeriod}년</td>
                            <td>{product.lmaxPrice.toLocaleString()}만원</td>
                            <td>{product.lcxlRate}%</td>
                            <td>{product.lregDate}</td>
                            <td>
                                <button className="customerinfoBtn" onClick={() => goDetail(product.lpdName)}>상세페이지</button>
                            </td>
                        </tr>
                        )}
                    </tbody>
                    </Table>
                    <div className="d-flex justify-content-end">
                    <Button variant="dark"><Link to="add" style={{color:"white"}}>상품등록</Link></Button>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}
export default LoanComponent;