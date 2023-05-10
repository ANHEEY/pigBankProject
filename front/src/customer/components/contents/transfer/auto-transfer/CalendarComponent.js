import React, { useEffect ,useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko'; // 한국어 로케일 임포트


function CalendarComponent (props) {
  

  // calendar 변수에 props.data 로 받아온값 담기
  const [calendar, setCalendar] = useState(props.data);
  const [astate, setAstate] = useState([]);
  const [start, setStart] = useState([]);
  const [end, setEnd] = useState([]);
  const [bank, setBank] = useState([]);
  const [amount, setAmount] = useState([]);
  const [date, setDate] = useState([]);
  const [atResult, setAtResult] = useState([]);
  const [atbank, setAtbank] = useState([]);
  const [atamount, setAtamount] = useState([]);
  const [anum, setAnum] = useState([]);
  const [atnum, setAtnum] = useState([]);

  useEffect(() => {
    setCalendar(props.data);

    // 1684335600000 date 값 형 변환 yyyy-mm-dd;
    const formattedDate = (dateArray) => {
      const formattedDates = dateArray.map((timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      });
      return formattedDates;
    };
    
    // calendar에 담은값 filter 해서 속성id 중 astate 가존재하는 배열 다 가져오기 
    const autousing = calendar.filter((event) => event.hasOwnProperty('astate'));
    // filter로 거른 값중 자동이체 사용/해지
    const state = autousing.map((event) => event.astate);
    setAstate(state);
    // filter로 거른 유니크 값
    const num = autousing.map((event) => event.anum);
    setAnum(num);
    // filter로 거른 값중 자동이체 시작날짜
    const usingstartdate = autousing.map((event) => event.astartDate);
    // start 변수에 담기 
    setStart(formattedDate(usingstartdate));
    // filter로 거른 값중 자동이체 끝나는날짜
    const usingenddate = autousing.map((event) => event.aendDate);
    // end 변수에 담기
    setEnd(formattedDate(usingenddate));
    // filter로 거른 값중 자동이체 은행명
    const adepositbank = autousing.map((event) => event.adepositBank);
    // bank 변수에 자동이체 은행명 담기
    setBank(adepositbank);
    // filter로 거른 값중 자동이체 금액
    const adepositAmount = autousing.map((event) => event.adepositAmount);
    // amount 변수에 담기
    setAmount(adepositAmount);
    
    // calendar에 담은값 filter 해서 속성id 중 atResult 가존재하는 배열 다 가져오기 
    const at = calendar.filter((event) => event.hasOwnProperty('atResult'));
    // filter로 거른 값중 자동이체 실행날짜
    const atDate = at.map((event) => event.atDate);
    setDate(formattedDate(atDate));
    // filter로 거른 값중 자동이체 결과
    const atResult = at.map((event) => event.atResult);
    setAtResult(atResult);
    // filter로 거른 값중 자동이체 은행명
    const atbank = at.map((event) => event.adepositBank);
    setAtbank(atbank);
    // filter로 거른 값중 자동이체 금액 (실행별)
    const atamounts = at.map((event) => event.adepositAmount);
    setAtamount(atamounts);
    const atnum = at.map((event) => event.atNum);
    setAtnum(atnum);

  }, []);

  // 선택한 이벤트
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 선택한 이벤트 정보 set
  const handleEventClick = (eventInfo) => {
      setSelectedEvent(eventInfo.event);
  };

  // 닫기 버튼
  const handleCloseModal = () => {
    setSelectedEvent(null);
  };
  
  // 자동이체 시작 날짜 및 정보
  const events1 = start.map((formattedStartDate, index) => {
    const num = anum[index];
    const name = bank[index] ;
    const state = astate[index];
    const amounts = amount[index];
if(state === 'using'){
    return {
      title: `${num} : ${name} / 시작하는날 `,
      date: formattedStartDate,
      extendedProps: {
        amount: amounts,
      }
    };
  }
  else {
    return {
      title: `${num} : ${name} / 해지 `,
      date: formattedStartDate,
      backgroundColor: '#A9A9A9',
      extendedProps: {
        amount: amounts,
      }
    };
  }
  });

  // 자동이체 실행 날짜 및 정보
  const events2 = date.map((date, index) => {
    const atnums = atnum[index];
    const result = atResult[index];
    const bank = atbank[index];
    const attamounts = atamount[index];
    if(result === '실패'){
      return {
        title: `${atnums} : ${bank},${result}`,
        date: date,
        backgroundColor: '#F08080', // 이벤트 배경색 설정
      };
    }
    else {
      return {
        title: `${atnums} : ${bank},${result}`,
        date: date,
        backgroundColor: '#ADFF2F' ,// 이벤트 배경색 설정
        extendedProps: {
          amount: attamounts,
          result: result,
        }
      };
    }
  })

  // 자동이체 해지 날짜 및 정보
  const events3 = end.map((formattedEndDate, index) => {
    const num = anum[index];
    const name = bank[index] ;
    const state = astate[index];
    const amounts = amount[index];
if(state === 'using'){
    return {
      title: `${num} : ${name} / 끝나는날 `, 
      date: formattedEndDate,
      extendedProps: {
        amount: amounts,
      }
    };
  }
  else {
    return {
      title: `${num} : ${name} / 해지 `,
      date: formattedEndDate,
      backgroundColor: '#A9A9A9',
      extendedProps: {
        amount: amounts,
      }
    };
  }
  });

  const allEvents = events1.concat(events2).concat(events3);

  return (
    <div>
      
    <FullCalendar 
    plugins={[dayGridPlugin]} 
    initialView="dayGridMonth" 
    events={allEvents} 
    eventTextColor='black'
    locales={[koLocale]} // 로케일 추가
    locale="ko" // 한국어로 설정
    eventClick={handleEventClick}
    />
    <hr />
    <br />
    {selectedEvent && (
        <div className="event-modal">
          <h3 align='center'>{selectedEvent.title}</h3>
          {selectedEvent.extendedProps && selectedEvent.extendedProps.result && (
            <p align="center">이체결과 : {selectedEvent.extendedProps.result}</p>
          )}
          <p align="center">이체금액 : {selectedEvent.extendedProps.amount}원 </p>
          <button onClick={handleCloseModal}>닫기</button>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
