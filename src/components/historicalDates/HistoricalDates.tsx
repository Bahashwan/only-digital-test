import React from 'react';
import './HistoricalDates.scss';
import CircledButtons from '../TurningCircle/CircledButtons';
import CenterCross from '../centerCross/CenterCross';
import slides from '../../data/slides';
import dates from '../../data/dates';

const HistoricalDates: React.FC = () => {
  return (
    <div className="mainAppDiv">
      <div className="mainTitle">Исторические даты</div>
      <div className="contentDiv">
        <CircledButtons data={dates} slideData={slides} />
      </div>
      <CenterCross />
    </div>
  );
};

export default HistoricalDates;
