import React, {useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useLocation, useParams  } from "react-router-dom";

function TransAccept () {


    const {selectedAccount , selectedMyAccount, yourMemo, myMemo, tAmount} = useParams();

        return(
            <div align='center'>
                <div class="w-50 p-3" align='center'>
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
                                <td align='right'>{tAmount}</td>
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
                    <a href="/customer/*"><Button variant="secondary" size="lg">홈으로</Button></a>
                </div>
            </div>
        )
    }
export default TransAccept;