import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams  } from "react-router-dom";

function TransAccept () {

    const navigate = useNavigate();

    const home  = () => {
        navigate(`/customer/*`);
    }
    // AutoTransAccept 와 거의 일치
    const {selectedAccount , selectedMyAccount, yourMemo, myMemo, tAmount} = useParams();
        return(
            <div align='center'>
                <div className="w-50 p-3" align='center'>
                    <h3 >이체완료</h3>
                    <Table>
                        <tbody>
                            <tr>
                                <th>받는분</th>
                                <td align='right'>{yourMemo}</td>
                            </tr>
                            <tr>
                                <th>받는계좌</th>
                                <td align='right'>{selectedAccount}</td>
                            </tr>
                            </tbody>
                            </Table>
                            <br/>
                            <hr/>
                            <Table>
                        <tbody>
                            <tr>
                                <th>보낸금액</th>
                                <td align='right'>{Number(tAmount).toLocaleString('ko-kR')}원</td>
                            </tr>
                            <tr>
                                <th>보낸계좌</th>
                                <td align='right'>{selectedMyAccount}</td>
                            </tr>
                            <tr>
                                <th>나의 메모</th>
                                <td align="right">{myMemo}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button variant="secondary" size="lg" onClick={home}>홈으로</Button>
                </div>
            </div>
        )
    }
export default TransAccept;