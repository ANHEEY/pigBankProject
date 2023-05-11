import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams  } from "react-router-dom";

function AutoTransAccept () {
    // navigate get 방식으로 넘긴값들 useParams로 받아서 변수에 셋팅
    const {selectedAccount , selectedMyAccount, yourMemo, myMemo, tAmount, transferCycle,startDate,endDate} = useParams();

    const sDate = new Date(startDate)
    const eDate = new Date(endDate)
    const sMonth = (sDate.getMonth() +1);
    const eMonth = (eDate.getMonth() +1);
    const date = (eMonth - sMonth);
    // 확인 페이지 값 뿌려주기

    const navigate = useNavigate();

     // 계좌번호 3번째에다가 - 추가해주는 함수
     const acNum = (acNumber) => {
        const acNum = acNumber.toString().slice(0, 3) + "-" + acNumber.toString().slice(3);
        return acNum;
    };

    const home  = () => {
        navigate('customer/*');
    }
        return(
            <div align='center'>
                <div className="w-50 p-3" align='center'>
                    <h3 >자동이체 등록완료</h3>
                    <Table style={{width: '900px'}}>
                        <tbody>
                            <tr>
                                <th>받는분</th>
                                <td style={{textAlign:'center'}}>{yourMemo}</td>
                            </tr>
                            <tr>
                                <th>받는계좌</th>
                                <td style={{textAlign:'center'}}>{acNum(selectedMyAccount)}</td>
                            </tr>
                            </tbody>
                            </Table>
                            <br/>
                            <br/>
                            <Table style={{width: '900px'}}>
                                <tbody>
                            <tr>
                                <th>자동이체주기</th>
                                <td style={{textAlign:'center'}}>{transferCycle}</td>
                            </tr>
                            <tr>
                                <th>자동이체기간</th>
                                <td style={{textAlign:'center'}}>{date}개월</td>
                            </tr>
                            </tbody>
                            </Table>

                            <br/>
                            <br/>
                            <Table style={{width: '900px'}}>
                            <tbody>
                            <tr>
                                <th>출금계좌</th>
                                <td style={{textAlign:'center'}}>{acNum(selectedAccount)}</td>
                            </tr>
                            <tr>
                                <th>보낸금액</th>
                                <td style={{textAlign:'center'}}>{Number(tAmount).toLocaleString('ko-kR')}원</td>
                            </tr>
                            <tr>
                                <th>내 메모</th>
                                <td style={{textAlign:'center'}}>{myMemo}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button variant="secondary" size="lg" onClick={home}>홈으로</Button>
                </div>
            </div>
        )
    }
export default AutoTransAccept;