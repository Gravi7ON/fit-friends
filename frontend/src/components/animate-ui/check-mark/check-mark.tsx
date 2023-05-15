import './check-mark.css';

export default function CheckMark(): JSX.Element {
  return (
    <svg
      className="check-mark__button-animate"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 18 32.34 l -8.34 -8.34 -2.83 2.83 11.17 11.17 24 -24 -2.83 -2.83 z"
        stroke="#3da35a"
        fill="transparent"
      />
    </svg>
  );
}
