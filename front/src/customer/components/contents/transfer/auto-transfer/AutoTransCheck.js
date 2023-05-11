import React, { useEffect , useState } from "react";
import moment from 'moment';
import { Button, Container, Table } from "react-bootstrap";
import TransferService from "../transfer-service/TransferService";
import { useNavigate } from "react-router-dom";
import { getId } from '../../../helpers/axios_helper'
import CalendarComponent from "./CalendarComponent";

// 한국어
moment.locale('ko');    

// npm install moment 날짜 차이 계산
function AutoTransCheck (props) {
    
    // 자동이체 조회
    const [datas,setDatas] = useState([]);
    const [anum, setAnum] = useState([]);
    const [isChecked, setChecked] = useState();
    const acNumber = props.data[0]; // props.data 의 배열로 값 받아오기
    const aState = props.data[1];

    const [isOpen, setIsOpen] = useState(false);

    const [id, setId] = useState(getId());

    const navigate = useNavigate();

    const [list, setList] = useState([]);
    const [autolist, setAutoList] = useState([]);

    const [calendar, setCalendar] = useState([]);

    
    useEffect(() => {
        setId(getId()); // 아이디로 조회할꺼니깐 id 값 먼저 받아오기
      }, []);
      
      useEffect(() => { // 그후 의존성 배열로 id값이 고정되면 axios로 자동이체 내역과 자동이체 목록 불러오기
        reloadAutoTransferList();
        reloadTransferList();
      }, [id]);
      
      useEffect(() => { // calendar에 밑에서 set한값들 넣어주기
        setCalendar([...list, ...autolist]);
      }, [list, autolist]);

      useEffect(() => {
      }, [autolist]);
      
      useEffect(() => {
      }, [list]);
      


    const reloadAutoTransferList = () => {
        TransferService.autotransferList(id)
          .then((res) => {
            setAutoList(res.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };
    const reloadTransferList = () => {
        TransferService.transferList(id)
            .then(res => {
                setList(res.data);
            })
    }

    useEffect(() => {
        reloadReConfirmList(props.data); //  해당 함수 호출 및 매개변수로  props.data 부모컴포넌트의 값 넘기기
      }, [props.data],[anum],[id]);

      const reloadReConfirmList = (data) => {

        let datas = {
            acNumber: acNumber,
            aState: aState  
        }
        TransferService.checkList(datas)
         .then(res => {
            setDatas(res.data);
         }) 
      }
      
      const autoTransDetail = (event) => { // 상세페이지 navigate함수로 고유번호 anum 값을 들고 페이지 이동
        let anum = event.target.value;
        console.log(anum);
        navigate(`/customer/transfer/auto_trans_detail/${anum}`)
      }

      const handleCheck = (event) => { // 체크박스 체크햇을때 체크 된 것들만 해지 가능
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

    const cancel = () => { // 체크박스 ing

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

      const handleToggle = () => { // 버튼 클릭시 변소 isOpen에 true 값 전달 캘린더 열기
        setIsOpen(!isOpen);
      };

      const handleCalendarDataChange = (data) => { // handleToggle 버튼 캘린더 클릭시 calendar 변수에 data 값이 들어감 (버튼 클릭시마다 렌더링된다는 뜻)
        setCalendar(data);
      };
     

    return (
        <Container>
            <div>
            <a href="/customer/transfer/auto_trans"><Button variant="secondary" size="lg" >
                초기화
                </Button></a>{' '}
                </div>
                <div align="right">
                <button onClick={handleToggle}>{isOpen ? '캘린더 닫기' : '캘린더 열기'}</button>
                </div>
                <br />
                <div>
                    
                        {isOpen && (
                        <div>
                            <CalendarComponent data={calendar} onDataChange={handleCalendarDataChange}/>
                        </div>
                        )}
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
                
            </Table>
                <div>
                   
                </div>
            <div align='center'>
                <Button variant="primary" size="lg" onClick={cancel}>
                    자동이체 해지   
                </Button>
            </div>
        </Container>
    )
}

export default AutoTransCheck