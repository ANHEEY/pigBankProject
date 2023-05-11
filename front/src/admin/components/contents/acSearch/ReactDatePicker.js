// 달력/날짜 입력
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";

// npm install date-fns --save
// npm install react-datepicker --save

const ReactDatePicker = ({ selectedDate, onDateChange }) => {
  // 선택한 날짜 selectedDate (prop) 에 값을 저장
  // 선택한 날짜가 바뀔때마다 selectedDate 가 업데이트됨 
  return (
    <div>
      <DatePicker
        type="date"
        locale={ko}
        selected={new Date(selectedDate)}
        onChange={date => onDateChange(date)}
        dateFormat="yyyy년 MM월 dd일"
      />
    </div>
  );
};

export default ReactDatePicker;