import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useParams  } from "react-router-dom";

function AutoTransAccept () {
    const {selectedAccount , selectedMyAccount, yourMemo, myMemo, tAmount, transferCycle,startDate,endDate} = useParams();

    const sDate = new Date(startDate)
    const eDate = new Date(endDate)
    const sMonth = (sDate.getMonth() +1);
    const eMonth = (eDate.getMonth() +1);
    const date = (eMonth - sMonth);
        return(
            <div align='center'>
                <div className="w-50 p-3" align='center'>
                    <h3 >자동이체 등록완료</h3>
                    <Table>
                        <tbody>
                            <tr>
                                <th>받는분</th>
                                <td align='right'>{yourMemo}</td>
                            </tr>
                            <tr>
                                <th>받는계좌</th>
                                <td align='right'>{selectedMyAccount}</td>
                            </tr>
                            </tbody>
                            </Table>
                            <br/>
                            <hr/>
                            <Table>
                                <tbody>
                            <tr>
                                <th>자동이체주기</th>
                                <td align='right'>{transferCycle}</td>
                            </tr>
                            <tr>
                                <th>자동이체기간</th>
                                <td align='right'>{date}개월</td>
                            </tr>
                            </tbody>
                            </Table>

                            <br/>
                            <hr/>
                            <Table>
                            <tbody>
                            <tr>
                                <th>출금계좌</th>
                                <td align="right">{selectedAccount}</td>
                            </tr>
                            <tr>
                                <th>보낸금액</th>
                                <td align='right'>{tAmount}</td>
                            </tr>
                            <tr>
                                <th>내 메모</th>
                                <td align='right'>{myMemo}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <a href="/customer/*"><Button variant="secondary" size="lg">홈으로</Button></a>
                </div>
            </div>
        )
    }
export default AutoTransAccept;