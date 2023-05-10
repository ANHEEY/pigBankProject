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

    // 승인 버튼 비활성화 설정
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
          setIsButtonDisabled(true);
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
          setIsButtonDisabled(true);
    }
    return(
        <div className="component-div2">
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
                            <td>{new Date(product.lreqDate).toLocaleDateString().slice(0,-1)}</td>                            
                            <td>{product.lstate}</td>
                            <td>
                            {product.lstate === '승인전' ? (
                                <div style={{display: "flex", flexDirection: "row"}}>
                                <LoanAcceptButton lreqNum={product.lreqNum} onUpdate={handleLoanState} isDisabled={isButtonDisabled}/>
                                <LoanRefuseButton lreqNum={product.lreqNum} onUpdate={handleLoanState2} isDisabled={isButtonDisabled}/>
                                </div>
                            ) : (
                                <div style={{display: "flex", flexDirection: "row"}}>
                                <LoanAcceptButton lreqNum={product.lreqNum} onUpdate={handleLoanState} isDisabled={true}/>
                                <LoanRefuseButton lreqNum={product.lreqNum} onUpdate={handleLoanState2} isDisabled={true}/>
                                </div>
                            )}
                            </td>
                        </tr>
                        )}
                    </tbody>
                    </Table>
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