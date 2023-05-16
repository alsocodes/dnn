"use client";
import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

type DatePickerType = {
  value?: Date | null;
  endDate?: Date | null;
  range?: boolean;
  onChange?: (data: any) => void;
  disabled?: boolean;
  placeholder?: string;
  monthPicker?: boolean;
};

const DateRangePicker = ({
  value,
  endDate,
  range,
  onChange,
  disabled,
  placeholder,
  monthPicker = false,
}: DatePickerType) => {
  const formatLabel = () => {
    const start = format(value || Date.now(), "dd/MM/yy");
    if (range) {
      const end = format(endDate || Date.now(), "dd/MM/yy");
      return `${start} - ${end}`;
    }
    return start;
  };

  return (
    // <div className="border rounded-md w-full max-w-[120px]">
    <div className="z-50 text-sm">
      <ReactDatePicker
        showMonthYearPicker={monthPicker}
        disabled={disabled}
        selected={value}
        onChange={(date: any) => {
          if (!onChange) return;
          // Ranged value
          if (range) {
            const [start, end] = date;
            return onChange({ start, end });
          }
          onChange(date);
        }}
        selectsStart
        startDate={value}
        endDate={endDate}
        selectsRange={range}
        dateFormat={monthPicker ? "MMM yyyy" : "dd/MM/yy"}
        customInput={
          <label className="">{formatLabel()}</label>
          // <input type="text" className="" value={formatLabel()} />
        }
      />
    </div>
  );
};

export default DateRangePicker;
