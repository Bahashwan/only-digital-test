import { gsap } from "gsap/gsap-core";

export const updateDate = (
    start: number,
    end: number,
    startYear: number,
    endYear: number,
    setStartDate: (newValue:any) => void,
     setEndDate: (newValue:any) => void
  ) => {
    if (start < startYear) {
      gsap.to(setStartDate, {
        duration: 0.2,
        onComplete: () => {
          setStartDate((prevStartDate:number) =>
            prevStartDate + 1 > startYear ? startYear : prevStartDate + 1
          );
        },
      });
    } else if (start > startYear) {
      gsap.to(setStartDate, {
        duration: 0.2,
        onComplete: () => {
          setStartDate((prevStartDate:number) =>
            prevStartDate - 1 < startYear ? startYear : prevStartDate - 1
          );
        },
      });
    }
    if (end < endYear) {
      gsap.to(setEndDate, {
        duration: 0.2,
        onComplete: () => {
          setEndDate((prevEndDate:number) =>
            prevEndDate + 1 > endYear ? endYear : prevEndDate + 1
          );
        },
      });
    } else if (end > endYear) {
      gsap.to(setEndDate, {
        duration: 0.2,
        onComplete: () => {
          setEndDate((prevEndDate:number) =>
            prevEndDate - 1 < endYear ? endYear : prevEndDate - 1
          );
        },
      });
    }
  };

  export default updateDate