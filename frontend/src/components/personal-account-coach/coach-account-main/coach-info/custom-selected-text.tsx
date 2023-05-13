import './coach-info.css';

type CustomSelectTextProps = {
  setSelectedText: (element: null | string) => void;
  list: string[];
  listTitle: string;
};

export default function CustomSelectText({
  setSelectedText,
  list,
  listTitle,
}: CustomSelectTextProps): JSX.Element {
  return (
    <>
      <button
        className="custom-select__button"
        type="button"
        aria-label="Выберите одну из опций"
        onFocus={() =>
          document
            .querySelector(`.custom-select__list.${listTitle}`)
            ?.classList.add('custom-select__list__selected')
        }
        onBlur={() =>
          document
            .querySelector(`.custom-select__list.${listTitle}`)
            ?.classList.remove('custom-select__list__selected')
        }
      >
        <span className="custom-select__text"></span>
        <span className="custom-select__icon">
          <svg
            width="15"
            height="6"
            aria-hidden="true"
          >
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </span>
      </button>
      <ul
        className={`custom-select__list ${listTitle}`}
        role="listbox"
      >
        {list.map((text) => (
          <li
            key={text}
            onMouseOver={(evt: React.MouseEvent<HTMLLIElement, MouseEvent>) =>
              (evt.currentTarget.style.fontWeight = 'bold')
            }
            onMouseOut={(evt: React.MouseEvent<HTMLLIElement, MouseEvent>) =>
              (evt.currentTarget.style.fontWeight = 'normal')
            }
            onClick={(evt) => {
              setSelectedText(evt.currentTarget.textContent);
            }}
          >
            {text}
          </li>
        ))}
      </ul>
    </>
  );
}
