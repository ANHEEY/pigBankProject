import React, {Component} from 'react';
import {FormControl, Table} from '@mui/joy';
import '../../../../resources/css/account/closeDetail.css';

class SavingCloseDetail extends Component {

    render() {
        return (
            <div className='container' >
                <div className='saving-title fw-bold'>
                    해지계좌 조회
                </div>
                <div className='border'>
                    <p>
                        * 조회시점의 잔액을 기준으로 한 해지예상조회 결과입니다.<br/>
                        * 계좌잔액에는 미결제된 자기앞수표, 당좌수표, 약속어음 등 타점권이 포함되어 있을 수 있습니다.<br/>
                        * 적용이율 또는 세율변동 시 실제 지급액이 다를 수 있습니다.<br/>
                        * 해지를 원하시면 조회결과 하단의 [해지]버튼을 선택하시기 바랍니다.<br/>
                    </p>
                </div> 
                <br/>
                <div>
                    <table className="CDTable">
                        <thead className='CDTable-title'>
                            <tr>
                                <th colSpan={4}>해지계좌 정보</th>
                            </tr>
                        </thead>
                        <tbody className='CDTable-info'>
                            <tr>
                                <th style={{width:'230px'}}>해지계좌종류</th>
                                <td>적금명</td>
                                <th style={{width:'230px'}}>해지구분</th>
                                <td>일반해지</td>
                            </tr>
                            <tr>
                                <th>해지계좌번호</th>
                                <td>계좌번호</td>
                                <th>해지계좌원금</th>
                                <td>1000원</td>
                            </tr>
                            <tr>
                                <th>해지예상일</th>
                                <td>2023.04.27</td>
                                <th>만기일</th>
                                <td>2023.04.28</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br/>
                <div className=''>
                    <table className="CDTable">
                        <thead className='CDTable-title'>
                            <tr>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='CDTable-info'>
                            <tr>
                                <th style={{width:'230px'}}>해지이자</th>
                                <td>1,000원</td>
                                <th style={{width:'230px'}}>기지급이자</th>
                                <td>1,000원</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default SavingCloseDetail;