import React, { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import './GeneralCalendar.css'; 

interface GeneralCalendarProps {
  fechaActual: Date;
  onChangeFecha: (fecha: Date) => void;
}

const GeneralCalendar: React.FC<GeneralCalendarProps> = ({ fechaActual, onChangeFecha }) => {
  const [currentDate, setCurrentDate] = useState<Date>(fechaActual);

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setCurrentDate(value);
      onChangeFecha(value); 
    }
  };

  return (
      <Calendar
        onChange={handleDateChange}
        value={currentDate}
        tileDisabled={({ date }) => date < new Date()}
        className="react-calendar"
      />
  );
};

export default GeneralCalendar;
