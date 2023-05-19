//고객 예금 해지 예상 금액 페이지, 해지 가능
import React, {useEffect,useState} from 'react';
import { Form, Button,Container,Stack } from 'react-bootstrap';
import '../../../../resources/css/account/closeDetail.css';
import DepositService from './DepositService';
import { useNavigate } from 'react-router-dom';

export default function DepositClose() {
    const navigate = useNavigate();
    const today = new Date();
    const koToday = today.toLocaleDateString();

    const [cusDepositExpInfo,setCusDepositExpInfo] = useState([]);
    const [dacPwd,setDacPwd] = useState('');

    useEffect(()=>{

        DepositService.cusDepositCxlExpInfo(window.localStorage.getItem("dNum"))
            .then(res=>{
                setCusDepositExpInfo(res.data);
                console.log(res.data);
                localStorage.removeItem("dNum");
            })
            .catch(err=>{
                console.log("cusDepositCxlExpInfo() error!!!!",err);
            })
    },[]);

    const comma = (number) => {
        //return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (typeof number !== 'undefined') {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            return '';
        }
    }

    // 해지 구분을 결정하는 함수
    const determineCxl = () => {
        if (cusDepositExpInfo && new Date(cusDepositExpInfo.dendDate) <= today) {
            return "만기해지";
        } 
        else {
            return "중도해지";
        }
    };

    const move = ()=>{
        navigate('/customer/account/deposit');
    }

    const depositCxl = ()=>{

        if(Number(dacPwd) !== Number(cusDepositExpInfo.acPwd)){
            console.log('dacPwd : ',dacPwd);
            console.log('cusDepositExpInfo.acPwd : ',cusDepositExpInfo.acPwd);
            alert('예금 계좌 비밀번호가 일치하지 않습니다!! 다시 시도해 주세요');
            return false;
        }
        console.log('dacPwd : ',dacPwd);
        console.log('cusDepositExpInfo.acPwd : ',cusDepositExpInfo.acPwd);

        const cxlInfo = {
            acNumber:cusDepositExpInfo.acNumber,
            dexpAmount:cusDepositExpInfo.dexpAmount,
            ddeAccount:cusDepositExpInfo.ddeAccount,            
        }

        DepositService.cusDepositCxlReg(cxlInfo)
            .then(res=>{
                alert("예금 해지가 완료되었습니다!");
                navigate('/customer/account/deposit');
            })
            .catch(err=>{
                console.log('cusDepositCxlReg() error!',err);
            });
    }

    return (
        <Container>
            <br/><br/><br/><br/>
            <div>
                <div className="title_div">
                    <div className="title_see">
                        예금 해지 예상 조회
                    </div>
                </div>
                <div className='border' style={{textAlign:"center"}}>
                    <p style={{marginLeft:"10px"}}>
                        ￭ 조회시점의 잔액을 기준으로 한 해지예상조회 결과입니다.<br/>
                        ￭ 계좌잔액에는 미결제된 자기앞수표, 당좌수표, 약속어음 등 타점권이 포함되어 있을 수 있습니다.<br/>
                        ￭ 적용이율 또는 세율변동 시 실제 지급액이 다를 수 있습니다.<br/>
                        ￭ 해지를 원하시면 조회결과 하단의 [해지]버튼을 선택하시기 바랍니다.<br/>
                    </p>
                </div> 
                <br/><br/><br/>
                <div>
                    <table className="CDTable"  style={{width:'1300px'}}>
                        <thead className='CDTable-title'>
                            <tr>
                                <th colSpan={4}>
                                    <h2>예금 계좌 정보</h2>
                                </th>
                            </tr>
                        </thead>
                        <tbody className='CDTable-info'>
                            <tr style={{textAlign:"center"}}>
                                <th style={{width:'220px'}}>예금 상품명</th>
                                <td colSpan={3}>{cusDepositExpInfo.dpdName}</td>
                            </tr>
                            <tr style={{textAlign:"center",borderTop:'1px solid gray'}}>
                                <th style={{width:'220px'}}>예금 계좌번호</th>
                                <td>{cusDepositExpInfo.acNumber}</td>
                                <th style={{width:'220px'}}>예금 비밀번호</th>
                                <td>
                                    <Form.Control type="password" value={dacPwd} name="dacPwd" placeholder="비밀번호 4자리 입력" onChange={(e)=>setDacPwd(e.target.value)} />
                                </td>
                            </tr>
                            <tr style={{textAlign:"center",borderTop:'1px solid gray'}}>
                                <th>가입일</th>
                                <td>{new Date(cusDepositExpInfo.djoinDate).toLocaleDateString().slice(0,-1)}</td>
                                <th>만기일</th>
                                <td>{new Date(cusDepositExpInfo.dendDate).toLocaleDateString().slice(0,-1)}</td>
                            </tr>
                            <tr style={{textAlign:"center",borderTop:'1px solid gray'}}>
                                <th style={{width:'220px'}}>해지구분</th>
                                <td colSpan={3}>
                                    {determineCxl()}
                                </td>
                            </tr>
                            
                            <tr style={{textAlign:"center",borderTop:'1px solid gray'}}>
                                <th>해지예상일</th>
                                <td colSpan={3}>{koToday}</td>
                            </tr>
                            <tr style={{textAlign:"center",borderTop:'1px solid gray'}}>
                                <th>해지시 입금계좌</th>
                                <td colSpan={3}>{cusDepositExpInfo.ddeAccount}</td>
                            </tr>
                            <tr style={{textAlign:"center",borderTop:'1px solid gray'}}>
                                <th style={{width:'220px'}}>원금</th>
                                <td>{comma(cusDepositExpInfo.damount)}원</td>
                                <th style={{width:'220px'}}>이자</th>
                                <td>{comma(cusDepositExpInfo.dexpAmount-cusDepositExpInfo.damount)}원</td>
                            </tr>
                            <tr style={{textAlign:"center",borderTop:'1px solid gray',borderBottom:'1px solid gray'}}>
                                <th style={{width:'220px'}}>지급 예상액</th>
                                <td colSpan={3}>{comma(cusDepositExpInfo.dexpAmount)}원</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br/><br/><br/><br/>
                <Stack direction="horizontal" gap={2} className="col-md-3 mx-auto">
                    <button className='btnbtn big' onClick={depositCxl}>해지</button>
                    <button className='btnbtn bigAgo' onClick={move}>계좌목록</button>
                </Stack>  
                <br/><br/><br/><br/>      
            </div>
        </Container>
    );
}
