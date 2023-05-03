// 대출상품
import  React, {useState, useEffect} from "react";
import { Table } from 'react-bootstrap';
import  LoanApiService from "./LoanApiService";
import '../../../../resources/css/customer/detail_customer.css'
import LoanRefuseButton from "./LoanRefuseButton";
import LoanAcceptButton from "./LoanAcceptButton";


const LoanRequestList = () => {

    // 대출 신청 리스트
    const [listLoanRequest, setListLoanRequest]= useState([]);

    // class 컴포넌트에서의 라이프사이클 역할과 같음
    useEffect(() => {
        LoanApiService.fetchLoanRequest()
            .then(res => {
                setListLoanRequest(res.data);
                console.log(res.data)
            })
            .catch(err => {
                console.log('fetchPdReqList Error', err);
            });
    }, [])

    // 승인완료 업데이트
    const handleLoanState = (lreqNum) => {
        const newListLoanRequest = listLoanRequest.map(product => {
            if (product.lreqNum === lreqNum) {
              return { ...product, lstate: "승인완료" };
            }
            return product;
          });
        
          setListLoanRequest(newListLoanRequest);
    }

    // 승인거절 업데이트
    const handleLoanState2 = (lreqNum) => {
        const newListLoanRequest = listLoanRequest.map(product => {
            if (product.lreqNum === lreqNum) {
              return { ...product, lstate: "승인거절" };
            }
            return product;
          });
        
          setListLoanRequest(newListLoanRequest);
    }
    return(
        <div className="component-div">
        <div className="admin-title" style={{width:1300}}>
            대출신청목록조회
        </div>
            <div style={{width:1300}}>
                <div className="card-body" style={{marginTop: "15px"}}>
                    <Table responsive striped style={{textAlign:"center"}}>
                    <thead>
                        <tr>
                            <th>대출신청번호</th>
                            <th>신청인(아이디)</th>
                            <th>대출상품명</th>
                            <th>대출상품금리</th>
                            <th>대출가입기간</th>
                            <th>대출금액</th>
                            <th>신청날짜</th>
                            <th>심사결과</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listLoanRequest.map(product =>
                        <tr key={product.lreqNum}>
                            <td>{product.lreqNum}</td>
                            <td>{product.name}[{product.id}]</td>
                            <td>{product.lpdName}</td>
                            <td>{product.lrate}%</td>
                            <td>{product.lperiod}년</td>
                            <td>{product.lprincipal.toLocaleString()}만원</td>
                            <td>{product.lreqDate}</td>
                            <td>{product.lstate} </td>
                            <td >
                                <div style={{display: "flex", flexDirection: "row"}}>
                                    <LoanAcceptButton lreqNum={product.lreqNum} onUpdate={handleLoanState}/>
                                    <LoanRefuseButton lreqNum={product.lreqNum} onUpdate={handleLoanState2}/>
                                </div>
                            </td>
                        </tr>
                        )}
                    </tbody>
                    </Table>
                    {/* <div className="d-flex justify-content-end">
                    <Button variant="dark"><Link to="add" style={{color:"white"}}>상품등록</Link></Button>
                    </div> */}
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
export default LoanRequestList;