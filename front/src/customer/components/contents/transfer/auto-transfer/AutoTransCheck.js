import React, { useEffect , useState } from "react";
import moment from 'moment';
import { Button, Container, Table } from "react-bootstrap";
import TransferService from "../transfer-service/TransferService";
import { useNavigate } from "react-router-dom";
import { getId } from '../../../helpers/axios_helper'

// npm install moment 날짜 차이 계산
function AutoTransCheck (props) {
    
    const [datas,setDatas] = useState([]);
    const [anum, setAnum] = useState([]);
    const [isChecked, setChecked] = useState();
    const acNumber = props.data[0];
    const aState = props.data[1];

    const [id, setId] = useState(getId());

    const navigate = useNavigate();

    useEffect(() => {
        console.log(props.data);
        reloadReConfirmList(props.data);
        console.log(anum);
      }, [props.data],[anum],[id]);

      const reloadReConfirmList = (data) => {

        console.log(data);
        let datas = {
            acNumber: acNumber,
            aState: aState  
        }
        TransferService.checkList(datas)
         .then(res => {
            console.log("hi new data : " , res.data);
            setDatas(res.data);
         }) 
      }
      
      const autoTransDetail = (event) => {
        let anum = event.target.value;
        console.log(anum);
        navigate(`/customer/transfer/auto_trans_detail/${anum}`)
      }

      const handleCheck = (event) => {
        const checked = event.target.checked;
        const value = event.target.value;

        setAnum((prevAnum) => {
            if (checked) {
            return [...prevAnum, value];
            } else {
            return prevAnum.filter((v) => v !== value);
            }
        });
    }

    const cancel = () => {

        console.log(anum);
        const Anum = anum.join(',');

        TransferService.cancelAuto(Anum)
            .then(res => {
                alert("해지 완료! 초기화면으로 이동합니다.");
                navigate(`/customer/*`);
            }).catch(()=> {
                alert('선택이 안되어 있습니다 선택해주세요.')
            })
    }
    const openCalendar = () => {
        const popup = document.getElementById("popup");
        popup.classList.add("show");
    }

    const closeCalendar = () => {
        const popup = document.getElementById("popup");
        popup.classList.remove("show");
    }

    return (
        <Container>
            <a href="/customer/transfer/auto_trans"><Button variant="secondary" size="lg" >
                초기화
                </Button></a>{' '}
                <div align="right">
                <Button variant="success" onclick={openCalendar} size="lg">캘린더</Button>
                </div>
            <hr />
            <div align='left'>
                <h4>조회결과 | </h4>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>선택</th>
                        <th>출금계좌</th>
                        <th>입금계좌</th>
                        <th>받는분</th>
                        <th>이체금액</th>
                        <th>이체기간</th>
                        <th>해지일자</th>
                        <th>이체일자</th>
                        <th>이체주기</th>
                        <th>자동이체 상태</th>
                        <th>내통장 메모</th>
                        <th>업무</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((auto) => (
                    <tr key={auto.anum}>
                        <td>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheck}
                            value={auto.anum}
                            />
                        </td>
                        <td>
                            {auto.acNumber}
                        </td>
                        <td>
                            {auto.adepositnum}
                        </td>
                        <td>
                            {auto.yourMemo}
                        </td>
                        <td>
                            {auto.adepositAmount}
                        </td>
                        <td>
                            {moment(auto.aendDate).diff(auto.astartDate, 'months')}개월
                        </td>
                        <td>
                        {auto.acancelDate && 
                        !isNaN(new Date(auto.acancelDate)) ? new Date(auto.acancelDate).toISOString().slice(0, 10) : '*'}
                        </td>
                        <td>
                            {new Date(auto.aregDate).toISOString().slice(0, 10)}
                        </td>
                        <td>
                            {auto.atransferCycle}개월
                        </td>
                        <td>
                            {auto.astate}
                        </td>
                        <td>
                            {auto.myMemo}
                        </td>
                        <td>
                            <Button variant="success" size="sm" 
                            onClick={autoTransDetail}
                            value={auto.anum} 
                            >
                                자동이체수정   
                            </Button>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>

                <div id="popup" class="popup">
                    <div class="popup-content">
                        <h2></h2>
                            <p></p>
                        
                    </div>
                </div>
                
            </Table>
            <div align='center'>
                <Button variant="primary" size="lg" onClick={cancel}>
                    자동이체 해지   
                </Button>
            </div>
        </Container>
    )
}

export default AutoTransCheck