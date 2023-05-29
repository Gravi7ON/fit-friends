import { throttle } from 'lodash';
import { useEffect } from 'react';
import './button-move-up.css';

type ButtonMoveUpProps = {
  isShowButtonScrollUp: boolean;
  setIsShowButtonScrollUp: (state: React.SetStateAction<boolean>) => void;
};

export default function ButtonMoveUp({
  isShowButtonScrollUp,
  setIsShowButtonScrollUp,
}: ButtonMoveUpProps): JSX.Element {
  useEffect(() => {
    const scroll = throttle(() => {
      if (window.scrollY > 1000) {
        setIsShowButtonScrollUp(true);
      }
      if (window.scrollY < 1000) {
        setIsShowButtonScrollUp(false);
      }
    }, 300);

    window.addEventListener('scroll', scroll);
    return () => {
      window.removeEventListener('scroll', scroll);
    };
  }, [setIsShowButtonScrollUp]);

  return (
    <button
      className="btn show-more__button show-more__button--to-top"
      type="button"
      style={
        isShowButtonScrollUp
          ? {
              display: 'inline-flex',
              animation: 'button-up-smooth-popup 0.5s linear',
            }
          : { display: 'none' }
      }
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
    >
      Вернуться в начало
    </button>
  );
}
