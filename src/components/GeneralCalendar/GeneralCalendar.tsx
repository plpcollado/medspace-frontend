import React, { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import './GeneralCalendar.css'; 

interface GeneralCalendarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const GeneralCalendar: React.FC<GeneralCalendarProps> = ({ currentDate, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(currentDate);

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      onDateChange(value); 
    }
  };

  return (
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileDisabled={({ date }) => date < new Date()}
        className="react-calendar"
      />
  );
};

export default GeneralCalendar;
