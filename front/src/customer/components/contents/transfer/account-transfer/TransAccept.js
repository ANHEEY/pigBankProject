import React from "react";
import Table from 'react-bootstrap/Table';
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
  const {selectedAccount , selectedMyAccount, myname, myMemo, tAmount} = useParams();

  return (
    <div align='center'>
      <div className="w-50 p-3" align='center'>
      <div className="title_div">
        <div className="title_see">
          이체완료
        </div>
        </div>
        <div align="right">
            <h4 >이체결과 PDF</h4>
            <PDFDownloadComponent 
            data={{ selectedAccount, selectedMyAccount, myname, myMemo, tAmount }}
             />
            </div>
        <Table style={{ width: '900px' }}>
          <tbody>
            <tr>
              <th>받는분</th>
              <td align='right'>{myname}</td>
            </tr>
            <tr>
              <th>받는계좌</th>
              <td align='right'>{acNum(selectedAccount)}</td>
            </tr>
          </tbody>
        </Table>
        <br/>
        <br/>
        <Table style={{ width: '900px' }}>
          <tbody>
            <tr>
              <th>보낸금액</th>
              <td align='right'>{Number(tAmount).toLocaleString('ko-kR')}원</td>
            </tr>
            <tr>
              <th>출금계좌</th>
              <td align='right'>{acNum(selectedMyAccount)}</td>
            </tr>
            <tr>
              <th>내 메모</th>
              <td align="right">{myMemo}</td>
            </tr>
          </tbody>
        </Table>
            <div className="mb-2" align='center'>
                    <button className="btnbtn big trns" onClick={home}>홈으로</button>
            </div>
           
        </div>
        </div>
        )
    }
export default TransAccept;
