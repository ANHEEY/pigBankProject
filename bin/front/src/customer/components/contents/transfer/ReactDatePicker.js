// 달력/날짜 입력
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";

// npm install date-fns --save
// npm install react-datepicker --save

const ReactDatePicker = () => {
    const [startDate, setStartDate] = useState(new Date());
    console.log(startDate);
      return (
          <div>
            <DatePicker
                type="date"
                locale={ko}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy년 MM월 dd일"
            ></DatePicker>
          </div>
    );
  };
  
  export default ReactDatePicker;