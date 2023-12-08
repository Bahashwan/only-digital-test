import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './CircleButtons.scss';
import DateRange from '../dates/DateRange';
import Slider from '../slider/Slider';
import updateDate from '../../hooks/useUpdateDate';
import { nextOn, nextOff, prevOn, prevOff} from './imports';

interface SlidesInfo {
  title: string;
  text: string;
}

interface Data {
  start: number;
  end: number;
}

interface CircledButtonsProps {
  data: Data[];
  slideData: SlidesInfo[][];
}

const CircledButtons: React.FC<CircledButtonsProps> = ({ data, slideData }) => {
  const [startDate, setStartDate] = useState<number>(data[0].start);
  const [endDate, setEndDate] = useState<number>(data[0].end);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [currentInterval, setCurrentInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  const circleRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeButton, setActiveButton] = useState(0);
  const buttonCount = data.length;

  const calculateButtonPosition = (index: number) => {
    const angle = (360 / buttonCount) * index;
    return {
      x: Math.cos(((angle - 90) / 180) * Math.PI) * 195,
      y: Math.sin(((angle - 90) / 180) * Math.PI) * 195,
      rotation: angle,
    };
  };

  useEffect(() => {
    const circle = circleRef.current;
    const buttons = buttonRefs.current;

    if (circle && buttons) {
      buttons.forEach((button, index) => {
        const { x, y, rotation } = calculateButtonPosition(index);
        gsap.to(button, {
          x,
          y,
          rotation,
          duration: 0.5,
        });
      });
    }
    buttons[0]?.click();
  }, [buttonCount]);

  const handleClick = (index: number) => {
    const newPosition = 390 - index * (360 / buttonCount);
    gsap.to(circleRef.current, {
      rotation: newPosition,
      ease: 'power2.out',
    });
    setActiveButton(index);

    const startYear = data[index].start;
    const endYear = data[index].end;

    if (currentInterval) {
      clearInterval(currentInterval);
    }

    setCurrentInterval(
      setInterval(() => {
        if (startDate !== startYear || endDate !== endYear) {
          updateDate(
            startDate,
            endDate,
            startYear,
            endYear,
            setStartDate,
            setEndDate
          );
        } else {
          clearInterval(currentInterval!);
        }
      }, 100)
    );
    setSlideIndex(index);
  };

  const incIndex = () => {
    handleClick(slideIndex+1)
  };
  const decIndex = () => {
    handleClick(slideIndex-1)
  };

  return (
    <>
      <div className="dateRangeButtonsMainDiv">
        <DateRange dates={[`${startDate}`, `${endDate}`]} />
        <div className="circle-container">
          <div ref={circleRef} className="circle">
            {[...Array(buttonCount)].map((_, index) => (
              <button
                key={index}
                ref={(el) => el && (buttonRefs.current[index] = el)}
                className={`circle-button ${
                  activeButton === index ? 'active' : ''
                }`}
                onClick={() => handleClick(index)}
              >
                {index + 1}
              </button>
            ))}
            <div className="InnerCircle"></div>
          </div>
        </div>
      </div>
      <Slider slides={slideData[slideIndex]} />
      <div className="controlSide">
        <div className="controlSideButtonsNumbers">
          <span>{`${`${slideIndex+1}`.length>=2 ? `${slideIndex+1}` : `0${slideIndex+1}`}`}/{`${`${data.length}`.length>=2 ? `${data.length}`:`0${data.length}`}`}</span>
        </div>
        <div className="controlSideButtons">
          {slideIndex == 0 ? (
            <img src={prevOff} alt="" />
          ) : (
            <img src={prevOn} alt="" onClick={decIndex} />
          )}
          {slideIndex != data.length-1 ? (
            <img src={nextOn} alt="" onClick={incIndex} />
          ) : (
            <img src={nextOff} alt="" />
          )}
        </div>
        <div className='mobileControlBullets'>
{data.map((el,i)=>i == slideIndex? <div className='circleDark'/>:<div className='circleLight' onClick={()=>handleClick(i)} />)}
        </div>
      </div>
    </>
  );
};

export default CircledButtons;
