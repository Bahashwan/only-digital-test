import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './Slider.scss';
import { useEffect, useState } from 'react';

export interface SliderProps {
  slides: { title: String; text: String }[];
}

const Slider: React.FC<SliderProps> = ({ slides }) => {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
   
      setScreenWidth(window.innerWidth);
  
console.log(screenWidth);

   
  }, [window.innerWidth]);

  return (
    <div className="mainDivSlider">
      <Swiper
        modules={[Navigation]}
        spaceBetween={screenWidth > 750?50:-100}
        slidesPerView={screenWidth > 750?3:1}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
      >
        {slides.map((slide) => (
          <div>
            <SwiperSlide>
              <span className="slideTitle">{slide.title}</span>
              <br />
              <span className="slideText">{slide.text}</span>
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
