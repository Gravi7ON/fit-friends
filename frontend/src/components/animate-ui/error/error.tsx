import './error.css';

type ErrorProps = {
  errorMessage: string;
};

export default function Error({ errorMessage }: ErrorProps): JSX.Element {
  return (
    <h3 className="server__error">
      Error:
      <br />
      <p className="text-error">{errorMessage}</p>
    </h3>
  );
}
