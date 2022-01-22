import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { updateDate } from '../utils/helpers';
import LineChart from './LineChart';

const Graph = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(updateDate(end));
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
      <LineChart startDate={startDate} endDate={endDate} />
    </div>
  );
};

export default Graph;
