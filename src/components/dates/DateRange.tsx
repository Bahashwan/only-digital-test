// DateRangeComponent.tsx
import React from 'react';
import './DateRange.scss';

interface DatesProps {
  dates: String[];
}

const DateRange: React.FC<DatesProps> = ({ dates }) => {


  return (
    <div className='mainDiv'>
      <div className='innerDiv'>
      <div className='startDate'>{dates[0]}</div>
      <div className='endDate'>{dates[1]}</div>
      </div>
    </div>
  );
};

export default DateRange;
