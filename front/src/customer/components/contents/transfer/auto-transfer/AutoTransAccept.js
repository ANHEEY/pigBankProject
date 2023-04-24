import { Component } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class AutoTransAccept extends Component {
    render(){
        return(
            <div align='center'>
                <div class="w-50 p-3" align='center'>
                    <h3 >자동이체 등록완료</h3>
                    <Table>
                        <tbody>
                            <tr>
                                <th>받는분</th>
                                <td align='right'>이정재</td>
                            </tr>
                            <tr>
                                <th>받는계좌</th>
                                <td align='right'></td>
                            </tr>
                            <br/>
                            <hr/>
                            <tr>
                                <th>자동이체주기</th>
                                <td align='right'></td>
                            </tr>
                            <tr>
                                <th>자동이체기간</th>
                                <td align='right'></td>
                            </tr>
                            <br/>
                            <hr/>
                            <tr>
                                <th>보낸금액</th>
                                <td align='right'></td>
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
export default AutoTransAccept;