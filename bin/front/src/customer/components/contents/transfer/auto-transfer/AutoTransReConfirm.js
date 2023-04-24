import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function AutoTransReConfirm () {
    return(
    <Container>
        <h3>자동 이체 확인</h3>
        <hr />
        <Table>
                <tbody>
                    <tr>
                        <th>이체 주기</th>
                        <td align='right'></td>
                    </tr>
                    <tr>
                        <th>예금주</th>
                        <td align='right'></td>
                    </tr>
                    <tr>
                        <th>출금계좌</th>
                        <td align='right'></td>
                    </tr>
                    <tr>
                        <th>이체 시작/종료일</th>
                        <td align='right'></td>
                    </tr>
                    <br/>
                    <hr/>
                    <tr>
                        <th>받는 분</th>
                        <td align='right'></td>
                    </tr>
                    <tr>
                        <th>받는계좌</th>
                        <td align='right'></td>
                    </tr>
                    <br />
                    <hr />
                    <tr>
                        <th>이체금액</th>
                        <td align='right'></td>
                    </tr>
                    <tr>
                        <th>수수료</th>
                        <td align='right'></td>
                    </tr>
                </tbody>
        </Table>
                <div align='right'>
                    <a href="/customer/transfer/add_auto_trans"><Button variant="secondary" size="lg">
                    이전
                    </Button></a>
                    {' '} 
                    <a href='/customer/transfer/auto_trans_accept'><Button variant="primary" size="lg">
                    이체    
                    </Button></a>
                </div>
    </Container>
    )
}

export default AutoTransReConfirm