import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams  } from "react-router-dom";
import PDFDownloadComponent from "../pdfFile";

function TransAccept() {
  const navigate = useNavigate();

  const home = () => {
    navigate(`/customer/*`);
  };

  const acNum = (acNumber) => {
    const acNum = acNumber.toString().slice(0, 3) + "-" + acNumber.toString().slice(3);
    return acNum;
  };


    // AutoTransAccept 와 거의 일치
    const {selectedAccount , selectedMyAccount, yourMemo, myMemo, tAmount} = useParams();
        return(
            <div align='center'>
                <div className="w-50 p-3" align='center'>
                <div className="title_div">
                    <div className="title_see">
                        이체 완료
                    </div>
                </div>
                <div className="trnsChk">
                    <table style={{width: '900px'}}>
                        <tbody>
                            <tr>
                                <th>받는분</th>
                                <td align='right'>{yourMemo}</td>
                            </tr>
                            <tr>
                                <th>받는계좌</th>
                                <td align='right'>{acNum(selectedAccount)}</td>
                            </tr>
                            <tr>
                                <th>보낸금액</th>
                                <td align='right'>{Number(tAmount).toLocaleString('ko-kR')}원</td>
                            </tr>
                            <tr>
                                <th>보낸계좌</th>
                                <td align='right'>{acNum(selectedMyAccount)}</td>
                            </tr>
                            <tr>
                                <th>나의 메모</th>
                                <td align="right">{myMemo}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mb-2" align='center'>
                    <button className="btnbtn big trns" onClick={home}>홈으로</button>
                </div>
            </div>
        </div>
        )
    }
export default TransAccept;
