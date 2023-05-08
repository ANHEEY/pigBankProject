import React, {useEffect} from 'react';
import { Form, Button,Container } from 'react-bootstrap';
import '../../../../resources/css/account/closeDetail.css';

export default function DepositClose() {

    useEffect(()=>{

    },[]);

    return (
        <Container>
            <br/><br/><br/><br/>
            <div>
                <div>
                    <h1 style={{textAlign:"center"}}>예금 해지 예상 조회</h1>
                </div>
                <br/><br/>
                <div className='border' style={{textAlign:"center"}}>
                    <p>
                        * 조회시점의 잔액을 기준으로 한 해지예상조회 결과입니다.<br/>
                        * 계좌잔액에는 미결제된 자기앞수표, 당좌수표, 약속어음 등 타점권이 포함되어 있을 수 있습니다.<br/>
                        * 적용이율 또는 세율변동 시 실제 지급액이 다를 수 있습니다.<br/>
                        * 해지를 원하시면 조회결과 하단의 [해지]버튼을 선택하시기 바랍니다.<br/>
                    </p>
                </div> 
                <br/><br/><br/>
                <div>
                    <table className="CDTable"  style={{width:'1300px'}}>
                        <thead className='CDTable-title'>
                            <tr>
                                <th colSpan={4}>Account Info</th>
                            </tr>
                        </thead>
                        <tbody className='CDTable-info'>
                            <tr>
                                <th style={{width:'220px'}}>상품명</th>
                                <td colSpan={3}>하나의 여행적금(해당상품명)</td>
                            </tr>
                            <tr>
                                <th style={{width:'220px'}}>상품 계좌번호</th>
                                <td >3100000000</td>
                                <th style={{width:'220px'}}>상품 비밀번호</th>
                                <td>
                                    <Form.Control type="password" name="acPwd" placeholder="비밀번호 4자리 입력" />
                                </td>
                            </tr>
                            <tr>
                                <th>신규일</th>
                                <td >2023.04.27</td>
                                <th>만기일</th>
                                <td>2023.04.28</td>
                            </tr>
                            <tr>
                                <th style={{width:'220px'}}>해지구분</th>
                                <td colSpan={3}>
                                <Form.Select aria-label="closeDetail">
                                    <option>선택하세요.</option>
                                    <option value="일반해지">일반해지</option>
                                    <option value="중도해지">중도해지</option>
                                    <option value="만기해지">만기해지</option>
                                </Form.Select>
                                </td>
                            </tr>
                            
                            <tr>
                                <th>해지예상일</th>
                                <td colSpan={3}>2023.04.27</td>
                            </tr>
                            <tr>
                                <th>해지시 입금계좌</th>
                                <td colSpan={3}>계좌번호!</td>
                            </tr>
                            <tr>
                                <th style={{width:'220px'}}>해지이자</th>
                                <td >1,000원</td>
                                <th style={{width:'220px'}}>기지급이자</th>
                                <td >1,000원</td>
                            </tr>
                            <tr>
                                <th style={{width:'220px'}}>원금</th>
                                <td >0원</td>
                                <th style={{width:'220px'}}>이자</th>
                                <td >0원</td>
                            </tr>
                            <tr>
                                <th style={{width:'220px'}}>원리금합계</th>
                                <td colSpan={3}>0원</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br/><br/><br/><br/>
                <div>
                    <table className="CDTable"  style={{width:'1300px'}}>
                        <thead className='CDTable-title'>
                            <tr>
                                <tr>
                                    <th colSpan={4}>Customer Info</th>
                                </tr>
                            </tr>
                        </thead>
                        <tbody className='CDTable-info'>
                            <tr>
                                <th style={{width:'220px'}}>고객명</th>
                                <td colSpan={3}>이름/id</td>
                            </tr>
                            <tr>
                                <th style={{width:'220px'}}>원금</th>
                                <td colSpan={3}>0원</td>
                            </tr>
                            <tr>
                            <th style={{width:'220px'}}>이자</th>
                                <td colSpan={3}>0원</td>
                            </tr>
                            <tr>
                                <th style={{width:'220px'}}>원리금합계</th>
                                <td colSpan={3}>0원</td>
                            </tr>
                        </tbody>
                    </table>
                    <br/><br/><br/><br/>
                    <div className="col-md-2 mx-auto">
                        <Button variant="success" size='lg'>해지</Button>
                        <Button variant="outline-secondary" size='lg'>목록</Button>
                    </div>
                </div>
            </div>
        </Container>
    );
}
