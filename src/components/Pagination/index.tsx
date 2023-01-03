import React, {useState, useEffect} from 'react';
import s from './style.module.scss';

interface IPaginationProps {
  pages: number
  setCurrentPage: (arg: number) => void
}

const Pagination:React.FC<IPaginationProps> = ({pages, setCurrentPage}) => {
  const [currentButton, setCurrentButton] = useState<any>(1);
  const [arrOfCurrentButtons, setArrOfCurrentButtons] = useState<any>([]);
  const numberOfPages:number[] = [];
  for(let i = 1; i <= pages; i++) {
    numberOfPages.push(i)
  }
  useEffect(() => {
    let tempNumberOfPages:Array<number | string> = [...arrOfCurrentButtons];
    const dotsInitial = '...';
    const dotsLeft = ' ...';
    const dotsRight = '... ';

    if(currentButton >= 1 && currentButton <=3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length]
    }
    else if(currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5);
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
    }
    else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton);
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1);
      tempNumberOfPages = [1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length]
    }
    else if (currentButton > numberOfPages.length - 3) {
      const sliced = numberOfPages.slice(numberOfPages.length - 4);
      tempNumberOfPages = [1, dotsLeft, ...sliced];
    }
    else if (currentButton === dotsInitial) {
      setCurrentButton(arrOfCurrentButtons[arrOfCurrentButtons.length -3] + 1);
    }
    else if(currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrentButtons[3] - 2);
    }
    else if(currentButton === dotsRight) {
      setCurrentButton(arrOfCurrentButtons[3] + 2);
    }
    setArrOfCurrentButtons(tempNumberOfPages)
    setCurrentPage(currentButton);
  }, [currentButton])
  const prevPage = () => {
    setCurrentButton((prev: number) => prev === 1 ? prev : prev - 1);
  }
  const nextPage = () => {
    setCurrentButton((prev: number) => prev === numberOfPages.length ? prev : prev + 1);
  }
  return (
    <div className={s.pagination}>
      <div className={s.container}>
        <button
          className={`${s.btn} ${currentButton === 1 ? s.btn_disabled : ''}`}
          onClick={prevPage}
        >
          Prev
        </button>
        {arrOfCurrentButtons.map((pageNumber: number, index: number) => (
          <button
            key={'pageNum'+index}
            className={currentButton === pageNumber ? `${s.btn} ${s.btn_active}` : s.btn}
            onClick={() => setCurrentButton(pageNumber) }
          >
            {pageNumber.toString()}
          </button>
        ))}
        <button
          className={`${s.btn} ${currentButton === numberOfPages.length ? s.btn_disabled : ''}`}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;