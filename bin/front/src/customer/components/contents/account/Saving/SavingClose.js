import React, { useEffect, useState} from 'react';
import { Form, Button, Stack, Container } from 'react-bootstrap';
import '../../../../resources/css/account/closeDetail.css';
import { useNavigate } from 'react-router-dom';
import SavingService from './SavingService';

function SavingClose () {

    const navigate = useNavigate();
    const today = new Date();
    const sToday = today.toLocaleDateString(); // 해지예상일

    const [saAcInfo, setSaAcInfo] = useState([]);
    const [sacPwd, setSacPwd] = useState(''); 
    const saAccList = () => {
        navigate('/customer/account/saving');
    }

    // 적금계좌 1건에 대한 데이터 불러오기
    useEffect(() => {
        SavingService.savingCloseDetail(window.localStorage.getItem("acNumber"))
            .then((res) => {
                setSaAcInfo(res.data)
                console.log(res.data)               
            })
            .catch((err) => {
                console.log('SavingService.savingCloseDetail Error!', err);
            })
    }, []);

    const comma = (number) => {
        if (typeof number !== 'undefined') {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            return '';
        }
    }

    // 계좌 해지구분(만기/중도)
    const accCxl = () => {
        const sendDate = new Date(saAcInfo.sendDate);
        const today = new Date(sToday);
      
        if (saAcInfo && sendDate.getTime() <= today.getTime()) {
          return "적금 만기해지";
        } else {
          return "적금 중도해지";
        }
      }
    
    const savingEnd = () => {
        const sendDate = new Date(saAcInfo.sendDate);
        const today = new Date(sToday);
        if(saAcInfo && sendDate.getTime() <= today.getTime()) {
            // 만기
            return saAcInfo.sexpAmount;
        } 
        else {
            // 중도
            return saAcInfo.acBalance + ((saAcInfo.scxlrate*0.01)*saAcInfo.samount*(Math.floor(saAcInfo.acBalance / parseInt(saAcInfo.samount, 10))));
        }   // Math.floor((amount*(rate*0.01)*(period/12*12+1)*(period/12*12)/2)/12);
    }

    // 해지신청
    const savingCxl = () => {
        if(Number(sacPwd) !== Number(saAcInfo.acPwd)) {
            console.log('sacPwd: ', sacPwd);
            console.log('saAcInfo.acPwd: ', saAcInfo.acPwd);
            alert('적금계좌 비밀번호가 일치하지 않습니다. 확인 후 다시 시도하세요!');
            return false;
        }
        console.log('sacPwd: ', sacPwd);
        console.log('saAcInfo.acPwd: ', saAcInfo.acPwd);

        const cxlInfo = {
            acNumber: saAcInfo.acNumber,     // 계좌번호
            sexpAmount: savingEnd(),         // 예상금리 금액(만기시, 해지시 금액)
            sdeAccount: saAcInfo.sdeAccount, // 만기시 입금계좌
            aNum: saAcInfo.anum              // 자동이체 번호(자동이체번호로 해지)
        }

        SavingService.closeSaving(cxlInfo)
            .then(res => {
                alert("가입하신 적금이 해지되었습니다.");
                navigate('/customer/account/saving');
            })
            .catch(err => {
                console.log('closeSaving() Error!', err);
            })
        
    }

    return (
        <Container>
            <div className='saving-title fw-bold' style={{textAlign:"center"}}>
            <div className="title_div">
                    <div className="title_see">
                        해지계좌 조회
                    </div>
                </div>     
            </div>
            <div className='border' style={{width:"90%", letterSpacing:"2px", margin:"auto", paddingTop:"10px"}}>
                <p style={{marginLeft:"10px"}}>
                    ￭ 조회시점의 잔액을 기준으로 한 해지예상조회 결과입니다.<br/>
                    ￭ 계좌잔액에는 미결제된 자기앞수표, 당좌수표, 약속어음 등 타점권이 포함되어 있을 수 있습니다.<br/>
                    ￭ 적용이율 또는 세율변동 시 실제 지급액이 다를 수 있습니다.<br/>
                    ￭ 해지를 원하시면 조회결과 하단의 [해지]버튼을 선택하시기 바랍니다.<br/>
                </p>
            </div> 
            <br/><br/><br/>
           
            <div style={{margin:"auto", width:"90%"}}>
                <table className="CDTable" style={{width:"1170px"}}>
                    <thead className='CDTable-title'>
                        <tr>
                            <th colSpan={4}>적금 계좌정보</th>
                        </tr>
                    </thead>
                    <tbody className='CDTable-info'>
                        <tr>
                            <th style={{width:"250px"}}>상품명</th>
                            <td colSpan={3}>{saAcInfo.spdname}</td>
                        </tr>
                        <tr>
                            <th>계좌번호</th>
                            <td style={{width:"300px"}}>{saAcInfo.acNumber}</td>
                            <th style={{width:"250px"}}>비밀번호</th>
                            <td> <Form.Control type="password" name="sacPwd" value={sacPwd} placeholder="비밀번호 4자리 입력" onChange={(e) => setSacPwd(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <th>이체일</th>
                            <td>{new Date(saAcInfo.sstartDate).getDate()}일</td>
                            <th>납입금액/납입횟수</th>
                            <td>{comma(saAcInfo.samount)}원/{Math.floor(saAcInfo.acBalance / parseInt(saAcInfo.samount, 10))}회</td>
                        </tr>
                        <tr>
                            <th>가입일</th>
                            <td>{new Date(saAcInfo.sjoinDate).toLocaleDateString().slice(0,-1)}</td>
                            <th>만기일</th>
                            <td>{new Date(saAcInfo.sendDate).toLocaleDateString().slice(0,-1)}</td>
                        </tr>
                        <tr>
                            <th>해지시 입금계좌</th>
                            <td colSpan={3}>{saAcInfo.sdeAccount}</td>
                        </tr>
                    </tbody>
                </table>
                <br/> <br/>
                <table className="CDTable" style={{width:"1170px"}}>
                    <thead className='CDTable-title'>
                        <tr>
                            <th colSpan={4}>계좌해지</th>
                        </tr>
                    </thead>
                    <tbody className='CDTable-info'>
                       <tr>
                            <th>해지구분</th>
                            <td colSpan={3}>
                            {accCxl()}
                            </td>
                        </tr>
                        <tr>
                            <th>해지시 지급금액</th>
                            <td colSpan={3}>{comma(saAcInfo.acBalance + saAcInfo.scxlrate)}원</td>
                        </tr>
                        <tr>
                            <th style={{width:"250px"}}>원금</th>
                            <td style={{width:"300px"}}>{comma(saAcInfo.acBalance)}</td>
                            <th style={{width:"250px"}}>이자</th>
                            <td>{saAcInfo.scxlrate}원</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br/><br/><br/>
            <Stack direction="horizontal" gap={2} className="col-md-3 mx-auto" style={{marginLeft:"100px"}}>
                <button className='btnbtn big' onClick={savingCxl}>해지</button>
                <button className='btnbtn big' onClick={saAccList}>목록</button>
            </Stack>
            <br/><br/><br/>
        </Container>
    )
}
export default SavingClose;