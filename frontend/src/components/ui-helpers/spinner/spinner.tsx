import './spinner.css';

type SpinnerProps = {
  spinnerScreen?: boolean;
};

export default function Spinner({ spinnerScreen }: SpinnerProps): JSX.Element {
  return (
    <div className={spinnerScreen ? 'spinner-screen' : 'spinner-button'}></div>
  );
}
