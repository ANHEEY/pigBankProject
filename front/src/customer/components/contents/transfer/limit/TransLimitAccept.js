import React from "react";
import { Container, Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useParams  } from "react-router-dom";

function TransLimitAccept () {
    const {trsfLimit , myvalue} = useParams();
    
    // navigate 함수로 받아온 get 값을 받아서 확인하는 페이지
    const comma = Number(trsfLimit).toLocaleString('ko-kR');
    const commanext = Number(myvalue).toLocaleString('ko-kR');
    return(
        <Container>
        <h2 align="center">이체한도 변경 완료</h2>
        <hr />
        <br />
        <br />
        <Table>
            <tbody>
                <tr>
                    <td>
                        <label>
                            <h4>변경 전</h4>
                        </label>
                        <h4>
                            {comma}원
                        </h4>
                    </td>
                    <td>
                        <label>
                            <h4>변경 후</h4>
                        </label>
                        <h4>
                            {commanext}원
                        </h4>
                    </td>
                </tr>
            </tbody>
        </Table>
        <div align='center'>
        <a href="/customer/*" ><Button variant="secondary" size="lg" >홈으로</Button></a>
        </div>
        </Container>
    )
}

export default TransLimitAccept