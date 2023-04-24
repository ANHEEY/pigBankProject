import { Component } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class TransAccept extends Component {
    render(){
        return(
            <div align='center'>
                <div class="w-50 p-3" align='center'>
                    <h3 >이체완료</h3>
                    <Table>
                        <tbody>
                            <tr>
                                <th>받는분</th>
                                <td align='right'>이정재</td>
                            </tr>
                            <tr>
                                <th>받는계좌</th>
                                <td align='right'>938002-00-266491</td>
                            </tr>
                            <br/>
                            <hr/>
                            <tr>
                                <th>보낸금액</th>
                                <td align='right'>2,300,000원</td>
                            </tr>
                            <tr>
                                <th>수수료</th>
                                <td align='right'></td>
                            </tr>
                        </tbody>
                    </Table>
                    <a href="/customer/*"><Button variant="secondary" size="lg">홈으로</Button></a>
                </div>
            </div>
        )
    }
}
export default TransAccept;